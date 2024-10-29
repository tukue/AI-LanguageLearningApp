# AI Language Learning App Setup Guide

## Project Structure
```
├── src/                  # Frontend NativeScript React app
├── backend/             # AWS Lambda functions and infrastructure
│   ├── auth/           # Cognito authentication stack
│   ├── functions/      # Lambda functions
│   └── dynamodb/       # DynamoDB table definitions
```

## Prerequisites
- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI (`npm install -g serverless`)

## Backend Deployment Steps

1. **Deploy Authentication Stack**
```bash
cd backend/auth
serverless deploy --region <your-region>
```

2. **Deploy Main Backend Stack**
```bash
cd backend
serverless deploy --region <your-region>
```

3. **Note the Output Values**
- API Gateway URL
- Cognito User Pool ID
- Cognito Client ID

## Frontend Configuration

1. **Update Environment Variables**
Create a `.env` file in the project root:
```
AWS_REGION=<your-region>
COGNITO_USER_POOL_ID=<user-pool-id>
COGNITO_CLIENT_ID=<client-id>
API_GATEWAY_URL=<api-url>
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run the App**
```bash
ns preview
```

## Features
- User authentication with Amazon Cognito
- Language lessons stored in DynamoDB
- Real-time translation using Amazon Translate
- Text-to-speech using Amazon Polly
- Progress tracking for each user

## API Endpoints

### Authentication
- POST `/auth/login` - User login

### Lessons
- GET `/lessons` - Get all available lessons
- GET `/lessons/{id}` - Get specific lesson details

### Translation
- POST `/translate` - Translate text and generate audio

### Progress
- POST `/progress` - Update user lesson progress

## Infrastructure Components

### DynamoDB Tables
1. **Lessons Table**
   - Primary Key: id (String)
   - Attributes: title, content, difficulty, language

2. **User Progress Table**
   - Partition Key: userId (String)
   - Sort Key: lessonId (String)
   - Attributes: score, completedAt, updatedAt

### AWS Services Used
- Amazon Cognito for authentication
- API Gateway for REST API
- Lambda for serverless functions
- DynamoDB for data storage
- Amazon Translate for language translation
- Amazon Polly for text-to-speech

## Security
- API endpoints protected with Cognito authorizers
- CORS enabled for frontend access
- IAM roles with least privilege principle
- Secure password policies enforced

## Development Notes
- Frontend built with NativeScript React
- State management using Zustand
- Tailwind CSS for styling
- AWS SDK for service integration