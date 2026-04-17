# Dialogflow Chatbot Integration Guide

## Step 1: Install Dependencies
```bash
npm install axios
```

## Step 2: Get Dialogflow Credentials
1. Go to Google Cloud Console
2. Create/Select your project
3. Enable Dialogflow API
4. Create Service Account Key
5. Download JSON credentials file

## Step 3: Dialogflow Webhook URL
Your trained Dialogflow bot should have a webhook URL like:
```
https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/SESSION_ID:detectIntent
```

## Step 4: Required Information
- Project ID: your-project-id
- Session ID: unique-session-id
- API Key or Service Account JSON