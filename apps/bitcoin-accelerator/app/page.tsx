'use client'

import { motion } from 'framer-motion'
import { 
  Rocket, 
  Users, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Award,
  Code,
  Globe,
  Zap,
  Building,
  GraduationCap,
  UserCheck,
  ChevronRight,
  Star,
  Brain,
  Trophy
} from 'lucide-react'
import { useState } from 'react'

export default function BitcoinAccelerator() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const programs = [
    {
      title: "Foundation Track",
      duration: "8 weeks",
      icon: <Building className="w-6 h-6" />,
      description: "Master the fundamentals of building on Bitcoin",
      topics: ["Bitcoin Protocol Deep Dive", "Smart Contract Development", "Transaction Engineering", "Security Best Practices"]
    },
    {
      title: "Scale Track", 
      duration: "12 weeks",
      icon: <Rocket className="w-6 h-6" />,
      description: "Transform your proof of concept into a scalable business",
      topics: ["Product-Market Fit", "On-Chain Economics", "User Acquisition", "Infrastructure Scaling"]
    },
    {
      title: "Enterprise Track",
      duration: "16 weeks", 
      icon: <Globe className="w-6 h-6" />,
      description: "Build enterprise-grade solutions on Bitcoin",
      topics: ["Enterprise Architecture", "Compliance & Regulation", "B2B Sales Strategy", "Global Expansion"]
    }
  ]

  const curriculum = [
    {
      week: "Weeks 1-4",
      title: "Foundations & Vision",
      modules: [
        "Bitcoin Protocol Mastery",
        "Business Model Canvas for Web3",
        "Token Economics & Incentive Design",
        "Legal & Regulatory Framework"
      ]
    },
    {
      week: "Weeks 5-8",
      title: "Product Development",
      modules: [
        "Advanced Smart Contract Patterns",
        "User Experience in Decentralized Apps",
        "Security Auditing & Best Practices",
        "Performance Optimization"
      ]
    },
    {
      week: "Weeks 9-12",
      title: "Growth & Scale",
      modules: [
        "Go-to-Market Strategy",
        "Community Building & Governance",
        "Fundraising & Investor Relations",
        "Partnership Development"
      ]
    },
    {
      week: "Weeks 13-16",
      title: "Launch & Beyond",
      modules: [
        "Product Launch Preparation",
        "Marketing & PR Strategy",
        "Metrics & Analytics",
        "Post-Launch Growth Hacking"
      ]
    }
  ]

  const mentors = [
    { expertise: "Protocol Development", count: 12 },
    { expertise: "Business Strategy", count: 8 },
    { expertise: "Product Design", count: 6 },
    { expertise: "Marketing & Growth", count: 10 },
    { expertise: "Legal & Compliance", count: 4 },
    { expertise: "Investment & Finance", count: 7 }
  ]

  const benefits = [
    {
      icon: <Brain className="w-8 h-8 text-bitcoin-500" />,
      title: "Elite Mentorship",
      description: "1-on-1 guidance from successful Bitcoin entrepreneurs and protocol developers"
    },
    {
      icon: <Trophy className="w-8 h-8 text-bitcoin-500" />,
      title: "$500K Seed Funding",
      description: "Top graduates eligible for seed investment from our partner network"
    },
    {
      icon: <Users className="w-8 h-8 text-bitcoin-500" />,
      title: "Global Network",
      description: "Lifetime access to our alumni network of 500+ Bitcoin builders"
    },
    {
      icon: <Code className="w-8 h-8 text-bitcoin-500" />,
      title: "Technical Resources",
      description: "Free credits for infrastructure, tools, and development resources"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-bitcoin-500" />,
      title: "Partner Introductions",
      description: "Direct introductions to exchanges, wallets, and enterprise clients"
    },
    {
      icon: <Award className="w-8 h-8 text-bitcoin-500" />,
      title: "Demo Day",
      description: "Present to 100+ investors at our exclusive Demo Day event"
    }
  ]

  const successStories = [
    { company: "ChainPay", valuation: "$50M", description: "Bitcoin payment infrastructure" },
    { company: "BlockAuth", valuation: "$30M", description: "Decentralized identity platform" },
    { company: "SatoshiDeFi", valuation: "$75M", description: "DeFi protocol on Bitcoin" },
    { company: "BitcoinOS", valuation: "$100M", description: "Operating system for Bitcoin apps" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500/10 via-transparent to-bitcoin-600/10" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <header className="px-6 py-8 border-b border-bitcoin-800/30">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Rocket className="w-8 h-8 text-bitcoin-500" />
                <h1 className="text-2xl font-bold text-white">Bitcoin Accelerator</h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg text-white font-semibold hover:from-bitcoin-600 hover:to-bitcoin-700 transition-all shadow-lg"
              >
                Apply Now
              </motion.button>
            </div>
          </header>

          <section className="px-6 py-16 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Scale Your Vision on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitcoin-400 to-bitcoin-600">
                  Bitcoin
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Elite training for exceptional entrepreneurs ready to build the future of finance
              </p>
              <div className="flex justify-center gap-6 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-bitcoin-500">500+</div>
                  <div className="text-gray-400">Alumni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-bitcoin-500">$2B+</div>
                  <div className="text-gray-400">Total Valuation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-bitcoin-500">87%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">Choose Your Path</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-bitcoin-800/30 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-bitcoin-500/20 rounded-lg">
                        {program.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">{program.title}</h4>
                        <span className="text-sm text-bitcoin-400">{program.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{program.description}</p>
                    <ul className="space-y-2">
                      {program.topics.map(topic => (
                        <li key={topic} className="flex items-start gap-2 text-sm text-gray-400">
                          <ChevronRight className="w-4 h-4 text-bitcoin-500 mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-12 bg-black/30">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">Curriculum Overview</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {curriculum.map((phase, index) => (
                  <motion.div
                    key={phase.week}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-bitcoin-800/30 rounded-xl p-6 h-full">
                      <div className="text-bitcoin-400 text-sm font-semibold mb-2">{phase.week}</div>
                      <h4 className="text-lg font-bold text-white mb-4">{phase.title}</h4>
                      <ul className="space-y-2">
                        {phase.modules.map(module => (
                          <li 
                            key={module}
                            className="text-sm text-gray-400 hover:text-bitcoin-400 cursor-pointer transition-colors"
                            onClick={() => setActiveModule(module)}
                          >
                            • {module}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < curriculum.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ChevronRight className="w-6 h-6 text-bitcoin-500" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">Program Benefits</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-bitcoin-900/20 to-bitcoin-950/20 border border-bitcoin-800/30 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="mb-4">{benefit.icon}</div>
                    <h4 className="text-xl font-semibold text-white mb-2">{benefit.title}</h4>
                    <p className="text-gray-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-12 bg-gradient-to-br from-bitcoin-900/20 to-bitcoin-950/20">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">Success Stories</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.company}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-bitcoin-500 mb-2">{story.valuation}</div>
                    <div className="text-lg font-semibold text-white">{story.company}</div>
                    <div className="text-sm text-gray-400">{story.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-white text-center mb-12">World-Class Mentors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {mentors.map((mentor, index) => (
                  <motion.div
                    key={mentor.expertise}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="text-center p-4 bg-gray-800/30 rounded-lg border border-bitcoin-800/30"
                  >
                    <div className="text-2xl font-bold text-bitcoin-500 mb-1">{mentor.count}</div>
                    <div className="text-xs text-gray-400">{mentor.expertise}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-16 text-center border-t border-bitcoin-800/30">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-6">Ready to Scale?</h3>
              <p className="text-xl text-gray-300 mb-8">
                Applications are reviewed on a rolling basis. Only exceptional founders will be selected.
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg text-white font-semibold hover:from-bitcoin-600 hover:to-bitcoin-700 transition-all shadow-xl text-lg"
                >
                  Apply to Cohort 2025
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gray-800/50 border border-bitcoin-600 rounded-lg text-bitcoin-400 font-semibold hover:bg-gray-800/70 transition-all"
                >
                  Schedule Info Session
                </motion.button>
              </div>
              <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-bitcoin-500" />
                  Next Cohort: Q1 2025
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-bitcoin-500" />
                  Limited to 25 Teams
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-bitcoin-500" />
                  100% On-Chain Focus
                </span>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}