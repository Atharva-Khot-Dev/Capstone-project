// Dialogflow Configuration
export const DIALOGFLOW_CONFIG = {
  // Replace these with your actual Dialogflow credentials
  projectId: 'YOUR_PROJECT_ID',           // Your Google Cloud Project ID
  sessionId: 'web-session-' + Date.now(), // Unique session ID
  languageCode: 'en-US',                  // Language code
  agentId: '9443de6c-9b89-4e9f-8c0a-65aca9586a50',
  chatTitle: 'Code & Coffee Assistant',
  
  // Your Dialogflow API endpoint
  apiEndpoint: 'https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/SESSION_ID:detectIntent',
  
  // If using service account key (for backend integration)
  keyFilename: 'path/to/your/service-account-key.json'
};

export const MENU_ITEMS = [
  {
    name: 'Byte Burger',
    category: 'Main Course',
    price: 149,
    description: 'Crunchy patty loaded with veggies & debug sauce'
  },
  {
    name: 'Data Disk Pizza',
    category: 'Main Course',
    price: 199,
    description: 'Circular bites of cheesy satisfaction'
  },
  {
    name: 'Code Wrap',
    category: 'Snacks',
    price: 129,
    description: 'Packed with flavor — no bugs, just bytes'
  },
  {
    name: 'Compile Sandwich',
    category: 'Snacks',
    price: 99,
    description: 'Layers that run smoothly together'
  },
  {
    name: 'Stack Overflow Fries',
    category: 'Sides',
    price: 89,
    description: 'Overflowing with crispiness'
  },
  {
    name: 'Binary Waffles',
    category: 'Dessert',
    price: 119,
    description: 'Sweet bites in perfect patterns'
  },
  {
    name: 'Runtime Brownie',
    category: 'Dessert',
    price: 109,
    description: 'Runs best when served warm'
  },
  {
    name: 'Java Shake',
    category: 'Beverage',
    price: 139,
    description: 'Your favourite language in liquid form'
  },
  {
    name: 'Caffeine Coffee',
    category: 'Beverage',
    price: 99,
    description: 'A warm brew to power your next code sprint'
  }
];

// Sample intents your bot should handle
export const SAMPLE_INTENTS = {
  'menu.inquiry': {
    phrases: [
      'What do you have on the menu?',
      'Show me your food options',
      'What can I order?'
    ],
    response: 'We serve burgers, pizza, wraps, sandwiches, fries, waffles, brownies, shakes, and coffee. Which item would you like to know more about?'
  },
  'item.price': {
    phrases: [
      'How much is the Compile Sandwich?',
      'Price of Byte Burger',
      'What does Java Shake cost?'
    ],
    response: 'I can help with that. Which item price do you want?'
  },
  'item.description': {
    phrases: [
      'Tell me about Stack Overflow Fries',
      'What is Code Wrap?',
      'Describe Caffeine Coffee'
    ],
    response: 'Here is the info for that item.'
  },
  'order.place': {
    phrases: [
      'I want to order a Compile Sandwich',
      'Add Byte Burger to cart',
      'I would like a Caffeine Coffee'
    ],
    response: 'Great choice! I can help you order that. Would you like to checkout now or keep browsing?'
  },
  'hours.inquiry': {
    phrases: [
      'What are your opening hours?',
      'When are you open?',
      'Are you open today?'
    ],
    response: 'We are open daily from 9 AM to 10 PM. Place your order anytime during our hours!'
  },
  'contact.info': {
    phrases: [
      'What is your contact information?',
      'How do I reach you?',
      'Do you have a phone number?'
    ],
    response: 'You can contact us through the website or use the chat anytime for quick help.'
  }
};