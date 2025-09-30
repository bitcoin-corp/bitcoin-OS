import React, { useState, useRef, useEffect } from 'react';
import claudeService, { ClaudeMessage } from '../services/claudeService';
import './ClaudeChat.css';

interface ClaudeChatProps {
  spreadsheetData?: any[];
  isOpen: boolean;
  onClose: () => void;
}

const ClaudeChat: React.FC<ClaudeChatProps> = ({ spreadsheetData, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ClaudeMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ClaudeMessage = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await claudeService.sendMessage(updatedMessages);
      
      if (response.error) {
        const errorMessage: ClaudeMessage = {
          role: 'assistant',
          content: `Error: ${response.error}`
        };
        setMessages([...updatedMessages, errorMessage]);
      } else {
        const assistantMessage: ClaudeMessage = {
          role: 'assistant',
          content: response.content
        };
        setMessages([...updatedMessages, assistantMessage]);
      }
    } catch (error) {
      const errorMessage: ClaudeMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeSpreadsheet = async () => {
    if (!spreadsheetData || spreadsheetData.length === 0) {
      alert('No spreadsheet data to analyze');
      return;
    }

    setIsLoading(true);
    const prompt = "Please analyze this spreadsheet data and provide insights about patterns, trends, or interesting observations.";
    
    try {
      const response = await claudeService.analyzeSpreadsheet(spreadsheetData, prompt);
      
      const userMessage: ClaudeMessage = {
        role: 'user',
        content: 'Analyze my spreadsheet data'
      };
      
      const assistantMessage: ClaudeMessage = {
        role: 'assistant',
        content: response.error || response.content
      };
      
      setMessages([...messages, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error analyzing spreadsheet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="claude-chat-container">
      <div className="claude-chat-header">
        <h3>Claude AI Assistant</h3>
        <button className="claude-chat-close" onClick={onClose}>×</button>
      </div>
      
      <div className="claude-chat-messages">
        {messages.length === 0 && (
          <div className="claude-chat-welcome">
            <p>Hi! I'm Claude, your AI assistant for Bitcoin Spreadsheet.</p>
            <p>I can help you analyze data, answer questions, and provide insights.</p>
            {spreadsheetData && spreadsheetData.length > 0 && (
              <button 
                className="claude-analyze-button"
                onClick={handleAnalyzeSpreadsheet}
                disabled={isLoading}
              >
                Analyze Current Spreadsheet
              </button>
            )}
          </div>
        )}
        
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`claude-message ${message.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="message-role">
              {message.role === 'user' ? 'You' : 'Claude'}
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        
        {isLoading && (
          <div className="claude-message assistant">
            <div className="message-role">Claude</div>
            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="claude-chat-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Claude anything..."
          disabled={isLoading}
          rows={2}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="claude-send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ClaudeChat;