'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Upload, Code2, Globe, Shield, Zap, Users, DollarSign, Calendar, GitBranch, CheckCircle, AlertCircle, Info } from 'lucide-react'
import './styles.css'

export default function CreateAppOfferPage() {
  const [appType, setAppType] = useState('web')
  const [category, setCategory] = useState('productivity')
  const [pricing, setPricing] = useState('freemium')
  const [deploymentType, setDeploymentType] = useState('cloud')
  const [supportLevel, setSupportLevel] = useState('community')
  
  const appTypes = [
    { id: 'web', label: 'Web Application', icon: Globe },
    { id: 'mobile', label: 'Mobile App', icon: Package },
    { id: 'desktop', label: 'Desktop Software', icon: Code2 },
    { id: 'api', label: 'API Service', icon: GitBranch },
    { id: 'blockchain', label: 'Blockchain App', icon: Shield }
  ]

  const categories = [
    'Productivity', 'Finance', 'Gaming', 'Social', 'Education',
    'Health', 'Entertainment', 'Business', 'Developer Tools', 'AI/ML'
  ]

  const pricingModels = [
    { id: 'free', label: 'Free', description: 'No cost to users' },
    { id: 'freemium', label: 'Freemium', description: 'Free tier with premium features' },
    { id: 'subscription', label: 'Subscription', description: 'Monthly or annual fees' },
    { id: 'one-time', label: 'One-time Purchase', description: 'Single payment' },
    { id: 'usage', label: 'Usage-based', description: 'Pay per use or consumption' }
  ]

  const deploymentTypes = [
    { id: 'cloud', label: 'Cloud Hosted', description: 'Runs on Bitcoin OS infrastructure' },
    { id: 'self-hosted', label: 'Self-hosted', description: 'Users host on their own servers' },
    { id: 'hybrid', label: 'Hybrid', description: 'Combination of cloud and self-hosted' },
    { id: 'edge', label: 'Edge Computing', description: 'Distributed edge deployment' }
  ]

  return (
    <div className="app-offer-page">
      <div className="app-offer-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Package className="header-icon" />
          <h1 className="header-title">Create App Offer</h1>
          <p className="header-subtitle">
            List your application on the Bitcoin OS marketplace
          </p>
        </motion.div>
      </div>

      <div className="app-offer-container">
        <form className="app-offer-form">
          {/* Basic Information */}
          <motion.section 
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="section-title">Basic Information</h2>
            
            <div className="form-group">
              <label htmlFor="app-name">App Name *</label>
              <input 
                id="app-name"
                type="text" 
                placeholder="Enter your app name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="app-tagline">Tagline *</label>
              <input 
                id="app-tagline"
                type="text" 
                placeholder="A short description in 10 words or less"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="app-description">Description *</label>
              <textarea 
                id="app-description"
                placeholder="Describe your app's features and benefits..."
                className="form-textarea"
                rows={6}
                required
              />
            </div>

            <div className="form-group">
              <label>App Type *</label>
              <div className="radio-grid">
                {appTypes.map(type => (
                  <label key={type.id} className="radio-card">
                    <input 
                      type="radio" 
                      name="appType" 
                      value={type.id}
                      checked={appType === type.id}
                      onChange={(e) => setAppType(e.target.value)}
                    />
                    <div className="radio-card-content">
                      <type.icon size={20} />
                      <span>{type.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="app-category">Category *</label>
              <select 
                id="app-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="app-website">Website URL</label>
              <input 
                id="app-website"
                type="url" 
                placeholder="https://your-app.com"
                className="form-input"
              />
            </div>
          </motion.section>

          {/* Technical Details */}
          <motion.section 
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title">Technical Details</h2>

            <div className="form-group">
              <label htmlFor="tech-stack">Technology Stack *</label>
              <input 
                id="tech-stack"
                type="text" 
                placeholder="e.g., React, Node.js, PostgreSQL, Bitcoin Script"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Deployment Type *</label>
              <div className="deployment-grid">
                {deploymentTypes.map(type => (
                  <label key={type.id} className="deployment-card">
                    <input 
                      type="radio" 
                      name="deploymentType" 
                      value={type.id}
                      checked={deploymentType === type.id}
                      onChange={(e) => setDeploymentType(e.target.value)}
                    />
                    <div className="deployment-card-content">
                      <div className="deployment-title">{type.label}</div>
                      <div className="deployment-desc">{type.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="api-endpoints">API Endpoints (if applicable)</label>
              <textarea 
                id="api-endpoints"
                placeholder="List your API endpoints and their functions..."
                className="form-textarea"
                rows={4}
              />
            </div>

            <div className="form-group">
              <label htmlFor="system-requirements">System Requirements</label>
              <textarea 
                id="system-requirements"
                placeholder="Minimum hardware/software requirements..."
                className="form-textarea"
                rows={4}
              />
            </div>
          </motion.section>

          {/* Pricing & Monetization */}
          <motion.section 
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="section-title">Pricing & Monetization</h2>

            <div className="form-group">
              <label>Pricing Model *</label>
              <div className="pricing-grid">
                {pricingModels.map(model => (
                  <label key={model.id} className="pricing-card">
                    <input 
                      type="radio" 
                      name="pricingModel" 
                      value={model.id}
                      checked={pricing === model.id}
                      onChange={(e) => setPricing(e.target.value)}
                    />
                    <div className="pricing-card-content">
                      <div className="pricing-title">{model.label}</div>
                      <div className="pricing-desc">{model.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {pricing !== 'free' && (
              <div className="form-group">
                <label htmlFor="pricing-details">Pricing Details</label>
                <textarea 
                  id="pricing-details"
                  placeholder="Describe your pricing tiers, costs, and what's included..."
                  className="form-textarea"
                  rows={4}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="revenue-share">Revenue Share Model</label>
              <input 
                id="revenue-share"
                type="text" 
                placeholder="e.g., 70% developer / 30% platform"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment-methods">Accepted Payment Methods</label>
              <input 
                id="payment-methods"
                type="text" 
                placeholder="e.g., BSV, Credit Card, PayPal"
                className="form-input"
              />
            </div>
          </motion.section>

          {/* Support & Documentation */}
          <motion.section 
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">Support & Documentation</h2>

            <div className="form-group">
              <label>Support Level *</label>
              <div className="support-grid">
                <label className="support-option">
                  <input 
                    type="radio" 
                    name="supportLevel" 
                    value="community"
                    checked={supportLevel === 'community'}
                    onChange={(e) => setSupportLevel(e.target.value)}
                  />
                  <span>Community Support</span>
                </label>
                <label className="support-option">
                  <input 
                    type="radio" 
                    name="supportLevel" 
                    value="email"
                    checked={supportLevel === 'email'}
                    onChange={(e) => setSupportLevel(e.target.value)}
                  />
                  <span>Email Support</span>
                </label>
                <label className="support-option">
                  <input 
                    type="radio" 
                    name="supportLevel" 
                    value="priority"
                    checked={supportLevel === 'priority'}
                    onChange={(e) => setSupportLevel(e.target.value)}
                  />
                  <span>Priority Support</span>
                </label>
                <label className="support-option">
                  <input 
                    type="radio" 
                    name="supportLevel" 
                    value="enterprise"
                    checked={supportLevel === 'enterprise'}
                    onChange={(e) => setSupportLevel(e.target.value)}
                  />
                  <span>24/7 Enterprise</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="documentation-url">Documentation URL</label>
              <input 
                id="documentation-url"
                type="url" 
                placeholder="https://docs.your-app.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="github-repo">GitHub Repository</label>
              <input 
                id="github-repo"
                type="url" 
                placeholder="https://github.com/username/repo"
                className="form-input"
              />
            </div>
          </motion.section>

          {/* Media & Assets */}
          <motion.section 
            className="form-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="section-title">Media & Assets</h2>

            <div className="form-group">
              <label>App Icon *</label>
              <div className="upload-area">
                <Upload className="upload-icon" />
                <p>Drop your app icon here or click to browse</p>
                <span className="upload-hint">512x512px PNG recommended</span>
              </div>
            </div>

            <div className="form-group">
              <label>Screenshots</label>
              <div className="upload-area">
                <Upload className="upload-icon" />
                <p>Drop screenshots here or click to browse</p>
                <span className="upload-hint">Up to 5 images, 1920x1080px recommended</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="demo-video">Demo Video URL</label>
              <input 
                id="demo-video"
                type="url" 
                placeholder="YouTube or Vimeo link"
                className="form-input"
              />
            </div>
          </motion.section>

          {/* Submit Section */}
          <motion.section 
            className="form-section submit-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="info-box">
              <Info className="info-icon" />
              <div>
                <h3>Review Process</h3>
                <p>Your app will be reviewed by our team within 2-3 business days. You'll receive an email with the review results and any required changes.</p>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-save-draft">
                Save as Draft
              </button>
              <button type="submit" className="btn-submit">
                Submit for Review
              </button>
            </div>
          </motion.section>
        </form>
      </div>
    </div>
  )
}