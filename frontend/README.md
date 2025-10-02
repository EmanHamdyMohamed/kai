# Kai Frontend

A modern Next.js frontend application for the Kai text analysis platform, featuring Firebase authentication and real-time text analysis capabilities.

## 🚀 Features

- **Next.js 15**: Latest Next.js with App Router and Turbopack
- **React 19**: Modern React with latest features
- **TypeScript**: Full type safety throughout the application
- **Firebase Authentication**: Secure user authentication and management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Responsive Design**: Mobile-first responsive design
- **Real-time Analysis**: Live text analysis with status tracking
- **Modern UI**: Clean, intuitive user interface

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase project with Authentication enabled
- Backend API running (see backend README)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kai/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the frontend directory:

4. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication with Email/Password provider
   - Get your Firebase configuration from Project Settings
   - Update the environment variables with your Firebase config

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Mode

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun build
bun start
```

## 📱 Application Structure

### Pages

- **`/`** - Landing page with authentication options
- **`/auth/login`** - User login page
- **`/auth/register`** - User registration page
- **`/analyze`** - Text analysis dashboard (protected)

### Components

- **`Header`** - Navigation header with authentication state
- **`HeaderTitle`** - Page title component
- **`UserInfo`** - User profile information display
- **`ErrorMessage`** - Error message display component

### Context

- **`AuthContext`** - Firebase authentication state management

### Libraries

- **`firebase.ts`** - Firebase configuration and initialization
- **`api.ts`** - Backend API communication with authentication

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality

The project uses:
- **ESLint**: Code linting and style enforcement
- **TypeScript**: Type checking and safety
- **Tailwind CSS**: Utility-first styling

### Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── analyze/
│   │   │   └── page.tsx          # Analysis dashboard
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Login page
│   │   │   └── register/
│   │   │       └── page.tsx      # Registration page
│   │   ├── components/
│   │   │   ├── ErrorMessage.tsx  # Error display
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   ├── HeaderTitle.tsx   # Page title
│   │   │   └── UserInfo.tsx      # User profile
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── context/
│   │   └── AuthContext.tsx       # Authentication context
│   └── lib/
│       ├── api.ts                # API utilities
│       └── firebase.ts           # Firebase config
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind config
├── next.config.ts                # Next.js config
└── README.md                     # This file
```

## 🔐 Authentication

The application uses Firebase Authentication with the following features:

- **Email/Password Authentication**: Secure user registration and login
- **Persistent Sessions**: Users stay logged in across browser sessions
- **Email Verification**: Optional email verification for new accounts
- **Protected Routes**: Authentication required for analysis features
- **JWT Tokens**: Automatic token management for API requests

### Authentication Flow

1. User visits the application
2. If not authenticated, redirected to login/register
3. After successful authentication, redirected to analysis dashboard
4. All API requests include Firebase JWT token
5. User can logout to return to public pages

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- **Utility-first approach**: Rapid UI development
- **Responsive design**: Mobile-first responsive breakpoints
- **Custom components**: Reusable styled components
- **Consistent spacing**: Standardized spacing and typography
- **Modern design**: Clean, professional appearance

## 🔌 API Integration

The frontend communicates with the backend API through:

- **Authenticated requests**: All requests include Firebase JWT token
- **Error handling**: Comprehensive error handling and user feedback
- **Type safety**: TypeScript interfaces for API responses
- **Environment configuration**: Configurable API endpoints

### API Endpoints Used

- `GET /v1/user/me` - Get user profile
- `POST /v1/user/analyze` - Submit text for analysis
- `GET /v1/user/analyze` - Get analysis results

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Static site generation
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple deployment
- **Docker**: Containerized deployment

### Environment Variables for Production

Ensure all required environment variables are set:

- Firebase configuration variables
- API URL for backend communication
- Any additional production-specific variables


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Next.js documentation
- Review the Firebase documentation
- Check the backend API documentation

## 🔄 Changelog

### v0.1.0
- Initial release
- Firebase authentication integration
- Text analysis dashboard
- Responsive design
- TypeScript support