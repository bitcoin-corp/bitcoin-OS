import React from 'react';

export const AboutSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Bitcoin OS</h2>
        <p className="text-gray-600">System information and updates.</p>
      </div>
      
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center">
          <span className="text-white text-2xl">₿</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Bitcoin OS</h3>
        <p className="text-gray-600 mt-2">Version 1.0.0</p>
        <p className="text-sm text-gray-500 mt-4">
          The world's first Bitcoin-native operating system
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">System</h4>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div>Platform: Web Browser</div>
            <div>Runtime: React 18</div>
            <div>Storage: LocalStorage</div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900">Network</h4>
          <div className="mt-2 space-y-1 text-sm text-gray-600">
            <div>Blockchain: Bitcoin SV</div>
            <div>Wallet: HandCash</div>
            <div>Status: Connected</div>
          </div>
        </div>
      </div>

      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2025 The Bitcoin Corporation Ltd
        </p>
        <p className="text-xs text-gray-400 mt-1">
          All rights reserved. Open BSV License v5
        </p>
      </div>
    </div>
  );
};