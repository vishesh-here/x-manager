# X Manager - Social Media Management Tool

A comprehensive web application for managing X/Twitter social media activities with advanced features for content creation, scheduling, analytics, and automation.

## Features

- **Content Management**: Create, edit, and organize social media posts
- **Post Scheduling**: Schedule posts for optimal engagement times
- **Analytics Dashboard**: Track performance metrics and engagement
- **Multi-Account Support**: Manage multiple X/Twitter accounts
- **Content Calendar**: Visual calendar for content planning
- **Automated Posting**: Set up automated posting workflows
- **Engagement Tracking**: Monitor likes, retweets, and replies
- **Hashtag Management**: Organize and track hashtag performance

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB/PostgreSQL
- **Authentication**: OAuth 2.0 for X/Twitter API
- **Deployment**: Vercel/Netlify ready

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- X/Twitter Developer Account
- MongoDB or PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vishesh-here/x-manager.git
cd x-manager
```

2. Install dependencies:
```bash
cd app
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

## Environment Configuration

Create a `.env.local` file in the app directory with the following variables:

```env
# X/Twitter API Configuration
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
TWITTER_BEARER_TOKEN=your_bearer_token

# Database Configuration
DATABASE_URL=your_database_connection_string
MONGODB_URI=your_mongodb_uri  # if using MongoDB

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Optional: Additional API Keys
OPENAI_API_KEY=your_openai_key  # for AI-powered content suggestions
ANALYTICS_API_KEY=your_analytics_key
```

## X/Twitter API Setup

1. **Create a Twitter Developer Account**:
   - Visit [developer.twitter.com](https://developer.twitter.com)
   - Apply for a developer account
   - Create a new app in the developer portal

2. **Get API Credentials**:
   - Navigate to your app settings
   - Generate API Key and Secret
   - Generate Access Token and Secret
   - Copy the Bearer Token

3. **Set API Permissions**:
   - Enable "Read and Write" permissions
   - Enable "Direct Messages" if needed
   - Configure callback URLs for OAuth

## Running the Application

### Development Mode

```bash
cd app
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
cd app
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
x-manager/
├── app/                    # Next.js application
│   ├── app/               # App router pages
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── prisma/           # Database schema
└── README.md             # Project documentation
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/tweets/*` - Tweet management
- `/api/analytics/*` - Analytics data
- `/api/optimizer/*` - Content optimization
- `/api/settings/*` - User settings

## Usage

1. **Authentication**: Sign in with your X/Twitter account
2. **Connect Accounts**: Link multiple X/Twitter accounts
3. **Create Content**: Use the content editor to create posts
4. **Schedule Posts**: Set up posting schedules
5. **Monitor Analytics**: Track performance in the dashboard
6. **Optimize Content**: Use AI-powered suggestions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API documentation

## Roadmap

- [ ] Advanced analytics and reporting
- [ ] Team collaboration features
- [ ] Content templates and themes
- [ ] Integration with other social platforms
- [ ] Mobile application
- [ ] Advanced automation workflows

---

**Note**: This application requires valid X/Twitter API credentials to function properly. Make sure to follow X/Twitter's API terms of service and rate limiting guidelines.
