// SIMPLE WORKING AUTHENTICATION - NO BULLSHIT

export class SimpleAuth {
  private static readonly STORAGE_KEY = 'auth_data';
  
  static login(authToken: string): void {
    // Store the token - SIMPLE
    const data = {
      token: authToken,
      timestamp: Date.now()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
  
  static logout(): void {
    // CLEAR EVERYTHING - ACTUALLY WORKS
    localStorage.clear();
    sessionStorage.clear();
    // Force reload
    window.location.href = '/';
  }
  
  static isLoggedIn(): boolean {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data !== null;
  }
  
  static async getUser(): Promise<any> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    
    try {
      // Call API to get real user data
      const response = await fetch('http://localhost:3000/api/handcash-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken: parsed.token })
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.profile;
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
    
    // Fallback user
    return {
      handle: `user_${parsed.token.substring(0, 8)}`,
      paymail: 'user@handcash.io'
    };
  }
  
  static getAuthUrl(): string {
    const appId = '68c532b2a0b054ff147f4579';
    return `https://app.handcash.io/#/authorizeApp?appId=${appId}`;
  }
}