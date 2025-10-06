import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsItem } from './SettingsItem';

export const SubscriptionSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription</h2>
        <p className="text-gray-600">Manage your Bitcoin OS Pro subscription and billing.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-orange-900">Bitcoin OS Community</h3>
            <p className="text-orange-700">Free forever with basic features</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-900">Free</div>
            <div className="text-sm text-orange-600">Current Plan</div>
          </div>
        </div>
      </div>

      {/* Upgrade Options */}
      <SettingsSection title="Upgrade to Bitcoin OS Pro" description="Unlock premium features and apps">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pro Monthly */}
          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900">Pro Monthly</h4>
              <div className="text-3xl font-bold text-blue-600 mt-2">$29<span className="text-lg">/mo</span></div>
              <p className="text-gray-600 mt-2">Perfect for individuals</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Access to all Pro apps
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Advanced customization
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Cloud storage (100GB)
              </li>
            </ul>
            <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>

          {/* Pro Annual */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                Best Value
              </span>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900">Pro Annual</h4>
              <div className="text-3xl font-bold text-purple-600 mt-2">
                $290<span className="text-lg">/year</span>
              </div>
              <p className="text-gray-600 mt-1">Save $58 compared to monthly</p>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Everything in Pro Monthly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Cloud storage (1TB)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Early access to new features
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Revenue sharing program
              </li>
            </ul>
            <button className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Upgrade to Pro Annual
            </button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Billing & Payment" description="Manage payment methods and billing">
        <SettingsItem
          label="Payment Method"
          description="Primary payment method"
          type="select"
          value="bsv"
          options={[
            { label: 'Bitcoin SV (BSV)', value: 'bsv' },
            { label: 'Credit Card', value: 'card' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Bank Transfer', value: 'bank' },
          ]}
        />

        <SettingsItem
          label="Auto-renewal"
          description="Automatically renew subscription"
          type="toggle"
          value={true}
        />

        <SettingsItem
          label="Billing Email"
          description="Email for receipts and billing notifications"
          type="input"
          value="user@example.com"
        />
      </SettingsSection>

      <SettingsSection title="App Access" description="Control which apps are available">
        <div className="space-y-4">
          {[
            { name: 'Bitcoin Writer', included: true, pro: false },
            { name: 'Bitcoin Wallet', included: true, pro: false },
            { name: 'Bitcoin Drive', included: true, pro: false },
            { name: 'Bitcoin Music', included: false, pro: true },
            { name: 'Bitcoin Video', included: false, pro: true },
            { name: 'Bitcoin Paint', included: false, pro: true },
            { name: 'Bitcoin Code', included: false, pro: true },
            { name: 'Bitcoin AI', included: false, pro: true },
          ].map((app) => (
            <div key={app.name} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{app.name}</span>
                {app.pro && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    Pro
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {app.included ? (
                  <span className="text-green-600 text-sm">✓ Included</span>
                ) : (
                  <span className="text-gray-400 text-sm">Requires Pro</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Manage Subscription
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Download Invoice
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};