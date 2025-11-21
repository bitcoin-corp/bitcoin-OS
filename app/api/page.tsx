'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Copy, Check, ChevronRight, Terminal, Book, Zap, Shield, Globe, Server, Database, Key } from 'lucide-react'
import './styles.css'

export default function APIReferencePage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('compute-create')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const endpoints = [
    {
      id: 'compute-create',
      method: 'POST',
      path: '/api/v1/compute/create',
      category: 'Compute',
      description: 'Create a new compute instance',
      params: [
        { name: 'cpu_cores', type: 'integer', required: true, description: 'Number of CPU cores (1-128)' },
        { name: 'memory_gb', type: 'integer', required: true, description: 'Memory in GB (1-512)' },
        { name: 'storage_gb', type: 'integer', required: false, description: 'Storage in GB (10-10000)' },
        { name: 'region', type: 'string', required: false, description: 'Deployment region' }
      ],
      example: `curl -X POST https://api.bitcoin-os.com/v1/compute/create \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cpu_cores": 4,
    "memory_gb": 16,
    "storage_gb": 100,
    "region": "us-east-1"
  }'`,
      response: `{
  "id": "cmp_1234567890",
  "status": "provisioning",
  "cpu_cores": 4,
  "memory_gb": 16,
  "storage_gb": 100,
  "region": "us-east-1",
  "created_at": "2024-01-15T10:00:00Z",
  "ip_address": "pending",
  "cost_per_hour": 0.45
}`
    },
    {
      id: 'compute-list',
      method: 'GET',
      path: '/api/v1/compute/list',
      category: 'Compute',
      description: 'List all compute instances',
      params: [
        { name: 'status', type: 'string', required: false, description: 'Filter by status' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of results (default: 20)' },
        { name: 'offset', type: 'integer', required: false, description: 'Pagination offset' }
      ],
      example: `curl -X GET https://api.bitcoin-os.com/v1/compute/list \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "instances": [
    {
      "id": "cmp_1234567890",
      "status": "running",
      "cpu_cores": 4,
      "memory_gb": 16,
      "region": "us-east-1"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}`
    },
    {
      id: 'contract-deploy',
      method: 'POST',
      path: '/api/v1/contracts/deploy',
      category: 'Contracts',
      description: 'Deploy a smart contract',
      params: [
        { name: 'contract_code', type: 'string', required: true, description: 'Base64 encoded contract code' },
        { name: 'constructor_params', type: 'object', required: false, description: 'Constructor parameters' },
        { name: 'gas_limit', type: 'integer', required: false, description: 'Gas limit for deployment' }
      ],
      example: `curl -X POST https://api.bitcoin-os.com/v1/contracts/deploy \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contract_code": "BASE64_ENCODED_CODE",
    "constructor_params": {},
    "gas_limit": 1000000
  }'`,
      response: `{
  "contract_id": "cnt_abc123",
  "transaction_hash": "0x1234...5678",
  "deployment_address": "1A2B3C...",
  "status": "pending"
}`
    },
    {
      id: 'wallet-balance',
      method: 'GET',
      path: '/api/v1/wallet/balance',
      category: 'Wallet',
      description: 'Get wallet balance',
      params: [
        { name: 'address', type: 'string', required: false, description: 'Wallet address (default: account wallet)' }
      ],
      example: `curl -X GET https://api.bitcoin-os.com/v1/wallet/balance \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "address": "1A2B3C4D5E6F...",
  "balance": {
    "bsv": "10.5",
    "bos": "1000000",
    "usd_value": "1050.00"
  },
  "pending": {
    "bsv": "0",
    "bos": "0"
  }
}`
    },
    {
      id: 'storage-upload',
      method: 'POST',
      path: '/api/v1/storage/upload',
      category: 'Storage',
      description: 'Upload file to decentralized storage',
      params: [
        { name: 'file', type: 'file', required: true, description: 'File to upload (max 5GB)' },
        { name: 'encryption', type: 'boolean', required: false, description: 'Enable encryption' },
        { name: 'redundancy', type: 'integer', required: false, description: 'Redundancy level (1-5)' }
      ],
      example: `curl -X POST https://api.bitcoin-os.com/v1/storage/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/file.pdf" \\
  -F "encryption=true" \\
  -F "redundancy=3"`,
      response: `{
  "file_id": "file_xyz789",
  "hash": "QmX4f6...",
  "size_bytes": 1024000,
  "storage_cost": "0.001",
  "access_url": "https://storage.bitcoin-os.com/file_xyz789"
}`
    }
  ]

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint)

  return (
    <div className="api-page">
      <div className="api-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Code2 className="header-icon" />
          <h1 className="header-title">API Reference</h1>
          <p className="header-subtitle">
            Build powerful applications with Bitcoin OS APIs
          </p>
          
          <div className="api-info">
            <div className="info-item">
              <Key className="info-icon" />
              <div>
                <div className="info-label">Base URL</div>
                <code className="info-value">https://api.bitcoin-os.com/v1</code>
              </div>
            </div>
            <div className="info-item">
              <Shield className="info-icon" />
              <div>
                <div className="info-label">Authentication</div>
                <code className="info-value">Bearer Token</code>
              </div>
            </div>
            <div className="info-item">
              <Zap className="info-icon" />
              <div>
                <div className="info-label">Rate Limit</div>
                <code className="info-value">1000 req/min</code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="api-container">
        <div className="api-sidebar">
          <h3 className="sidebar-title">Endpoints</h3>
          
          <div className="endpoint-categories">
            <div className="category">
              <h4 className="category-title">Compute</h4>
              {endpoints.filter(e => e.category === 'Compute').map(endpoint => (
                <button
                  key={endpoint.id}
                  className={`endpoint-item ${selectedEndpoint === endpoint.id ? 'active' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <span className="endpoint-path">{endpoint.path.split('/').pop()}</span>
                </button>
              ))}
            </div>
            
            <div className="category">
              <h4 className="category-title">Contracts</h4>
              {endpoints.filter(e => e.category === 'Contracts').map(endpoint => (
                <button
                  key={endpoint.id}
                  className={`endpoint-item ${selectedEndpoint === endpoint.id ? 'active' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <span className="endpoint-path">{endpoint.path.split('/').pop()}</span>
                </button>
              ))}
            </div>
            
            <div className="category">
              <h4 className="category-title">Wallet</h4>
              {endpoints.filter(e => e.category === 'Wallet').map(endpoint => (
                <button
                  key={endpoint.id}
                  className={`endpoint-item ${selectedEndpoint === endpoint.id ? 'active' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <span className="endpoint-path">{endpoint.path.split('/').pop()}</span>
                </button>
              ))}
            </div>
            
            <div className="category">
              <h4 className="category-title">Storage</h4>
              {endpoints.filter(e => e.category === 'Storage').map(endpoint => (
                <button
                  key={endpoint.id}
                  className={`endpoint-item ${selectedEndpoint === endpoint.id ? 'active' : ''}`}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                >
                  <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <span className="endpoint-path">{endpoint.path.split('/').pop()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {selectedEndpointData && (
          <motion.div 
            className="api-content"
            key={selectedEndpointData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="endpoint-header">
              <div className="endpoint-title">
                <span className={`method-badge large ${selectedEndpointData.method.toLowerCase()}`}>
                  {selectedEndpointData.method}
                </span>
                <h2>{selectedEndpointData.path}</h2>
              </div>
              <p className="endpoint-description">{selectedEndpointData.description}</p>
            </div>

            <section className="api-section">
              <h3>Parameters</h3>
              <div className="params-table">
                <div className="param-header">
                  <span>Name</span>
                  <span>Type</span>
                  <span>Required</span>
                  <span>Description</span>
                </div>
                {selectedEndpointData.params.map(param => (
                  <div key={param.name} className="param-row">
                    <code className="param-name">{param.name}</code>
                    <span className="param-type">{param.type}</span>
                    <span className={`param-required ${param.required ? 'yes' : 'no'}`}>
                      {param.required ? 'Yes' : 'No'}
                    </span>
                    <span className="param-description">{param.description}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="api-section">
              <div className="section-header">
                <h3>Example Request</h3>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(selectedEndpointData.example, 'example')}
                >
                  {copiedCode === 'example' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedCode === 'example' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="code-block">
                <code>{selectedEndpointData.example}</code>
              </pre>
            </section>

            <section className="api-section">
              <div className="section-header">
                <h3>Response</h3>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(selectedEndpointData.response, 'response')}
                >
                  {copiedCode === 'response' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedCode === 'response' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="code-block">
                <code>{selectedEndpointData.response}</code>
              </pre>
            </section>
          </motion.div>
        )}
      </div>

      <div className="api-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#" className="footer-link">
              <Book size={16} />
              Full Documentation
            </a>
            <a href="#" className="footer-link">
              <Terminal size={16} />
              SDKs & Libraries
            </a>
            <a href="#" className="footer-link">
              <Globe size={16} />
              API Status
            </a>
          </div>
          
          <div className="footer-section">
            <h4>Need Help?</h4>
            <p>Join our developer community for support and updates.</p>
            <button className="btn-discord">Join Discord</button>
          </div>
        </div>
      </div>
    </div>
  )
}