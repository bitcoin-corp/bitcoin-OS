'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Search, Filter, Star, Download, Users, DollarSign, ChevronRight, Grid3X3, List, TrendingUp, Clock, Zap, Shield, Globe, Code2, GitBranch } from 'lucide-react'
import './styles.css'

interface App {
  id: string
  name: string
  tagline: string
  category: string
  icon: any
  rating: number
  reviews: number
  downloads: string
  price: string
  type: string
  developer: string
  verified: boolean
  featured?: boolean
  trending?: boolean
}

export default function AppMarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    'All', 'Productivity', 'Finance', 'Gaming', 'Social', 'Education',
    'Health', 'Entertainment', 'Business', 'Developer Tools', 'AI/ML'
  ]

  const apps: App[] = [
    {
      id: 'bitcoin-wallet-pro',
      name: 'Bitcoin Wallet Pro',
      tagline: 'Secure multi-sig wallet with advanced features',
      category: 'Finance',
      icon: Shield,
      rating: 4.8,
      reviews: 1234,
      downloads: '50K+',
      price: 'Free',
      type: 'Mobile',
      developer: 'CryptoDevs Inc.',
      verified: true,
      featured: true
    },
    {
      id: 'code-editor-x',
      name: 'Code Editor X',
      tagline: 'Professional IDE for Bitcoin Script development',
      category: 'Developer Tools',
      icon: Code2,
      rating: 4.9,
      reviews: 567,
      downloads: '10K+',
      price: '$29.99',
      type: 'Desktop',
      developer: 'DevTools Co.',
      verified: true,
      trending: true
    },
    {
      id: 'defi-dashboard',
      name: 'DeFi Dashboard',
      tagline: 'Track and manage your DeFi portfolio',
      category: 'Finance',
      icon: TrendingUp,
      rating: 4.6,
      reviews: 890,
      downloads: '25K+',
      price: 'Freemium',
      type: 'Web',
      developer: 'DeFi Solutions',
      verified: true
    },
    {
      id: 'bitcoin-games',
      name: 'Bitcoin Games',
      tagline: 'Play-to-earn gaming platform',
      category: 'Gaming',
      icon: Zap,
      rating: 4.5,
      reviews: 2345,
      downloads: '100K+',
      price: 'Free',
      type: 'Mobile',
      developer: 'GameFi Studios',
      verified: false,
      trending: true
    },
    {
      id: 'smart-contracts',
      name: 'Smart Contract Builder',
      tagline: 'Visual smart contract development tool',
      category: 'Developer Tools',
      icon: GitBranch,
      rating: 4.7,
      reviews: 432,
      downloads: '5K+',
      price: '$49.99/mo',
      type: 'Web',
      developer: 'Blockchain Tools',
      verified: true
    },
    {
      id: 'social-bitcoin',
      name: 'Social Bitcoin',
      tagline: 'Decentralized social network',
      category: 'Social',
      icon: Users,
      rating: 4.4,
      reviews: 1567,
      downloads: '75K+',
      price: 'Free',
      type: 'Web',
      developer: 'Social Chain',
      verified: false
    },
    {
      id: 'learn-bitcoin',
      name: 'Learn Bitcoin',
      tagline: 'Interactive Bitcoin education platform',
      category: 'Education',
      icon: Globe,
      rating: 4.9,
      reviews: 789,
      downloads: '30K+',
      price: '$9.99/mo',
      type: 'Mobile',
      developer: 'EduTech Labs',
      verified: true,
      featured: true
    },
    {
      id: 'bitcoin-analytics',
      name: 'Bitcoin Analytics',
      tagline: 'Real-time blockchain analytics and insights',
      category: 'Business',
      icon: TrendingUp,
      rating: 4.7,
      reviews: 345,
      downloads: '15K+',
      price: '$99.99/mo',
      type: 'API',
      developer: 'Data Insights Inc.',
      verified: true
    }
  ]

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch(sortBy) {
      case 'rating': return b.rating - a.rating
      case 'downloads': return parseInt(b.downloads) - parseInt(a.downloads)
      case 'newest': return 0 // Would use dates in real app
      default: return b.reviews - a.reviews // popular
    }
  })

  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Package className="header-icon" />
          <h1 className="header-title">App Marketplace</h1>
          <p className="header-subtitle">
            Discover and deploy Bitcoin OS applications
          </p>
          
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-value">35+</div>
              <div className="stat-label">Apps</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">500K+</div>
              <div className="stat-label">Downloads</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.7</div>
              <div className="stat-label">Avg Rating</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="marketplace-container">
        <div className="marketplace-controls">
          <div className="search-bar">
            <Search className="search-icon" />
            <input 
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="control-row">
            <div className="category-tabs">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-tab ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="control-actions">
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
                <option value="newest">Newest First</option>
              </select>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`apps-container ${viewMode}`}>
          {sortedApps.map((app, index) => (
            <motion.div 
              key={app.id}
              className="app-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {app.featured && <div className="app-badge featured">Featured</div>}
              {app.trending && <div className="app-badge trending">Trending</div>}
              
              <div className="app-header">
                <div className="app-icon-wrapper">
                  <app.icon className="app-icon" />
                </div>
                <div className="app-info">
                  <div className="app-name-row">
                    <h3 className="app-name">{app.name}</h3>
                    {app.verified && <Shield className="verified-badge" size={16} />}
                  </div>
                  <p className="app-tagline">{app.tagline}</p>
                  <div className="app-meta">
                    <span className="app-developer">by {app.developer}</span>
                    <span className="app-type">{app.type}</span>
                  </div>
                </div>
              </div>

              <div className="app-stats">
                <div className="stat">
                  <Star className="stat-icon" size={14} />
                  <span>{app.rating}</span>
                  <span className="stat-label">({app.reviews})</span>
                </div>
                <div className="stat">
                  <Download className="stat-icon" size={14} />
                  <span>{app.downloads}</span>
                </div>
                <div className="stat">
                  <DollarSign className="stat-icon" size={14} />
                  <span>{app.price}</span>
                </div>
              </div>

              <div className="app-footer">
                <span className="app-category">{app.category}</span>
                <button className="app-action-btn">
                  View Details
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedApps.length === 0 && (
          <div className="no-results">
            <Package className="no-results-icon" />
            <h3>No apps found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  )
}