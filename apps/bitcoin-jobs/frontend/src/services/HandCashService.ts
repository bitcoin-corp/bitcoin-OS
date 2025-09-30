// HandCash Service - Simplified wrapper using HandCashAuthService
// This maintains backward compatibility while using the new REST API implementation

import { HandCashAuthService } from './HandCashAuthService';
import type { HandCashUser } from './HandCashAuthService';

export type { HandCashUser };

export class HandCashService {
  private authService: HandCashAuthService;

  constructor() {
    this.authService = new HandCashAuthService();
  }

  // Start the login flow
  async login(): Promise<void> {
    return this.authService.login();
  }

  // Handle OAuth callback
  async handleCallback(authToken: string): Promise<HandCashUser> {
    // The new service expects the full callback URL, not just the token
    // If we're given just a token, construct the URL
    let callbackUrl: string;
    
    if (authToken.startsWith('http')) {
      // It's already a URL
      callbackUrl = authToken;
    } else {
      // It's just a token, construct URL with it
      // This handles legacy code that might pass just the token
      callbackUrl = `${window.location.origin}/auth/handcash/callback?code=${authToken}`;
    }
    
    return this.authService.handleCallback(callbackUrl);
  }

  // Logout
  logout(): void {
    this.authService.logout();
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Get current user
  getCurrentUser(): HandCashUser | null {
    return this.authService.getCurrentUser();
  }

  // Make a payment (placeholder for future implementation)
  async makePayment(destination: string, amount: number, currencyCode: string = 'USD') {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    // TODO: Implement actual payment using HandCash API
    console.log('Payment request:', { destination, amount, currencyCode });
    
    return {
      transactionId: 'demo_tx_' + Date.now(),
      timestamp: new Date().toISOString()
    };
  }

  // Get wallet balance (placeholder for future implementation)
  async getBalance() {
    if (!this.isAuthenticated()) {
      throw new Error('User not authenticated');
    }

    // TODO: Implement actual balance check using HandCash API
    return {
      total: 0.001,
      currency: 'BSV',
      spendable: 0.001
    };
  }

  // Load existing session (for compatibility)
  private loadSession(): void {
    // Session is now handled by HandCashAuthService
  }
}