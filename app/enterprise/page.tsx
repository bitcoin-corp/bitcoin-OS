'use client'

import { motion } from 'framer-motion'
import { Building2, Server, Shield, Zap, Users, BarChart3, Lock, Cloud, Globe, CheckCircle, ArrowRight, Cpu, HardDrive, Activity } from 'lucide-react'
import './styles.css'

export default function EnterprisePage() {
  const solutions = [
    {
      id: 'dedicated',
      title: 'Dedicated Compute Clusters',
      description: 'Private, high-performance compute infrastructure for your enterprise workloads',
      icon: Server,
      features: [
        'Isolated compute environments',
        'Custom resource allocation',
        '99.99% uptime SLA',
        'Dedicated support team'
      ],
      pricing: 'Custom pricing',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'hybrid',
      title: 'Hybrid Cloud Integration',
      description: 'Seamlessly integrate Bitcoin OS compute with your existing cloud infrastructure',
      icon: Cloud,
      features: [
        'Multi-cloud compatibility',
        'API integration',
        'Data sovereignty',
        'Flexible deployment'
      ],
      pricing: 'Starting at $10,000/mo',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'managed',
      title: 'Managed Services',
      description: 'Let our experts handle your Bitcoin OS infrastructure and operations',
      icon: Users,
      features: [
        '24/7 monitoring',
        'Performance optimization',
        'Security management',
        'Compliance support'
      ],
      pricing: 'Starting at $5,000/mo',
      color: 'from-green-600 to-emerald-600'
    }
  ]

  const benefits = [
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption and security protocols' },
    { icon: Zap, title: 'Lightning Fast', description: 'Sub-millisecond latency for critical workloads' },
    { icon: Globe, title: 'Global Infrastructure', description: 'Data centers across 50+ locations worldwide' },
    { icon: BarChart3, title: 'Analytics & Insights', description: 'Real-time monitoring and performance analytics' },
    { icon: Lock, title: 'Compliance Ready', description: 'SOC 2, HIPAA, GDPR compliant infrastructure' },
    { icon: Activity, title: '24/7 Support', description: 'Dedicated enterprise support team' }
  ]

  const specs = [
    { label: 'CPU Cores', value: 'Up to 10,000', icon: Cpu },
    { label: 'Storage', value: 'Unlimited PB', icon: HardDrive },
    { label: 'Network', value: '100 Gbps', icon: Activity },
    { label: 'Availability', value: '99.99% SLA', icon: CheckCircle }
  ]

  return (
    <div className="enterprise-page">
      <div className="enterprise-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Building2 className="hero-icon" />
          <h1 className="hero-title">
            Enterprise Solutions
          </h1>
          <p className="hero-subtitle">
            Scale your business with Bitcoin OS distributed compute infrastructure
          </p>
          
          <div className="hero-specs">
            {specs.map((spec, index) => (
              <motion.div 
                key={spec.label}
                className="spec-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <spec.icon className="spec-icon" />
                <div className="spec-value">{spec.value}</div>
                <div className="spec-label">{spec.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn-primary">
              Schedule Demo
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary">
              Download Whitepaper
            </button>
          </div>
        </motion.div>
      </div>

      <section className="solutions-section">
        <div className="section-header">
          <h2>Tailored Solutions for Every Enterprise</h2>
          <p>Choose the deployment model that fits your needs</p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <motion.div 
              key={solution.id}
              className="solution-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`solution-icon-wrapper bg-gradient-to-br ${solution.color}`}>
                <solution.icon className="solution-icon" />
              </div>
              
              <h3 className="solution-title">{solution.title}</h3>
              <p className="solution-description">{solution.description}</p>
              
              <ul className="solution-features">
                {solution.features.map((feature, i) => (
                  <li key={i}>
                    <CheckCircle size={16} className="feature-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="solution-footer">
                <div className="solution-pricing">{solution.pricing}</div>
                <button className="btn-solution">
                  Learn More
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-header">
          <h2>Why Choose Bitcoin OS Enterprise?</h2>
          <p>Built for scale, security, and performance</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.title}
              className="benefit-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <benefit.icon className="benefit-icon" />
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Infrastructure?</h2>
          <p>Join leading enterprises leveraging Bitcoin OS compute</p>
          <div className="cta-actions">
            <button className="btn-cta-primary">
              Start Enterprise Trial
              <ArrowRight size={18} />
            </button>
            <button className="btn-cta-secondary">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}