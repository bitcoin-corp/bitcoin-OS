'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Shield, 
  GitBranch, 
  Lock, 
  Code, 
  Database, 
  Network, 
  CheckCircle,
  AlertCircle,
  Layers,
  Terminal,
  Server,
  Key,
  FileCheck,
  Scale,
  Briefcase,
  ArrowRight,
  GitCommit,
  Globe,
  Target
} from 'lucide-react';

export default function LicensingStrategyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-20" style={{ background: 'linear-gradient(180deg, #000000, #0a0a0a)' }}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 py-20 text-center">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-[#ffa500]/20 blur-3xl"></div>
            <Scale className="w-20 h-20 mx-auto text-[#ffa500] relative z-10" />
          </div>
          
          <h1 className="text-[48px] sm:text-[64px] font-extralight mb-6 leading-tight" style={{ 
            letterSpacing: '-2px'
          }}>
            Bitcoin-OS <span className="text-[#ffa500]">Licensing Strategy</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-[900px] mx-auto leading-relaxed font-light mb-8">
            A disciplined architectural approach to building an open-source platform that maximizes 
            community contribution while managing intellectual property through atomic contracts.
          </p>

          <div className="flex gap-4">
            <Link 
              href="/issues-hub"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ffa500]/50 hover:bg-[#ffa500]/10 transition-colors"
            >
              <GitBranch className="w-5 h-5" />
              Back to Issues Hub
            </Link>
            
            <a 
              href="#implementation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-black font-medium transition-all duration-200 hover:shadow-[0_6px_20px_rgba(255,165,0,0.2)]"
              style={{ background: 'linear-gradient(90deg, #ffa500, #ffcd00)' }}
            >
              View Implementation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-20">
        {/* Executive Summary */}
        <section className="py-16 border-t border-gray-900">
          <h2 className="text-[36px] font-extralight mb-8 tracking-tight">Executive Summary</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-[#ffa500]/10 to-transparent border border-[#ffa500]/30 rounded-lg p-8">
              <FileText className="w-8 h-8 text-[#ffa500] mb-4" />
              <h3 className="text-2xl font-light mb-4">Open Source Core</h3>
              <p className="text-gray-300 font-light mb-4">
                <strong className="text-white">License:</strong> AGPL v3.0
              </p>
              <p className="text-gray-300 font-light mb-4">
                <strong className="text-white">Structural Goal:</strong> To build a robust, open-source platform that 
                maximizes community contribution (via AGPL) while legally managing intellectual property 
                contributions from the decentralized &quot;Atomic Contracts System&quot; (via CLAs).
              </p>
              <p className="text-gray-300 font-light">
                <strong className="text-white">Key Challenge:</strong> Managing the licensing boundaries between 
                community contributions and commercial operations.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/30 rounded-lg p-8">
              <Shield className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-2xl font-light mb-4">Dual Licensing Model</h3>
              <p className="text-gray-300 font-light mb-4">
                The Bitcoin Corporation employs a dual licensing strategy that allows it to:
              </p>
              <ul className="space-y-2 text-gray-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Accept open-source contributions under AGPL</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Re-license contributed code for commercial purposes via CLAs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Maintain clear licensing zones with API boundaries</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Part 1: Architectural Mandate */}
        <section className="py-16 border-t border-gray-900">
          <h2 className="text-[36px] font-extralight mb-12 tracking-tight flex items-center gap-3">
            <Layers className="w-10 h-10 text-[#ffa500]" />
            Part 1: Architectural Mandate - The &quot;AGPL Containment&quot; Strategy
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-[#ffa500]" />
                Core Principle: License Zone Separation
              </h3>
              
              <p className="text-gray-300 font-light mb-6">
                Bitcoin-OS must be architected with clear API boundaries that separate AGPL-licensed components 
                from proprietary business logic. This enables dual licensing without viral license propagation.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-[#ffa500] mb-2">AGPL Zone</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Core Bitcoin-OS platform</li>
                    <li>• Web shell interface</li>
                    <li>• Application framework</li>
                    <li>• Community contributions</li>
                  </ul>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-blue-400 mb-2">API Boundary</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Well-defined interfaces</li>
                    <li>• RESTful APIs</li>
                    <li>• Message queues</li>
                    <li>• Service contracts</li>
                  </ul>
                </div>
                
                <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-medium text-green-400 mb-2">Proprietary Zone</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Business logic</li>
                    <li>• Payment processing</li>
                    <li>• Enterprise features</li>
                    <li>• Commercial services</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                <Network className="w-6 h-6 text-[#ffa500]" />
                Implementation: Microservices Architecture
              </h3>
              
              <p className="text-gray-300 font-light mb-6">
                Each Bitcoin-OS component must be deployed as an independent service with clear API contracts:
              </p>

              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ffa500] text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white font-normal mb-1">Service Isolation</p>
                    <p className="text-sm text-gray-400">
                      Each service runs in its own process/container with defined network boundaries
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ffa500] text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white font-normal mb-1">API-First Design</p>
                    <p className="text-sm text-gray-400">
                      All inter-service communication happens through documented APIs, never through shared code
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#ffa500] text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-white font-normal mb-1">License Boundaries</p>
                    <p className="text-sm text-gray-400">
                      AGPL components can only be accessed through network APIs, preventing license contamination
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Part 2: Jobs Queue Integration */}
        <section className="py-16 border-t border-gray-900">
          <h2 className="text-[36px] font-extralight mb-12 tracking-tight flex items-center gap-3">
            <GitCommit className="w-10 h-10 text-[#ffa500]" />
            Part 2: Jobs Queue &amp; CLA Integration
          </h2>

          <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-8 mb-8">
            <p className="text-gray-300 font-light">
              The &quot;Atomic Contracts&quot; are not just technical tasks; they are legal agreements. 
              Every piece of work farmed out must be managed via a system that ensures IP is properly transferred.
            </p>
          </div>

          <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-[#ffa500]" />
            Contract Execution Requirements
          </h3>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#ffa500] text-xs">1</span>
              </div>
              <div>
                <p className="text-white font-normal mb-2">Pre-Work CLA Acceptance</p>
                <p className="text-gray-300 font-light">
                  Before a developer can claim any job from the queue, they must digitally sign the 
                  Contributor License Agreement. This is a <strong className="text-white">one-time process</strong> that 
                  grants The Bitcoin Corporation the necessary rights to all future contributions.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#ffa500] text-xs">2</span>
              </div>
              <div>
                <p className="text-white font-normal mb-2">Automated Verification</p>
                <p className="text-gray-300 font-light">
                  The jobs queue system must automatically verify CLA status before allowing job claims. 
                  No exceptions can be made to this rule.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffa500]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[#ffa500] text-xs">3</span>
              </div>
              <p className="text-gray-300">
                The contract execution system <strong className="text-white">must not</strong> grant payment until 
                the developer&apos;s work is successfully merged into the <strong className="text-white">AGPL Zone</strong> repository 
                and the accompanying CLA is verified as accepted
              </p>
            </li>
          </ul>

          {/* CLA Requirements */}
          <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
            <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-[#ffa500]" />
              CLA Requirements
            </h3>

            <div className="space-y-6">
              <li className="flex items-start gap-3">
                <Key className="w-5 h-5 text-[#ffa500] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-normal mb-1">CLA Function</p>
                  <p className="text-sm text-gray-400">
                    The CLA must explicitly grant The Bitcoin Corporation Ltd a non-exclusive, irrevocable, 
                    worldwide, royalty-free license (or full assignment) to the contributor&apos;s code, including 
                    the right to <strong className="text-white">re-license</strong> the code.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <GitBranch className="w-5 h-5 text-[#ffa500] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-normal mb-1">Git Integration</p>
                  <p className="text-sm text-gray-400">
                    Every commit must be tagged with CLA status. Use git commit signing or a bot that verifies 
                    CLA status before allowing merges.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#ffa500] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-normal mb-1">Enforcement</p>
                  <p className="text-sm text-gray-400">
                    No code can be merged without CLA verification. This must be enforced at the CI/CD level.
                  </p>
                </div>
              </li>
            </div>
          </div>
        </section>

        {/* Part 3: Developer Guidance */}
        <section className="py-16 border-t border-gray-900">
          <h2 className="text-[36px] font-extralight mb-12 tracking-tight flex items-center gap-3">
            <Code className="w-10 h-10 text-[#ffa500]" />
            Part 3: Developer Implementation Guide
          </h2>

          <div className="space-y-8">
            {/* Code Submission Checklist */}
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Code Submission Checklist
              </h3>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Requirement</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-900/50">
                    <td className="border border-gray-800 px-4 py-3 text-sm">
                      <strong className="text-white">CLA Signed</strong>
                    </td>
                    <td className="border border-gray-800 px-4 py-3 text-sm text-gray-400">
                      Ensure you have signed the CLA before claiming any job
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-900/50">
                    <td className="border border-gray-800 px-4 py-3 text-sm">
                      <strong className="text-white">License Header</strong>
                    </td>
                    <td className="border border-gray-800 px-4 py-3 text-sm text-gray-400">
                      Must include a <strong className="text-white">license header</strong> at the top of every new file, 
                      clearly stating <code className="text-[#ffa500] bg-gray-900 px-2 py-1 rounded text-xs">
                      &quot;Licensed under AGPL v3.0, and contributed under The Bitcoin Corporation CLA.&quot;</code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-900/50">
                    <td className="border border-gray-800 px-4 py-3 text-sm">
                      <strong className="text-white">API Boundaries</strong>
                    </td>
                    <td className="border border-gray-800 px-4 py-3 text-sm text-gray-400">
                      Ensure all service communication happens through documented APIs
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-900/50">
                    <td className="border border-gray-800 px-4 py-3 text-sm">
                      <strong className="text-white">No License Mixing</strong>
                    </td>
                    <td className="border border-gray-800 px-4 py-3 text-sm text-gray-400">
                      Do not mix AGPL code with proprietary code in the same service
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-900/50">
                    <td className="border border-gray-800 px-4 py-3 text-sm">
                      <strong className="text-white">Documentation</strong>
                    </td>
                    <td className="border border-gray-800 px-4 py-3 text-sm text-gray-400">
                      Document all API endpoints and service boundaries
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Creating Service Boundaries */}
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-800">
              <h3 className="text-2xl font-light mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-[#ffa500]" />
                Creating Service Boundaries
              </h3>

              <p className="text-gray-300 font-light mb-6">
                When building new features for Bitcoin-OS, always consider the licensing implications:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-light mb-3 text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ffa500]" />
                    1. Service Structure
                  </h4>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-gray-300">
{`bitcoin-os/
├── services/
│   ├── core/           # AGPL Zone
│   │   ├── web-shell/
│   │   ├── app-framework/
│   │   └── file-system/
│   ├── api/            # API Boundary Layer
│   │   ├── rest/
│   │   ├── graphql/
│   │   └── websocket/
│   └── business/       # Proprietary Zone (separate repo)
│       ├── billing/
│       ├── analytics/
│       └── enterprise/`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-light mb-3 text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ffa500]" />
                    2. User-Facing Source Code Provision (AGPL Compliance)
                  </h4>
                  
                  <p className="text-gray-300 font-light mb-6">
                    Because Bitcoin-OS is an online service (SaaS), you must comply with the AGPL&apos;s most important clause:
                  </p>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-red-400">
                      AGPL Section 13: Remote Network Interaction
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                      Users interacting with Bitcoin-OS remotely through a network must be provided an opportunity 
                      to receive the source code.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-[#ffa500] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-normal mb-1">Action for Claude Code</p>
                        <p className="text-sm text-gray-400">
                          Implement a visible link (e.g., in the footer of the Bitcoin-OS web shell) labeled 
                          <code className="text-[#ffa500] bg-gray-900 px-2 py-1 rounded">&quot;Get the Source Code (AGPL)&quot;</code>
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-[#ffa500] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-normal mb-1">Source Provision</p>
                        <p className="text-sm text-gray-400">
                          Link must provide access to the exact version of the source code corresponding to the 
                          running instance (use git tags/releases)
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-light mb-3 text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#ffa500]" />
                    3. API Documentation Template
                  </h4>
                  
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <blockquote className="text-sm text-gray-400 italic">
                      &quot;This API represents a licensed boundary. Consumers of this API should be aware that the 
                      code within this module is licensed under <strong className="text-white">[MIT/OpenBSV/AGPL v3.0]</strong> and 
                      should ensure their client code is compliant with all relevant terms.&quot;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="py-16 border-t border-gray-900" id="implementation">
          <h2 className="text-[36px] font-extralight mb-12 tracking-tight flex items-center gap-3">
            <CheckCircle className="w-10 h-10 text-green-500" />
            Implementation Checklist for Claude Code
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Immediate Actions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Set up CLA signing infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Implement CLA verification in jobs queue</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Add AGPL source code link to web shell</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Create service boundary documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-light mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                Ongoing Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Review all new services for license compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Maintain clear API documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Enforce CLA requirements in CI/CD</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 mt-0.5"></div>
                  <span className="text-sm text-gray-300">Keep source code availability current</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="py-16 border-t border-gray-900">
          <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-light mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              Legal Notice
            </h3>
            <p className="text-gray-300 font-light mb-4">
              This licensing strategy is designed to ensure compliance with open-source licenses while 
              enabling commercial operations. It is critical that all developers and contributors understand 
              and follow these guidelines.
            </p>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Note:</strong> This document provides architectural guidance. 
              For legal advice specific to your jurisdiction, consult with qualified legal counsel.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 border-t border-gray-900">
          <h2 className="text-[36px] font-extralight mb-8 tracking-tight">Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-[#ffa500]/50 transition-colors"
            >
              <FileText className="w-8 h-8 text-[#ffa500] mb-3" />
              <h3 className="text-lg font-light mb-2">AGPL v3.0 License</h3>
              <p className="text-sm text-gray-400">Read the full license text</p>
            </a>
            
            <Link
              href="/issues-hub"
              className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-[#ffa500]/50 transition-colors"
            >
              <GitBranch className="w-8 h-8 text-[#ffa500] mb-3" />
              <h3 className="text-lg font-light mb-2">Issues Hub</h3>
              <p className="text-sm text-gray-400">View and claim atomic contracts</p>
            </Link>
            
            <a
              href="https://github.com/bitcoin-os"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-[#ffa500]/50 transition-colors"
            >
              <Code className="w-8 h-8 text-[#ffa500] mb-3" />
              <h3 className="text-lg font-light mb-2">Source Code</h3>
              <p className="text-sm text-gray-400">Access Bitcoin-OS repositories</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}