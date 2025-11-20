'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Rocket,
  User,
  Mail,
  Building,
  Globe,
  Linkedin,
  Twitter,
  FileText,
  Code,
  Target,
  Users,
  ChevronRight,
  Send
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function DojoApply() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    linkedin: '',
    twitter: '',
    projectDescription: '',
    techStack: '',
    teamSize: '',
    fundingStage: '',
    whyDojo: '',
    track: 'foundation'
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    setSubmitted(true)
    console.log('Application submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg"
        >
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <Send className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-300 mb-8">
            Thank you for applying to Bitcoin Dojo. Our team will review your application and get back to you within 5 business days.
          </p>
          <Link href="/dojo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-bitcoin-500 rounded-lg text-white font-semibold hover:bg-bitcoin-600 transition-all"
            >
              Back to Dojo
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950 overflow-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500/10 via-transparent to-bitcoin-600/10" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <header className="px-6 py-8 border-b border-bitcoin-800/30">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-6">
                <Link href="/dojo" className="text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-bitcoin-500" />
                  <h1 className="text-2xl font-bold text-white">Apply to Bitcoin Dojo</h1>
                </div>
              </div>
            </div>
          </header>

          <section className="px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Begin Your Bitcoin Journey</h2>
                <p className="text-gray-300">
                  Join the most intensive Bitcoin development program. We're looking for exceptional builders ready to transform the future of finance.
                </p>
              </motion.div>

              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Personal Information */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-bitcoin-500" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="John Nakamoto"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Building className="w-5 h-5 text-bitcoin-500" />
                    Company Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="Bitcoin Builders Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-bitcoin-500" />
                    Social Presence
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Twitter/X Handle</label>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="@yourhandle"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-bitcoin-500" />
                    Project Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Project Description *</label>
                      <textarea
                        name="projectDescription"
                        required
                        value={formData.projectDescription}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="Describe your project and what problem it solves..."
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Technical Stack</label>
                      <textarea
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="List the technologies you're using or planning to use..."
                      />
                    </div>
                  </div>
                </div>

                {/* Team & Funding */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-bitcoin-500" />
                    Team & Funding
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Team Size</label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select team size</option>
                        <option value="1">Solo founder</option>
                        <option value="2-5">2-5 members</option>
                        <option value="6-10">6-10 members</option>
                        <option value="10+">10+ members</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Funding Stage</label>
                      <select
                        name="fundingStage"
                        value={formData.fundingStage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select funding stage</option>
                        <option value="pre-seed">Pre-seed</option>
                        <option value="seed">Seed</option>
                        <option value="series-a">Series A</option>
                        <option value="series-b+">Series B+</option>
                        <option value="bootstrapped">Bootstrapped</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-bitcoin-500" />
                    Program Selection
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Preferred Track *</label>
                      <select
                        name="track"
                        required
                        value={formData.track}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                      >
                        <option value="foundation">Foundation Track (8 weeks)</option>
                        <option value="scale">Scale Track (12 weeks)</option>
                        <option value="enterprise">Enterprise Track (16 weeks)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Why Bitcoin Dojo? *</label>
                      <textarea
                        name="whyDojo"
                        required
                        value={formData.whyDojo}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none transition-colors"
                        placeholder="Tell us why you want to join Bitcoin Dojo and what you hope to achieve..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg text-white font-semibold hover:from-bitcoin-600 hover:to-bitcoin-700 transition-all shadow-xl text-lg flex items-center gap-2"
                  >
                    Submit Application
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.form>

              {/* Footer Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12 text-sm text-gray-400"
              >
                <p>Applications are reviewed on a rolling basis.</p>
                <p>You will receive a response within 5 business days.</p>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}