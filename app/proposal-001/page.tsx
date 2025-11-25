'use client';

import { Shield, Lock, Code, CheckCircle } from 'lucide-react';

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Proposal 001
          </h1>
          <p className="text-gray-400 text-lg">Bitcoin-OS Immutable Rule Engine</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-orange-400" />
              The Protocol as Law
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              "The protocol was meant to be set in stone precisely so that no living person, 
              no committee, no fashionable clique, could mutate it at will."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">The Problem</h3>
              <p className="text-gray-300">
                Current blockchain applications allow arbitrary rule changes through governance, 
                creating political fiefdoms where power trumps protocol. This violates the 
                fundamental principle: rules must be immutable to prevent capture.
              </p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-orange-400">The Solution</h3>
              <p className="text-gray-300">
                An Immutable Rule Engine that enforces protocol-level constraints at the OS layer, 
                ensuring no application can violate core rules regardless of updates or governance 
                decisions.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Core Features</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Protocol Enforcement Layer</h4>
                  <p className="text-gray-400">
                    Kernel-level enforcement of Bitcoin protocol rules that cannot be bypassed 
                    by any application layer code.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Deterministic Rule Validation</h4>
                  <p className="text-gray-400">
                    Every transaction and state change validated against immutable rules 
                    before execution, not after.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Cryptographic Rule Proofs</h4>
                  <p className="text-gray-400">
                    Every rule enforcement generates a cryptographic proof, creating an 
                    auditable trail of protocol compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-semibold mb-3">Technical Implementation</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Rust-based kernel module for zero-overhead rule enforcement</li>
              <li>• WASM sandbox for deterministic rule execution</li>
              <li>• Merkle tree of immutable rules anchored to Bitcoin blockchain</li>
              <li>• Hardware security module integration for rule attestation</li>
              <li>• Complete audit trail of all rule validations</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3">Deliverables</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Phase 1</h4>
                <p className="text-sm text-gray-400">Core rule engine & validation system</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Phase 2</h4>
                <p className="text-sm text-gray-400">OS integration & proof generation</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Phase 3</h4>
                <p className="text-sm text-gray-400">Application SDK & documentation</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Investment Required</h3>
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  250,000 BSV
                </div>
                <p className="text-gray-400">
                  Complete implementation & 1 year of maintenance
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-3">Pay with HandCash</p>
                <div className="bg-gray-900 px-6 py-3 rounded-lg">
                  <code className="text-xl font-mono text-orange-400">$boase</code>
                </div>
                <button 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 rounded-lg font-semibold transition-all"
                  onClick={() => window.open('https://app.handcash.io/#/send?to=$boase&amount=250000&currency=BSV', '_blank')}
                >
                  Fund This Proposal
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 italic">
          "Set in stone, not as a monument to a personality, but as a bulwark against personality."
        </div>
      </div>
    </div>
  );
}