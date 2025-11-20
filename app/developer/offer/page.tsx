'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Cpu, 
  Package,
  GitBranch,
  Terminal,
  Database,
  Server,
  Globe,
  Zap,
  Shield,
  Lock,
  Layers,
  Braces,
  FileCode,
  GitPullRequest,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Briefcase
} from 'lucide-react'

type ContractType = 'core' | 'app' | 'infrastructure' | 'protocol' | 'integration'
type ExperienceLevel = 'junior' | 'mid' | 'senior' | 'architect'
type Timeline = 'urgent' | 'short' | 'medium' | 'long'

export default function DeveloperOfferPage() {
  const [contractType, setContractType] = useState<ContractType>('core')
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('senior')
  const [timeline, setTimeline] = useState<Timeline>('medium')
  const [budget, setBudget] = useState('50000')
  const [teamSize, setTeamSize] = useState('3')
  
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    technicalSpecs: '',
    deliverables: '',
    milestones: '',
    requiredSkills: [] as string[],
    preferredStack: [] as string[],
    securityRequirements: '',
    performanceMetrics: '',
    integrationRequirements: '',
    compensationStructure: 'fixed',
    equityOffered: false,
    equityPercentage: '',
    bitcoinPayment: true,
    fiatPayment: false,
    tokenPayment: true
  })

  const contractTypes = [
    { id: 'core', label: 'Core Protocol', icon: Cpu, description: 'Bitcoin OS core development' },
    { id: 'app', label: 'Bitcoin App', icon: Package, description: 'Build Bitcoin applications' },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server, description: 'Network & scaling solutions' },
    { id: 'protocol', label: 'Protocol Enhancement', icon: GitBranch, description: 'Protocol improvements' },
    { id: 'integration', label: 'Integration', icon: Layers, description: 'Third-party integrations' }
  ]

  const experienceLevels = [
    { id: 'junior', label: 'Junior Developer', rate: '$50-100/hr', years: '0-2 years' },
    { id: 'mid', label: 'Mid-Level Developer', rate: '$100-200/hr', years: '2-5 years' },
    { id: 'senior', label: 'Senior Developer', rate: '$200-400/hr', years: '5-10 years' },
    { id: 'architect', label: 'System Architect', rate: '$400+/hr', years: '10+ years' }
  ]

  const timelines = [
    { id: 'urgent', label: 'Urgent', duration: '< 1 week', multiplier: 2.5 },
    { id: 'short', label: 'Short-term', duration: '1-4 weeks', multiplier: 1.5 },
    { id: 'medium', label: 'Medium-term', duration: '1-3 months', multiplier: 1.0 },
    { id: 'long', label: 'Long-term', duration: '3+ months', multiplier: 0.9 }
  ]

  const technicalSkills = [
    'Bitcoin Script', 'C++', 'Rust', 'Go', 'TypeScript', 'Solidity',
    'Node.js', 'React', 'Next.js', 'GraphQL', 'WebAssembly', 'Docker',
    'Kubernetes', 'TeraNode', 'Lightning Network', 'Smart Contracts',
    'Zero-Knowledge Proofs', 'Cryptography', 'P2P Networking',
    'Distributed Systems', 'Consensus Algorithms', 'Database Design'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting developer contract offer:', {
      contractType,
      experienceLevel,
      timeline,
      budget,
      teamSize,
      ...formData
    })
  }

  const estimatedCost = () => {
    const base = parseInt(budget)
    const timelineMultiplier = timelines.find(t => t.id === timeline)?.multiplier || 1
    const teamMultiplier = parseInt(teamSize) > 1 ? 1.3 : 1
    return Math.round(base * timelineMultiplier * teamMultiplier)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileCode className="w-10 h-10 text-bitcoin-500" />
            <h1 className="text-4xl font-bold text-white">Developer Contract Offer</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Create a development contract for Bitcoin OS or Bitcoin Apps. Define requirements, timeline, and compensation.
          </p>
        </div>

        {/* Contract Type Selection */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-bitcoin-500" />
            Contract Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {contractTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setContractType(type.id as ContractType)}
                className={`p-4 rounded-lg border transition-all ${
                  contractType === type.id
                    ? 'bg-bitcoin-500/20 border-bitcoin-500 text-white'
                    : 'bg-gray-800/30 border-gray-700 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <type.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{type.label}</div>
                <div className="text-xs opacity-70 mt-1">{type.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-bitcoin-500" />
              Project Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  placeholder="e.g., Bitcoin OS Payment Module"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technical Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  rows={4}
                  placeholder="Describe the technical requirements and goals of the project..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technical Specifications
                </label>
                <textarea
                  value={formData.technicalSpecs}
                  onChange={(e) => setFormData({ ...formData, technicalSpecs: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none font-mono text-sm"
                  rows={6}
                  placeholder="Architecture requirements, APIs, data structures, algorithms..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deliverables
                </label>
                <textarea
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  rows={4}
                  placeholder="List specific deliverables and acceptance criteria..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-bitcoin-500" />
              Technical Requirements
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Required Skills
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {technicalSkills.map((skill) => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.requiredSkills.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ 
                              ...formData, 
                              requiredSkills: [...formData.requiredSkills, skill] 
                            })
                          } else {
                            setFormData({ 
                              ...formData, 
                              requiredSkills: formData.requiredSkills.filter(s => s !== skill) 
                            })
                          }
                        }}
                        className="mr-2 text-bitcoin-500"
                      />
                      <span className="text-sm text-gray-300">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Security Requirements
                </label>
                <textarea
                  value={formData.securityRequirements}
                  onChange={(e) => setFormData({ ...formData, securityRequirements: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  rows={3}
                  placeholder="Security standards, audit requirements, compliance needs..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Performance Metrics
                </label>
                <textarea
                  value={formData.performanceMetrics}
                  onChange={(e) => setFormData({ ...formData, performanceMetrics: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  rows={3}
                  placeholder="TPS requirements, latency targets, scalability needs..."
                />
              </div>
            </div>
          </div>

          {/* Team & Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-bitcoin-500" />
                Team Requirements
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <label
                        key={level.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          experienceLevel === level.id
                            ? 'bg-bitcoin-500/20 border-bitcoin-500'
                            : 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="experience"
                            value={level.id}
                            checked={experienceLevel === level.id}
                            onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                            className="mr-3"
                          />
                          <div>
                            <div className="text-white font-medium">{level.label}</div>
                            <div className="text-xs text-gray-400">{level.years}</div>
                          </div>
                        </div>
                        <div className="text-bitcoin-400 font-mono text-sm">{level.rate}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Team Size
                  </label>
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    min="1"
                    max="20"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-bitcoin-500" />
                Timeline
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Timeline
                  </label>
                  <div className="space-y-2">
                    {timelines.map((tl) => (
                      <label
                        key={tl.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          timeline === tl.id
                            ? 'bg-bitcoin-500/20 border-bitcoin-500'
                            : 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="timeline"
                            value={tl.id}
                            checked={timeline === tl.id}
                            onChange={(e) => setTimeline(e.target.value as Timeline)}
                            className="mr-3"
                          />
                          <div>
                            <div className="text-white font-medium">{tl.label}</div>
                            <div className="text-xs text-gray-400">{tl.duration}</div>
                          </div>
                        </div>
                        <div className="text-bitcoin-400 text-xs">
                          {tl.multiplier}x rate
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Milestones
                  </label>
                  <textarea
                    value={formData.milestones}
                    onChange={(e) => setFormData({ ...formData, milestones: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                    rows={4}
                    placeholder="Define project milestones and payment schedule..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-bitcoin-500" />
              Compensation Structure
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Base Budget (USD)
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min="1000"
                  step="1000"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                />
                <div className="mt-2 text-sm text-gray-400">
                  Estimated total: <span className="text-bitcoin-400 font-bold">
                    ${estimatedCost().toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Methods
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.bitcoinPayment}
                      onChange={(e) => setFormData({ ...formData, bitcoinPayment: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Bitcoin (BSV)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.tokenPayment}
                      onChange={(e) => setFormData({ ...formData, tokenPayment: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">$bOS Tokens</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.fiatPayment}
                      onChange={(e) => setFormData({ ...formData, fiatPayment: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Fiat (USD/EUR)</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={formData.equityOffered}
                    onChange={(e) => setFormData({ ...formData, equityOffered: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-gray-300 font-medium">Offer Equity/Token Allocation</span>
                </label>
                {formData.equityOffered && (
                  <input
                    type="text"
                    value={formData.equityPercentage}
                    onChange={(e) => setFormData({ ...formData, equityPercentage: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
                    placeholder="e.g., 0.5% equity or 100,000 $bOS tokens"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-between items-center">
            <div className="text-gray-400">
              <CheckCircle className="inline w-4 h-4 mr-2" />
              Contract will be reviewed within 24 hours
            </div>
            <div className="flex gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-all"
              >
                Save Draft
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-bitcoin-500 hover:bg-bitcoin-600 rounded-lg text-white font-medium transition-all flex items-center gap-2"
              >
                <GitPullRequest className="w-5 h-5" />
                Submit Contract Offer
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}