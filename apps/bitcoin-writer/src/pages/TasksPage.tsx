import React, { useState, useEffect } from 'react';
import './TasksPage.css';

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Critical';
  category: string;
  reward: string;
  status: 'available' | 'in_progress' | 'completed';
  skills: string[];
  deliverables: string[];
  githubIssueNumber?: number;
  githubIssueUrl?: string;
  estimatedHours?: number;
  assignee?: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('devSidebarCollapsed');
    return saved === 'true';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Fetch GitHub issues on mount
  useEffect(() => {
    fetchGitHubIssues();
    
    // Listen for storage changes to detect sidebar collapse state
    const handleStorageChange = () => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    };
    
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    
    // Check for sidebar state changes via polling
    const checkSidebarState = setInterval(() => {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setDevSidebarCollapsed(saved === 'true');
    }, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      clearInterval(checkSidebarState);
    };
  }, []);
  
  const fetchGitHubIssues = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-writer/issues?state=open&per_page=100');
      
      // Check for rate limiting or other errors
      if (!response.ok) {
        console.warn('GitHub API response not OK:', response.status, response.statusText);
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const issues = await response.json();
      
      // Check if we got rate limited
      if (issues.message && issues.message.includes('rate limit')) {
        console.warn('GitHub API rate limited');
        throw new Error('Rate limited');
      }
      
      // Ensure we have an array
      if (!Array.isArray(issues)) {
        console.warn('GitHub API returned non-array:', issues);
        throw new Error('Invalid response format');
      }
      
      const mappedTasks: Task[] = issues.map((issue: any) => {
        // Parse priority and reward from issue body
        const body = issue.body || '';
        
        // Handle both old and new format
        // New format: ## 💰 Contract Details
        // Old format: **Priority:**
        let priorityMatch = body.match(/\*\*Priority:\*\*\s*(Critical|High|Medium|Low)/i);
        let hoursMatch = body.match(/\*\*Estimated Hours:\*\*\s*([\d,]+)/i);
        let rewardMatch = body.match(/\*\*Token Reward:\*\*\s*([\d,]+)\s*BWRITER/i);
        let categoryMatch = body.match(/\*\*Category:\*\*\s*([^\n]+)/i);
        
        // Extract description - new format with emoji headers
        let description = '';
        const descMatch = body.match(/##\s*(?:📋\s*)?Description\s*\n([\s\S]*?)(?=##|$)/i);
        if (descMatch) {
          description = descMatch[1].trim().split('\n\n')[0]; // Get first paragraph
        } else {
          // Fallback to old format
          description = body.split('## Requirements')[0].replace('## Description', '').trim();
        }
        
        // Parse requirements section for skills
        let skills: string[] = ['TypeScript', 'React'];
        const requirementsMatch = body.match(/##\s*(?:🎯\s*)?Requirements\s*\n([\s\S]*?)(?=##|$)/i);
        if (requirementsMatch) {
          const requirements = requirementsMatch[1];
          if (requirements.includes('OAuth')) skills.push('OAuth');
          if (requirements.includes('Google')) skills.push('Google APIs');
          if (requirements.includes('PDF')) skills.push('PDF Generation');
          if (requirements.includes('blockchain') || requirements.includes('BSV')) skills.push('BSV');
          if (requirements.includes('HandCash')) skills.push('HandCash SDK');
          if (requirements.includes('WebRTC')) skills.push('WebRTC');
          if (requirements.includes('smart contract')) skills.push('Smart Contracts');
          if (requirements.includes('IPFS')) skills.push('IPFS');
          if (requirements.includes('micro-ordinals')) skills.push('Ordinals');
        }
        
        // Map GitHub labels to categories
        const labels = issue.labels || [];
        let category = categoryMatch ? categoryMatch[1] : 'Feature';
        if (!categoryMatch) {
          if (labels.some((l: any) => l.name === 'bug')) category = 'Bug Fix';
          if (labels.some((l: any) => l.name === 'documentation')) category = 'Documentation';
          if (labels.some((l: any) => l.name === 'enhancement')) category = 'Enhancement';
          if (labels.some((l: any) => l.name === 'security')) category = 'Security';
          if (labels.some((l: any) => l.name.includes('blockchain'))) category = 'Blockchain';
        }
        
        // Map priority to difficulty
        let difficulty: Task['difficulty'] = 'Medium';
        const priority = priorityMatch ? priorityMatch[1] : 'Medium';
        if (priority === 'Critical') difficulty = 'Critical';
        if (priority === 'High') difficulty = 'Hard';
        if (priority === 'Medium') difficulty = 'Medium';
        if (priority === 'Low') difficulty = 'Easy';
        
        // Handle bounty format from older issues
        if (!rewardMatch) {
          const bountyMatch = body.match(/([\d.]+)%\s*(?:of\s+tokens|Bounty)/i);
          if (bountyMatch) {
            const percentage = parseFloat(bountyMatch[1]);
            const tokens = Math.round(percentage * 10000000); // 1B total supply * percentage / 100
            rewardMatch = ['', tokens.toLocaleString()];
          }
        }
        
        // Extract deliverables from acceptance criteria - handle both formats
        const deliverables: string[] = [];
        const criteriaMatch = body.match(/##\s*(?:✅\s*)?Acceptance Criteria\s*\n([\s\S]*?)(?=##|$)/i);
        if (criteriaMatch) {
          const criteria = criteriaMatch[1];
          const items = criteria.match(/- \[ \] .*/g) || [];
          items.forEach((item: string) => {
            deliverables.push(item.replace('- [ ] ', '').trim());
          });
        }
        
        return {
          id: `issue-${issue.number}`,
          title: issue.title,
          description: description,
          difficulty,
          category,
          reward: rewardMatch ? `${rewardMatch[1]} BWRITER` : '2,000 BWRITER',
          status: issue.assignee ? 'in_progress' : 'available',
          skills: Array.from(new Set(skills)), // Remove duplicates
          deliverables: deliverables.length > 0 ? deliverables.slice(0, 5) : ['See issue for details'], // Limit to 5 items
          githubIssueNumber: issue.number,
          githubIssueUrl: issue.html_url,
          estimatedHours: hoursMatch ? parseInt(hoursMatch[1].replace(/,/g, '')) : 8,
          assignee: issue.assignee ? issue.assignee.login : undefined
        };
      });
      
      setTasks(mappedTasks);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch GitHub issues:', error);
      // Show a message directing users to GitHub
      setTasks([
        {
          id: 'github-redirect',
          title: '📋 View Tasks on GitHub',
          description: 'Unable to load tasks from GitHub API. This may be due to rate limiting or network issues. Click below to view all available tasks directly on GitHub.',
          difficulty: 'Easy',
          category: 'Information',
          reward: 'Various',
          status: 'available',
          skills: ['Visit GitHub'],
          deliverables: ['View and claim tasks on GitHub', 'Create new issues', 'Discuss bounties'],
          githubIssueUrl: 'https://github.com/bitcoin-apps-suite/bitcoin-writer/issues',
          estimatedHours: 0
        }
      ]);
      setLoading(false);
    }
  };

  const [filter, setFilter] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'critical') return task.difficulty === 'Critical';
    if (filter === 'easy') return task.difficulty === 'Easy';
    if (filter === 'medium') return task.difficulty === 'Medium';
    if (filter === 'hard') return task.difficulty === 'Hard';
    return task.category.toLowerCase() === filter;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleApply = () => {
    setShowContactForm(true);
  };

  return (
    <div className="App">
      <div className={`tasks-page ${!isMobile && !devSidebarCollapsed ? 'with-sidebar-expanded' : ''} ${!isMobile && devSidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
        <div className="tasks-container">
          {/* Hero Section */}
          <section className="tasks-hero">
            <h1>Bitcoin Writer <span style={{color: '#ffffff'}}>Tasks</span></h1>
            <p className="tasks-tagline">
              Contribute to Bitcoin Writer and earn BWRITER tokens
            </p>
            <div className="hero-actions">
              <div className="tasks-badge">TASKS</div>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-writer/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="create-issue-button"
              >
                + Create New Issue
              </a>
            </div>
          </section>

        <div className="tasks-filters">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`filter-button ${filter === 'critical' ? 'active' : ''}`}
            onClick={() => setFilter('critical')}
          >
            Critical
          </button>
          <button
            className={`filter-button ${filter === 'easy' ? 'active' : ''}`}
            onClick={() => setFilter('easy')}
          >
            Easy
          </button>
          <button
            className={`filter-button ${filter === 'medium' ? 'active' : ''}`}
            onClick={() => setFilter('medium')}
          >
            Medium
          </button>
          <button
            className={`filter-button ${filter === 'hard' ? 'active' : ''}`}
            onClick={() => setFilter('hard')}
          >
            Hard
          </button>
          <button
            className={`filter-button ${filter === 'feature' ? 'active' : ''}`}
            onClick={() => setFilter('feature')}
          >
            Features
          </button>
          <button
            className={`filter-button ${filter === 'documentation' ? 'active' : ''}`}
            onClick={() => setFilter('documentation')}
          >
            Documentation
          </button>
        </div>

        {loading ? (
          <div className="tasks-loading">
            <p>Loading tasks from GitHub...</p>
          </div>
        ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className="task-card"
              onClick={() => handleTaskClick(task)}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`task-difficulty ${task.difficulty.toLowerCase()}`}>
                  {task.difficulty}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <span className="task-category">{task.category}</span>
                <span className="task-reward">{task.reward}</span>
              </div>
              <div className="task-skills">
                {task.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
                {task.skills.length > 3 && (
                  <span className="skill-tag">+{task.skills.length - 3}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {selectedTask && (
          <div className="task-modal" onClick={() => setSelectedTask(null)}>
            <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setSelectedTask(null)}>×</button>
              <h2>{selectedTask.title}</h2>
              <div className="task-modal-meta">
                <span className={`task-difficulty ${selectedTask.difficulty.toLowerCase()}`}>
                  {selectedTask.difficulty}
                </span>
                <span className="task-category">{selectedTask.category}</span>
                <span className="task-reward">{selectedTask.reward}</span>
              </div>
              <p className="task-modal-description">{selectedTask.description}</p>
              
              <div className="task-modal-section">
                <h3>Required Skills</h3>
                <div className="task-skills">
                  {selectedTask.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="task-modal-section">
                <h3>Deliverables</h3>
                <ul className="task-deliverables">
                  {selectedTask.deliverables.map(deliverable => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>

              <div className="task-modal-actions">
                {selectedTask.githubIssueUrl && (
                  <a 
                    href={selectedTask.githubIssueUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link-button"
                  >
                    View on GitHub →
                  </a>
                )}
                <button className="apply-button" onClick={handleApply}>
                  Apply for this Task
                </button>
              </div>
            </div>
          </div>
        )}

        {showContactForm && (
          <div className="contact-modal" onClick={() => setShowContactForm(false)}>
            <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={() => setShowContactForm(false)}>×</button>
              <h2>Apply for Task</h2>
              <p>Please provide your details and we'll get in touch with you.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for your interest! We will contact you soon.');
                setShowContactForm(false);
                setSelectedTask(null);
              }}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="text" placeholder="GitHub Username" required />
                <textarea placeholder="Tell us about your experience with the required skills" rows={4} required />
                <button type="submit">Submit Application</button>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;