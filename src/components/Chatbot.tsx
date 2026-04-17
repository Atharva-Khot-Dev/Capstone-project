import React, { useEffect } from 'react';
import { DIALOGFLOW_CONFIG } from '../config/dialogflow';

const Chatbot: React.FC = () => {
  useEffect(() => {
    // Custom styling for Dialogflow Messenger
    const style = document.createElement('style');
    style.textContent = `
      df-messenger {
        --df-messenger-bot-message: #f3f4f6;
        --df-messenger-button-titlebar-color: #23cece;
        --df-messenger-chat-background-color: #ffffff;
        --df-messenger-font-color: #1f2937;
        --df-messenger-send-icon: #23cece;
        --df-messenger-user-message: #23cece;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return React.createElement('df-messenger', {
    intent: 'WELCOME',
    'chat-title': DIALOGFLOW_CONFIG.chatTitle,
    'agent-id': DIALOGFLOW_CONFIG.agentId,
    'language-code': DIALOGFLOW_CONFIG.languageCode
  } as any);
};

export default Chatbot;