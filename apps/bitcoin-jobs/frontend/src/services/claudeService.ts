import axios from 'axios';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: string;
  error?: string;
}

class ClaudeService {
  private apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3002';

  async sendMessage(messages: ClaudeMessage[]): Promise<ClaudeResponse> {
    try {
      const response = await axios.post(`${this.apiUrl}/api/claude`, {
        messages
      });
      
      return {
        content: response.data.content
      };
    } catch (error: any) {
      console.error('Error calling Claude API:', error);
      return {
        content: '',
        error: error.response?.data?.error || 'Failed to get response from Claude'
      };
    }
  }

  async analyzeSpreadsheet(data: any[], prompt: string): Promise<ClaudeResponse> {
    try {
      const systemPrompt = `You are helping analyze a blockchain-based spreadsheet with NFT data. The user has provided the following data from their spreadsheet:

${JSON.stringify(data, null, 2)}

Please provide helpful insights and answer their questions about this data.`;

      const messages: ClaudeMessage[] = [
        { role: 'user', content: systemPrompt },
        { role: 'user', content: prompt }
      ];

      return await this.sendMessage(messages);
    } catch (error) {
      console.error('Error analyzing spreadsheet:', error);
      return {
        content: '',
        error: 'Failed to analyze spreadsheet data'
      };
    }
  }
}

export default new ClaudeService();