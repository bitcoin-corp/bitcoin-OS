/**
 * Local document storage management
 * Handles multiple documents in localStorage with auto-save
 */

export interface LocalDocument {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  word_count: number;
  character_count: number;
  is_hashed?: boolean;
  hash?: string;
  hash_tx?: string;
}

export class LocalDocumentStorage {
  private static readonly STORAGE_KEY = 'bitcoinWriter_documents';
  private static readonly CURRENT_DOC_KEY = 'bitcoinWriter_currentDocId';
  private static readonly MAX_DOCUMENTS = 50; // Limit to prevent localStorage overflow

  /**
   * Initialize default example documents if none exist
   */
  static initializeDefaultDocuments(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored || stored === '[]') {
      const maipDoc: LocalDocument = {
        id: 'maip_example_001',
        title: 'Multi-Authoring in Public',
        content: `<h1 style="color: #FF6B35; font-size: 48px; text-align: center; margin-bottom: 10px;">Multi-Authoring in Public (MAIP)</h1>
<p style="text-align: center; font-size: 20px; color: #888; font-style: italic; margin-bottom: 40px;">Collaborative Writing on the Blockchain</p>

<div style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(247, 147, 26, 0.05) 100%); padding: 30px; border-radius: 12px; margin-bottom: 40px;">
<h2 style="color: #FF6B35; border-bottom: 2px solid rgba(255, 107, 53, 0.3); padding-bottom: 10px;">📝 Executive Summary</h2>
<p style="font-size: 18px; line-height: 1.8;">Multi-Authoring in Public (MAIP) represents a revolutionary approach to collaborative content creation on the blockchain. Instead of hidden Google Docs or private repositories, MAIP enables authors to write together in real-time on the blockchain, where every keystroke can be valued and every contribution rewarded through micropayments.</p>
</div>

<h2 style="color: #FF6B35; border-bottom: 2px solid rgba(255, 107, 53, 0.3); padding-bottom: 10px; margin-top: 40px;">🎯 The Vision</h2>
<p style="font-size: 16px; margin-bottom: 20px;">MAIP transforms how humanity creates and shares knowledge by introducing:</p>
<ul style="list-style: none; padding-left: 0;">
<li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 107, 53, 0.05); border-left: 4px solid #FF6B35; border-radius: 4px;"><strong style="color: #FF6B35;">⚡ Real-Time Collaboration:</strong> Multiple authors working simultaneously with blockchain-verified contributions</li>
<li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 107, 53, 0.05); border-left: 4px solid #FF6B35; border-radius: 4px;"><strong style="color: #FF6B35;">💰 Micro-Payments:</strong> Every edit, suggestion, and improvement triggers automatic BSV micropayments</li>
<li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 107, 53, 0.05); border-left: 4px solid #FF6B35; border-radius: 4px;"><strong style="color: #FF6B35;">📊 Contribution Tracking:</strong> Immutable record of who wrote what, when, and how much value they added</li>
<li style="padding: 12px; margin-bottom: 10px; background: rgba(255, 107, 53, 0.05); border-left: 4px solid #FF6B35; border-radius: 4px;"><strong style="color: #FF6B35;">🌍 Public by Default:</strong> All writing happens in public view, creating unprecedented transparency</li>
</ul>

<h2 style="color: #FF6B35; border-bottom: 2px solid rgba(255, 107, 53, 0.3); padding-bottom: 10px; margin-top: 40px;">⚙️ How MAIP Works</h2>
<h3>1. Document Creation</h3>
<p>An author initiates a public document on the blockchain with an initial stake or bounty to attract contributors.</p>

<h3>2. Open Contribution</h3>
<p>Other authors join the document, making edits and additions. Each contribution is tracked by smart contracts that monitor:</p>
<ul>
<li>Character and word additions/deletions</li>
<li>Quality improvements (grammar, clarity, structure)</li>
<li>Fact-checking and source citations</li>
<li>Visual elements and formatting</li>
</ul>

<h3>3. Value Attribution</h3>
<p>AI models and peer review mechanisms determine the value of each contribution based on:</p>
<ul>
<li>Originality of content</li>
<li>Improvement to readability</li>
<li>Factual accuracy added</li>
<li>Structural enhancements</li>
</ul>

<h3>4. Automatic Rewards</h3>
<p>Contributors receive micropayments instantly based on their value-add, creating a real-time economy of ideas.</p>

<h2>Revolutionary Use Cases</h2>

<h3>Academic Papers</h3>
<p>Researchers worldwide collaborate openly, with citations and contributions tracked immutably. Peer review happens in real-time, with reviewers compensated for their expertise.</p>

<h3>News Articles</h3>
<p>Journalists from different regions contribute facts and perspectives to breaking stories, creating more comprehensive and balanced reporting.</p>

<h3>Technical Documentation</h3>
<p>Developers improve documentation together, with rewards for valuable contributions incentivizing high-quality technical writing.</p>

<h3>Creative Writing</h3>
<p>Stories that evolve through collective imagination, with royalties automatically split based on contribution percentages.</p>

<h2>Technical Architecture</h2>

<h3>BSV Blockchain Layer</h3>
<p>Every edit is a microtransaction containing document changes as OP_RETURN data. This creates an immutable history of all contributions.</p>

<h3>CRDTs (Conflict-free Replicated Data Types)</h3>
<p>Enable real-time collaborative editing without conflicts, ensuring all authors can work simultaneously.</p>

<h3>Smart Contract Escrow</h3>
<p>Automated payment distribution based on contribution metrics, with funds locked until quality thresholds are met.</p>

<h3>AI Valuation Engine</h3>
<p>Machine learning models assess the quality and value of contributions, trained on peer review data.</p>

<h2>The Economics of MAIP</h2>

<p>MAIP creates a new economic model for content creation:</p>

<ul>
<li><strong>Initiation Bounties:</strong> Document creators stake BSV to attract quality contributors</li>
<li><strong>Reader Payments:</strong> Readers pay micropayments that flow directly to all contributors</li>
<li><strong>Quality Bonuses:</strong> High-value contributions receive multiplied rewards</li>
<li><strong>Reputation Staking:</strong> Authors stake reputation tokens to participate in high-value documents</li>
</ul>

<h2>Implementation Roadmap</h2>

<h3>Phase 1: Foundation (Q1 2025)</h3>
<ul>
<li>Core CRDT implementation for collaborative editing</li>
<li>BSV transaction layer for contribution tracking</li>
<li>Basic micropayment distribution</li>
</ul>

<h3>Phase 2: Intelligence (Q2 2025)</h3>
<ul>
<li>AI valuation engine deployment</li>
<li>Peer review integration</li>
<li>Reputation system launch</li>
</ul>

<h3>Phase 3: Scale (Q3 2025)</h3>
<ul>
<li>Multi-language support</li>
<li>Academic institution partnerships</li>
<li>News organization integration</li>
</ul>

<h3>Phase 4: Ecosystem (Q4 2025)</h3>
<ul>
<li>Developer API release</li>
<li>Third-party app ecosystem</li>
<li>Cross-chain compatibility</li>
</ul>

<h2>Join the Revolution</h2>

<p>MAIP is more than a feature - it's a paradigm shift in how humanity creates and shares knowledge. Be part of the first generation of public multi-authors.</p>

<p><strong>Status:</strong> Currently in conceptual development with core infrastructure being built on BSV blockchain. Expected alpha release Q2 2025.</p>

<p><em>This document itself will be the first MAIP document, open for collaborative improvement with contributor rewards.</em></p>`,
        created_at: new Date('2025-01-25T10:00:00Z').toISOString(),
        updated_at: new Date('2025-01-25T10:00:00Z').toISOString(),
        word_count: 750,
        character_count: 5234,
        is_hashed: false
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([maipDoc]));
    }
  }

  /**
   * Get all documents from local storage
   */
  static getAllDocuments(): LocalDocument[] {
    // Initialize default documents if needed
    this.initializeDefaultDocuments();
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const docs = JSON.parse(stored);
      
      // Filter out empty documents
      const nonEmptyDocs = docs.filter((doc: LocalDocument) => {
        // Skip if no content or empty content
        if (!doc.content || doc.content.trim() === '') return false;
        
        // Skip if only contains empty paragraph tags
        if (doc.content === '<p><br></p>' || doc.content === '<p></p>') return false;
        
        // Skip if it's "Start writing..." placeholder
        if (doc.content === '<p>Start writing...</p>') return false;
        
        // Extract actual text content
        const textContent = this.stripHtml(doc.content).trim();
        
        // Skip if no actual text content
        if (!textContent || textContent === '') return false;
        
        // Skip untitled documents with minimal content
        if (doc.title === 'Untitled Document' && textContent.length < 10) return false;
        
        return true;
      });
      
      // Sort by updated_at descending
      return nonEmptyDocs.sort((a: LocalDocument, b: LocalDocument) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } catch (error) {
      console.error('Error loading local documents:', error);
      return [];
    }
  }

  /**
   * Save a document to local storage
   */
  static saveDocument(doc: LocalDocument): void {
    try {
      const docs = this.getAllDocuments();
      const existingIndex = docs.findIndex(d => d.id === doc.id);
      
      if (existingIndex >= 0) {
        // Update existing document
        docs[existingIndex] = {
          ...docs[existingIndex],
          ...doc,
          updated_at: new Date().toISOString()
        };
      } else {
        // Add new document
        docs.unshift(doc);
        
        // Remove oldest documents if we exceed the limit
        if (docs.length > this.MAX_DOCUMENTS) {
          docs.splice(this.MAX_DOCUMENTS);
        }
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
    } catch (error) {
      console.error('Error saving document:', error);
      // If localStorage is full, try removing oldest documents
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.cleanupOldDocuments();
        // Retry
        try {
          const docs = this.getAllDocuments();
          docs.unshift(doc);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs.slice(0, 10)));
        } catch (retryError) {
          console.error('Failed to save even after cleanup:', retryError);
        }
      }
    }
  }

  /**
   * Get a specific document by ID
   */
  static getDocument(id: string): LocalDocument | null {
    const docs = this.getAllDocuments();
    return docs.find(d => d.id === id) || null;
  }

  /**
   * Delete a document
   */
  static deleteDocument(id: string): void {
    const docs = this.getAllDocuments();
    const filtered = docs.filter(d => d.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    
    // If this was the current document, clear it
    const currentId = localStorage.getItem(this.CURRENT_DOC_KEY);
    if (currentId === id) {
      localStorage.removeItem(this.CURRENT_DOC_KEY);
    }
  }

  /**
   * Create a new document
   */
  static createNewDocument(): LocalDocument {
    const now = new Date().toISOString();
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id,
      title: 'Untitled Document',
      content: '',
      created_at: now,
      updated_at: now,
      word_count: 0,
      character_count: 0,
      is_hashed: false
    };
  }

  /**
   * Get current document ID
   */
  static getCurrentDocumentId(): string | null {
    return localStorage.getItem(this.CURRENT_DOC_KEY);
  }

  /**
   * Set current document ID
   */
  static setCurrentDocumentId(id: string): void {
    localStorage.setItem(this.CURRENT_DOC_KEY, id);
  }

  /**
   * Auto-save content (throttled)
   */
  private static autoSaveTimer: NodeJS.Timeout | null = null;
  
  static autoSave(docId: string, content: string, title?: string): void {
    // Clear existing timer
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
    
    // Set new timer for debounced save
    this.autoSaveTimer = setTimeout(() => {
      const doc = this.getDocument(docId) || this.createNewDocument();
      
      // Calculate word and character counts
      const text = this.stripHtml(content);
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = text.length;
      
      // Extract title from first line if not provided
      if (!title) {
        const firstLine = text.split('\n')[0]?.trim();
        title = firstLine?.substring(0, 100) || 'Untitled Document';
      }
      
      this.saveDocument({
        ...doc,
        id: docId,
        title,
        content,
        word_count: words,
        character_count: chars,
        updated_at: new Date().toISOString()
      });
    }, 1000); // Save after 1 second of inactivity
  }

  /**
   * Strip HTML tags for text analysis
   */
  private static stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  /**
   * Clean up old documents to free space
   */
  private static cleanupOldDocuments(): void {
    const docs = this.getAllDocuments();
    // Keep only the 10 most recent documents
    const toKeep = docs.slice(0, 10);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(toKeep));
  }

  /**
   * Export document as file
   */
  static exportDocument(doc: LocalDocument, format: 'txt' | 'html' | 'md' = 'txt'): void {
    let content = doc.content;
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    if (format === 'html') {
      content = `<!DOCTYPE html>
<html>
<head>
  <title>${doc.title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1>${doc.title}</h1>
  ${content}
  <footer>
    <p>Created: ${new Date(doc.created_at).toLocaleString()}</p>
    <p>Updated: ${new Date(doc.updated_at).toLocaleString()}</p>
    ${doc.is_hashed ? `<p>Hash: ${doc.hash}</p>` : ''}
  </footer>
</body>
</html>`;
      mimeType = 'text/html';
      extension = 'html';
    } else if (format === 'md') {
      // Convert HTML to markdown (simplified)
      content = this.htmlToMarkdown(content);
      content = `# ${doc.title}\n\n${content}\n\n---\n\nCreated: ${new Date(doc.created_at).toLocaleString()}\nUpdated: ${new Date(doc.updated_at).toLocaleString()}${doc.is_hashed ? `\nHash: ${doc.hash}` : ''}`;
      mimeType = 'text/markdown';
      extension = 'md';
    } else {
      // Plain text
      content = this.stripHtml(content);
      content = `${doc.title}\n${'='.repeat(doc.title.length)}\n\n${content}\n\n---\nCreated: ${new Date(doc.created_at).toLocaleString()}\nUpdated: ${new Date(doc.updated_at).toLocaleString()}${doc.is_hashed ? `\nHash: ${doc.hash}` : ''}`;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-z0-9]/gi, '_')}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Simple HTML to Markdown converter
   */
  private static htmlToMarkdown(html: string): string {
    let md = html;
    
    // Convert headers
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n');
    
    // Convert bold and italic
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
    
    // Convert links
    md = md.replace(/<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
    
    // Convert line breaks and paragraphs
    md = md.replace(/<br[^>]*>/gi, '\n');
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    
    // Remove remaining HTML tags
    md = md.replace(/<[^>]+>/g, '');
    
    // Clean up multiple newlines
    md = md.replace(/\n{3,}/g, '\n\n');
    
    return md.trim();
  }
}