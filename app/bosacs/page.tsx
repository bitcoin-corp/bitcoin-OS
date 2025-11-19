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
    <div className="h-screen w-full bg-black text-white overflow-y-scroll">
      {/* Header */}
      <div className="border-b-2 border-white bg-black">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <span className="font-bold text-black text-lg">₿</span>
                </div>
                <span className="font-bold text-2xl">Bitcoin OS</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-8">
              <Link href="/docs" className="text-gray-300 hover:text-white transition-colors font-medium">
                Documentation
              </Link>
              <Link href="/platform" className="text-gray-300 hover:text-white transition-colors font-medium">
                Platform
              </Link>
              <Link href="/contracts" className="text-gray-300 hover:text-white transition-colors font-medium">
                Contracts
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Document Header */}
      <div className="bg-gray-900 border-b-2 border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-4 tracking-wider">
            TECHNICAL SPECIFICATION
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Bitcoin-OS Contracts Framework
          </h1>
          <h2 className="text-2xl mb-4 text-gray-400">
            bOSacs (Bitcoin OS Atomic Contracts) - Technical Design Specification
          </h2>
          <div className="text-sm text-gray-500 border-t border-gray-700 pt-4 mt-4">
            Document Version: 2.0 | Date: November 2025 | Classification: Public<br />
            Inventor: Richard Boase | Framework: bOSacs (Bitcoin OS Atomic Contracts)
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Executive Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">1. Executive Summary</h2>
          <div className="bg-gray-900 p-6 border-l-4 border-white">
            <p className="text-lg leading-relaxed mb-4">
              Bitcoin OS Atomic Contracts (bOSacs) represent a revolutionary framework that fuses 
              Ian Grigg's Ricardian Contracts with Ronald Coase's Theory of the Firm, creating 
              a new paradigm for decentralized organizational coordination powered by Bitcoin technology.
            </p>
            <p className="leading-relaxed mb-4">
              This framework enables unprecedented efficiency in coordination mechanisms through 
              the elimination of transaction costs and the provision of cryptographic certainty, 
              while maintaining legal enforceability and human readability.
            </p>
            
            {/* Download Section */}
            <div className="mt-6 p-4 bg-black border border-gray-700">
              <h3 className="font-bold mb-3">Download Complete Specification</h3>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF Specification
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400 mt-2">
                Complete technical specification optimized for printing and corporate distribution
              </p>
            </div>
          </div>
        </section>

        {/* Theoretical Foundation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">2. Core Innovation: bOSacs (Bitcoin OS Atomic Contracts)</h2>
          
          <div className="space-y-8">
            <div className="border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-4">2.1 Ricardian Contracts Foundation</h3>
              <p className="leading-relaxed mb-4">
                <strong>Created by Ian Grigg</strong>, Ricardian Contracts are documents that are simultaneously 
                human and machine-readable, cryptographically signed, and carry information 
                about rights and obligations. They bridge the gap between legal prose and 
                code execution, providing a foundation for automated legal compliance.
              </p>
              <p className="leading-relaxed mb-4">
                Key characteristics include:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                <li>Dual human-readable and machine-executable format</li>
                <li>Cryptographic signatures for non-repudiation</li>
                <li>Legal enforceability in specified jurisdictions</li>
                <li>Immutable audit trails for compliance</li>
              </ul>
              <p className="text-sm text-gray-400">
                Reference: <a 
                  href="https://en.wikipedia.org/wiki/Ricardian_contract" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Ricardian Contract - Wikipedia
                </a>
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-4">2.2 Coase's Theory of the Firm</h3>
              <p className="leading-relaxed mb-4">
                <strong>Nobel Prize winner Ronald Coase's</strong> groundbreaking theory explains why firms exist 
                and when market mechanisms are superior to hierarchical organization. The theory 
                centers on transaction costs - the costs of using the price mechanism.
              </p>
              <p className="leading-relaxed mb-4">
                Core principles include:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4 ml-4">
                <li>Firms exist to minimize transaction costs</li>
                <li>Organizational boundaries are determined by cost efficiency</li>
                <li>Market mechanisms vs. hierarchical control trade-offs</li>
                <li>Property rights clarity enables efficient coordination</li>
              </ul>
              <p className="text-sm text-gray-400">
                Reference: <a 
                  href="https://en.wikipedia.org/wiki/Theory_of_the_firm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  Theory of the Firm - Wikipedia
                </a>
              </p>
            </div>

            <div className="bg-gray-900 border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">2.3 The Innovation: bOSacs Framework</h3>
              <p className="leading-relaxed mb-4">
                <strong>bOSacs represent the revolutionary fusion</strong> of these two foundational concepts. 
                By combining the legal and technical enforceability of Ricardian Contracts with the 
                economic efficiency insights of Coasian theory, bOSacs create a new paradigm for 
                organizational coordination in the digital age.
              </p>
              <p className="leading-relaxed">
                This fusion is powered by Bitcoin's instant settlement capabilities, enabling 
                unprecedented efficiency in coordination mechanisms through the elimination of 
                transaction costs and the provision of cryptographic certainty.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">3. Technical Architecture</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.1 Atomic Structure</h3>
              <p className="leading-relaxed">
                Each bOSac is a self-contained, indivisible contract unit that executes completely 
                or not at all. This atomic property ensures transactional integrity and eliminates 
                partial execution failures that plague traditional smart contract systems.
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.2 Cryptographic Verification</h3>
              <p className="leading-relaxed">
                Real-time performance auditing through blockchain-based verification provides 
                immutable proof of contract execution, creating unprecedented transparency and 
                accountability in automated systems.
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.3 Dynamic Coordination Mechanisms</h3>
              <p className="leading-relaxed">
                Intelligent micro-contracting mechanisms enable automated coordination between 
                parties, dynamically switching between market-based and hierarchical coordination 
                based on real-time cost analysis.
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.4 Liquid Organizational Structures</h3>
              <p className="leading-relaxed">
                Dynamic value networks replace traditional hierarchical structures, allowing 
                organizations to automatically reconfigure based on project requirements and 
                market conditions.
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.5 Instant Bitcoin Settlement</h3>
              <p className="leading-relaxed">
                Real-time micropayments and resource allocation through Bitcoin's payment 
                infrastructure eliminate traditional settlement delays and enable true 
                pay-per-use resource models.
              </p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">3.6 Transaction Cost Optimization</h3>
              <p className="leading-relaxed">
                Automated contract execution minimizes coordination costs, following Coase's 
                insights to optimize the boundary between market and hierarchical coordination 
                mechanisms.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">4. Real-World Applications</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">4.1 Dynamic Organizations</h3>
              <p className="leading-relaxed mb-3">
                Organizations that automatically reorganize based on project requirements, forming 
                temporary hierarchies for complex tasks and reverting to flat structures for routine work.
              </p>
              <p className="text-sm text-gray-400 italic">Example: AI research collaboration networks</p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">4.2 Resource Marketplaces</h3>
              <p className="leading-relaxed mb-3">
                Real-time trading of computational resources where contracts automatically optimize 
                for cost, performance, and reliability based on current market conditions.
              </p>
              <p className="text-sm text-gray-400 italic">Example: GPU compute sharing networks</p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">4.3 Liquid Partnerships</h3>
              <p className="leading-relaxed mb-3">
                Business partnerships that automatically adjust profit sharing, decision making, 
                and resource allocation based on each party's real-time contributions.
              </p>
              <p className="text-sm text-gray-400 italic">Example: Content creator collectives</p>
            </div>

            <div className="border border-gray-700 p-6">
              <h3 className="text-lg font-bold mb-3">4.4 Supply Chain Optimization</h3>
              <p className="leading-relaxed mb-3">
                Supply chains that dynamically reconfigure based on cost, quality, and timing 
                constraints, automatically switching between suppliers and logistics providers.
              </p>
              <p className="text-sm text-gray-400 italic">Example: Global manufacturing networks</p>
            </div>
          </div>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">5. References</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-700 p-4">
              <h3 className="font-bold mb-2">Ricardian Contracts</h3>
              <p className="text-sm leading-relaxed">
                Grigg, Ian. "The Ricardian Contract." 1996. <br/>
                <a href="https://en.wikipedia.org/wiki/Ricardian_contract" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  https://en.wikipedia.org/wiki/Ricardian_contract
                </a>
              </p>
            </div>

            <div className="border border-gray-700 p-4">
              <h3 className="font-bold mb-2">Theory of the Firm</h3>
              <p className="text-sm leading-relaxed">
                Coase, Ronald. "The Nature of the Firm." Economica, 1937. <br/>
                <a href="https://en.wikipedia.org/wiki/Theory_of_the_firm" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  https://en.wikipedia.org/wiki/Theory_of_the_firm
                </a>
              </p>
            </div>

            <div className="border border-gray-700 p-4">
              <h3 className="font-bold mb-2">Bitcoin OS Platform</h3>
              <p className="text-sm leading-relaxed">
                The Bitcoin Corporation LTD. "Bitcoin OS Technical Documentation." 2025. <br/>
                <a href="https://www.bitcoin-os.website" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  https://www.bitcoin-os.website
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Author Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">6. Author Information</h2>
          
          <div className="bg-gray-900 border border-gray-700 p-6">
            <h3 className="text-lg font-bold mb-3">Innovation by Richard Boase</h3>
            <p className="leading-relaxed mb-4">
              This groundbreaking framework represents the fusion of Ian Grigg's Ricardian Contracts 
              with Ronald Coase's Theory of the Firm, creating a new paradigm for decentralized 
              organizational structures powered by Bitcoin technology.
            </p>
            <p className="leading-relaxed mb-4">
              bOSacs enable unprecedented efficiency in coordination mechanisms through the elimination 
              of transaction costs and the provision of cryptographic certainty, while maintaining 
              legal enforceability and human readability.
            </p>
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-sm text-gray-400">
                <strong>Developed for Bitcoin-OS by The Bitcoin Corporation LTD</strong><br />
                Copyright © 2025 • Open-BSV-4.0 License<br/>
                Document Version: 2.0 | Date: November 2025
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Professional Footer */}
      <div className="border-t-2 border-white bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="font-bold text-black text-lg">₿</span>
              </div>
              <div>
                <div className="font-bold text-lg">Bitcoin OS</div>
                <div className="text-sm text-gray-400">The Bitcoin Corporation LTD</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">
                <strong>bOSacs Framework Specification</strong><br/>
                Version 2.0 • November 2025<br/>
                Open-BSV-4.0 License
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
