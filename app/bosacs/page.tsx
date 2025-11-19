'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContractsDownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Create a blob URL for the HTML content to be converted to PDF
    const printWindow = window.open('/bitcoin-os-contracts-framework-print.html', '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setIsDownloading(false);
        }, 1000);
      };
    } else {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-y-scroll">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-black">₿</span>
                </div>
                <span className="font-bold text-xl">Bitcoin OS</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/platform" className="text-gray-300 hover:text-white transition-colors">
                Platform
              </Link>
              <Link href="/contracts" className="text-gray-300 hover:text-white transition-colors">
                Contracts
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            Technical Specification
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            bOSacs (Bitcoin OS Atomic Contracts)
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionary framework fusing Ricardian Contracts with Coasian Economics for Bitcoin-OS. 
            Download the complete technical specification and implementation guide.
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Specification
              </>
            )}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Professional document optimized for printing and corporate distribution
          </p>
        </div>

        {/* Theoretical Foundation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Theoretical Foundation</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Ricardian Contracts</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Created by Ian Grigg, Ricardian Contracts are documents that are simultaneously 
                human and machine-readable, cryptographically signed, and carry information 
                about rights and obligations. They bridge the gap between legal prose and 
                code execution.
              </p>
              <a 
                href="https://en.wikipedia.org/wiki/Ricardian_contract" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Learn more about Ricardian Contracts
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Coase&apos;s Theory of the Firm</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Nobel Prize winner Ronald Coase&apos;s groundbreaking theory explains why firms exist 
                and when market mechanisms are superior to hierarchical organization. The theory 
                centers on transaction costs - the costs of using the price mechanism.
              </p>
              <a 
                href="https://en.wikipedia.org/wiki/Theory_of_the_firm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
              >
                Explore Theory of the Firm
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* The Fusion */}
          <div className="bg-gradient-to-r from-purple-900/30 to-orange-900/30 rounded-xl p-8 border border-purple-700/30">
            <h3 className="text-2xl font-bold mb-4 text-center">The Fusion: bOSacs</h3>
            <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
              bOSacs represent the revolutionary fusion of these two foundational concepts. By combining 
              the legal and technical enforceability of Ricardian Contracts with the economic efficiency 
              insights of Coasian theory, bOSacs create a new paradigm for organizational coordination 
              in the digital age - powered by Bitcoin&apos;s instant settlement capabilities.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Framework Innovations</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-xl p-6 border border-purple-700/30">
              <div className="text-2xl mb-3">⚛️</div>
              <h4 className="text-lg font-semibold mb-2">Atomic Structure</h4>
              <p className="text-gray-300 text-sm">
                Self-contained, indivisible contract units that execute completely or not at all
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 rounded-xl p-6 border border-orange-700/30">
              <div className="text-2xl mb-3">🔗</div>
              <h4 className="text-lg font-semibold mb-2">Cryptographic Verification</h4>
              <p className="text-gray-300 text-sm">
                Real-time performance auditing through blockchain-based verification
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-700/30">
              <div className="text-2xl mb-3">🤖</div>
              <h4 className="text-lg font-semibold mb-2">AI Integration</h4>
              <p className="text-gray-300 text-sm">
                Intelligent micro-contracting mechanisms for automated coordination
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-700/30">
              <div className="text-2xl mb-3">💧</div>
              <h4 className="text-lg font-semibold mb-2">Liquid Organizations</h4>
              <p className="text-gray-300 text-sm">
                Dynamic value networks replacing traditional hierarchical structures
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-xl p-6 border border-red-700/30">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="text-lg font-semibold mb-2">Instant Settlement</h4>
              <p className="text-gray-300 text-sm">
                Real-time micropayments and resource allocation through Bitcoin
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-6 border border-yellow-700/30">
              <div className="text-2xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-2">Transaction Cost Reduction</h4>
              <p className="text-gray-300 text-sm">
                Minimizing coordination costs through automated contract execution
              </p>
            </div>
          </div>
        </div>

        {/* Document Contents */}
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-16">
          <h2 className="text-2xl font-bold mb-6">Document Contents</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Technical Sections</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Executive Summary & Framework Overview
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Theoretical Foundation & Economic Models
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Technical Architecture & Implementation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Contract Structure & Atomic Properties
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Bitcoin-OS Integration Framework
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Implementation Guides</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Real-World Use Cases & Scenarios
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Developer Tools & APIs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Security Considerations & Best Practices
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Future Roadmap & Development Timeline
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  References & Appendices
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Technical Architecture */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Technical Architecture</h2>
          
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Atomic Contract Structure</h3>
              <p className="text-gray-300 mb-4">
                Each bOSac is an indivisible unit that contains complete context for execution. Unlike traditional 
                smart contracts that may depend on external state, bOSacs are self-contained with all necessary 
                information embedded within the contract itself.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400">// Example bOSac Structure</div>
                <div className="text-gray-300">
                  {`{
  "contractId": "bOSac_001",
  "type": "ResourceAllocation",
  "parties": ["alice@bitcoin-os.com", "bob@bitcoin-os.com"],
  "terms": { /* Ricardian contract text */ },
  "execution": { /* Machine-readable logic */ },
  "signatures": { /* Cryptographic proof */ },
  "settlement": { /* Bitcoin payment channels */ }
}`}
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Transaction Cost Optimization</h3>
              <p className="text-gray-300 mb-4">
                Following Coase&apos;s insights, bOSacs automatically route coordination through the most efficient 
                mechanism - whether market-based transactions or hierarchical management - based on real-time 
                cost analysis.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Market Mode:</strong> When transaction costs are low, contracts execute via decentralized marketplace</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Firm Mode:</strong> When coordination costs are high, contracts create temporary hierarchical structures</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Hybrid Mode:</strong> Dynamic switching between modes based on changing cost conditions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Legal-Technical Bridge</h3>
              <p className="text-gray-300 mb-4">
                The Ricardian contract component ensures that bOSacs are legally enforceable documents while 
                maintaining machine executability. This dual nature creates unprecedented legal certainty for 
                automated systems.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Human-Readable Layer</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Natural language terms</li>
                    <li>• Legal jurisdiction specification</li>
                    <li>• Dispute resolution procedures</li>
                    <li>• Compliance requirements</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">Machine-Readable Layer</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Executable code logic</li>
                    <li>• Data structure definitions</li>
                    <li>• API endpoints and schemas</li>
                    <li>• Automated settlement triggers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-World Applications</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-800/30 rounded-xl p-6 border border-green-700/30">
              <div className="text-3xl mb-4">🏢</div>
              <h4 className="text-lg font-semibold mb-3">Dynamic Organizations</h4>
              <p className="text-gray-300 text-sm mb-4">
                Companies that automatically reorganize based on project requirements, forming 
                temporary hierarchies for complex tasks and reverting to flat structures for routine work.
              </p>
              <div className="text-xs text-green-400 bg-green-900/20 rounded px-2 py-1">
                Example: AI research collaboration
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-800/30 rounded-xl p-6 border border-blue-700/30">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold mb-3">Resource Marketplaces</h4>
              <p className="text-gray-300 text-sm mb-4">
                Real-time trading of computational resources where contracts automatically optimize 
                for cost, performance, and reliability based on current market conditions.
              </p>
              <div className="text-xs text-blue-400 bg-blue-900/20 rounded px-2 py-1">
                Example: GPU compute sharing
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-violet-800/30 rounded-xl p-6 border border-purple-700/30">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="text-lg font-semibold mb-3">Liquid Partnerships</h4>
              <p className="text-gray-300 text-sm mb-4">
                Business partnerships that automatically adjust profit sharing, decision making, 
                and resource allocation based on each party&apos;s real-time contributions.
              </p>
              <div className="text-xs text-purple-400 bg-purple-900/20 rounded px-2 py-1">
                Example: Content creator collectives
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-800/30 rounded-xl p-6 border border-orange-700/30">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold mb-3">Project Coordination</h4>
              <p className="text-gray-300 text-sm mb-4">
                Large projects that automatically spawn sub-projects, allocate budgets, and 
                coordinate deliverables based on complexity and interdependency analysis.
              </p>
              <div className="text-xs text-orange-400 bg-orange-900/20 rounded px-2 py-1">
                Example: Open source development
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-900/30 to-green-800/30 rounded-xl p-6 border border-teal-700/30">
              <div className="text-3xl mb-4">🔄</div>
              <h4 className="text-lg font-semibold mb-3">Supply Chain Optimization</h4>
              <p className="text-gray-300 text-sm mb-4">
                Supply chains that dynamically reconfigure based on cost, quality, and timing 
                constraints, automatically switching between suppliers and logistics providers.
              </p>
              <div className="text-xs text-teal-400 bg-teal-900/20 rounded px-2 py-1">
                Example: Manufacturing networks
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-900/30 to-rose-800/30 rounded-xl p-6 border border-pink-700/30">
              <div className="text-3xl mb-4">🎓</div>
              <h4 className="text-lg font-semibold mb-3">Educational Ecosystems</h4>
              <p className="text-gray-300 text-sm mb-4">
                Learning platforms where curricula, instructor allocation, and resource distribution 
                automatically adapt to student needs and learning outcomes.
              </p>
              <div className="text-xs text-pink-400 bg-pink-900/20 rounded px-2 py-1">
                Example: Personalized learning paths
              </div>
            </div>
          </div>
        </div>

        {/* Economic Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Economic Impact & Theory</h2>
          
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">Coasian Insights Applied</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Transaction Cost Reduction</h4>
                    <p className="text-gray-300 text-sm">
                      bOSacs eliminate traditional coordination costs through automated contract execution, 
                      cryptographic verification, and instant Bitcoin settlements. This dramatically reduces 
                      the threshold at which market mechanisms become more efficient than hierarchical control.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Dynamic Boundary Optimization</h4>
                    <p className="text-gray-300 text-sm">
                      Organizations using bOSacs can automatically adjust their boundaries in real-time, 
                      internalizing activities when coordination costs are high and externalizing them 
                      when market mechanisms are more efficient.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Property Rights Clarity</h4>
                    <p className="text-gray-300 text-sm">
                      Cryptographic signatures and blockchain immutability provide perfect clarity of 
                      property rights, addressing Coase&apos;s insight that well-defined property rights 
                      enable efficient market solutions to coordination problems.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Ricardian Innovation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Legal-Code Isomorphism</h4>
                    <p className="text-gray-300 text-sm">
                      bOSacs maintain perfect correspondence between legal obligations and code execution, 
                      ensuring that automated systems operate within established legal frameworks while 
                      providing computational efficiency.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Cryptographic Enforceability</h4>
                    <p className="text-gray-300 text-sm">
                      Digital signatures provide non-repudiation and authenticity, while blockchain 
                      timestamps create immutable audit trails. This eliminates disputes about contract 
                      terms and execution history.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Jurisdictional Flexibility</h4>
                    <p className="text-gray-300 text-sm">
                      bOSacs can specify multiple jurisdictions and dispute resolution mechanisms, 
                      allowing parties to choose optimal legal frameworks for their specific 
                      coordination challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Implementation Guide</h2>
          
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Development Stack</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-cyan-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-300 mb-3">Contract Layer</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• TypeScript/JavaScript SDKs</li>
                    <li>• JSON Schema validation</li>
                    <li>• Cryptographic libraries (libsodium)</li>
                    <li>• Bitcoin transaction builders</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-300 mb-3">Execution Engine</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Node.js runtime environment</li>
                    <li>• WebAssembly for performance</li>
                    <li>• Event-driven architecture</li>
                    <li>• Real-time monitoring</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-300 mb-3">Integration APIs</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• RESTful web services</li>
                    <li>• GraphQL endpoints</li>
                    <li>• WebSocket real-time updates</li>
                    <li>• Bitcoin wallet integration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Getting Started</h3>
              <div className="bg-black/30 rounded-lg p-6 font-mono text-sm">
                <div className="text-emerald-400 mb-2"># Install bOSacs SDK</div>
                <div className="text-gray-300 mb-4">npm install @bitcoin-os/bosacs-sdk</div>
                
                <div className="text-emerald-400 mb-2"># Create your first bOSac</div>
                <div className="text-gray-300">
                  {`import { BOSac, ContractType } from '@bitcoin-os/bosacs-sdk'

const resourceContract = new BOSac({
  type: ContractType.RESOURCE_ALLOCATION,
  parties: ['alice@bitcoin-os.com', 'bob@bitcoin-os.com'],
  terms: {
    description: 'GPU compute time allocation',
    duration: '24 hours',
    compensation: '0.001 BSV per hour'
  },
  execution: {
    triggers: ['hourly_usage_report'],
    actions: ['payment_settlement', 'resource_allocation']
  }
})

await resourceContract.deploy()`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Development Roadmap</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-800/30 rounded-xl p-6 border border-green-700/30">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 text-black font-bold text-sm">Q1</div>
                <h3 className="text-lg font-semibold">Foundation Phase (Q1 2025)</h3>
              </div>
              <ul className="text-gray-300 space-y-1 ml-11">
                <li>• Core bOSacs SDK development</li>
                <li>• Basic contract templates library</li>
                <li>• Bitcoin-OS integration framework</li>
                <li>• Developer documentation and tutorials</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-800/30 rounded-xl p-6 border border-blue-700/30">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-black font-bold text-sm">Q2</div>
                <h3 className="text-lg font-semibold">Marketplace Phase (Q2 2025)</h3>
              </div>
              <ul className="text-gray-300 space-y-1 ml-11">
                <li>• Contract marketplace deployment</li>
                <li>• Advanced template editor</li>
                <li>• Multi-party contract support</li>
                <li>• Dispute resolution mechanisms</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-violet-800/30 rounded-xl p-6 border border-purple-700/30">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 text-black font-bold text-sm">Q3</div>
                <h3 className="text-lg font-semibold">Intelligence Phase (Q3 2025)</h3>
              </div>
              <ul className="text-gray-300 space-y-1 ml-11">
                <li>• AI-powered contract generation</li>
                <li>• Dynamic optimization algorithms</li>
                <li>• Predictive cost modeling</li>
                <li>• Machine learning integration</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-900/30 to-red-800/30 rounded-xl p-6 border border-orange-700/30">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 text-black font-bold text-sm">Q4</div>
                <h3 className="text-lg font-semibold">Ecosystem Phase (Q4 2025)</h3>
              </div>
              <ul className="text-gray-300 space-y-1 ml-11">
                <li>• Cross-platform integrations</li>
                <li>• Enterprise deployment tools</li>
                <li>• Global legal framework support</li>
                <li>• Performance optimization suite</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Additional Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-orange-400">Academic Papers & Research</h3>
              <div className="space-y-3">
                <a 
                  href="https://en.wikipedia.org/wiki/Theory_of_the_firm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-3 bg-orange-900/20 rounded-lg hover:bg-orange-900/30 transition-colors"
                >
                  <div className="font-semibold text-orange-300">The Theory of the Firm</div>
                  <div className="text-sm text-gray-400">Ronald Coase&apos;s foundational work on organizational economics</div>
                </a>
                <a 
                  href="https://en.wikipedia.org/wiki/Ricardian_contract" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-3 bg-blue-900/20 rounded-lg hover:bg-blue-900/30 transition-colors"
                >
                  <div className="font-semibold text-blue-300">Ricardian Contracts</div>
                  <div className="text-sm text-gray-400">Ian Grigg&apos;s innovation in legal-technical integration</div>
                </a>
                <div className="p-3 bg-purple-900/20 rounded-lg">
                  <div className="font-semibold text-purple-300">Bitcoin OS Technical Whitepaper</div>
                  <div className="text-sm text-gray-400">Comprehensive platform architecture documentation (Coming Soon)</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Developer Tools & Community</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <div className="font-semibold text-green-300">GitHub Repository</div>
                  <div className="text-sm text-gray-400">Open source bOSacs implementation and examples (Coming Soon)</div>
                </div>
                <div className="p-3 bg-cyan-900/20 rounded-lg">
                  <div className="font-semibold text-cyan-300">API Documentation</div>
                  <div className="text-sm text-gray-400">Complete SDK reference and integration guides (Coming Soon)</div>
                </div>
                <div className="p-3 bg-yellow-900/20 rounded-lg">
                  <div className="font-semibold text-yellow-300">Developer Discord</div>
                  <div className="text-sm text-gray-400">Community support and collaboration platform (Coming Soon)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Innovation Credit */}
        <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 rounded-xl p-8 border border-orange-700/30 text-center">
          <h3 className="text-xl font-semibold mb-4">Innovation by Richard Boase</h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            This groundbreaking framework represents the fusion of Ian Grigg&apos;s Ricardian Contracts 
            with Ronald Coase&apos;s Theory of the Firm, creating a new paradigm for decentralized 
            organizational structures powered by Bitcoin technology. bOSacs enable unprecedented 
            efficiency in coordination mechanisms through the elimination of transaction costs and 
            the provision of cryptographic certainty.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-orange-900/20 rounded-lg p-4">
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-sm font-semibold text-orange-300">Theoretical Foundation</div>
              <div className="text-xs text-gray-400">Economic theory meets cryptography</div>
            </div>
            <div className="bg-yellow-900/20 rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-yellow-300">Practical Innovation</div>
              <div className="text-xs text-gray-400">Real-world implementation ready</div>
            </div>
            <div className="bg-orange-800/20 rounded-lg p-4">
              <div className="text-2xl mb-2">🌍</div>
              <div className="text-sm font-semibold text-orange-300">Global Impact</div>
              <div className="text-xs text-gray-400">Transforming organizational design</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-orange-700/30">
            <p className="text-sm text-gray-400">
              Developed for Bitcoin-OS by The Bitcoin Corporation LTD<br />
              Copyright © 2025 • Open-BSV-4.0 License
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-black/50 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-black">₿</span>
              </div>
              <div>
                <div className="font-semibold">Bitcoin OS</div>
                <div className="text-sm text-gray-400">The Bitcoin Corporation LTD</div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="https://github.com/bitcoin-corp/bitcoin-OS" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="/platform" className="text-gray-400 hover:text-white transition-colors">
                Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}