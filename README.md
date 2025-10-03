# Kai - AI Text Analysis Platform

A full-stack application for intelligent text analysis powered by OpenAI, featuring real-time sentiment analysis, keyword extraction, and text summarization.

## 🚀 Overview

Kai is a modern web application that provides AI-powered text analysis capabilities. Users can submit text for analysis and receive insights including sentiment analysis, keyword extraction, and intelligent summaries.

## ✨ Features

### Backend (FastAPI)
- **RESTful API**: Modern FastAPI-based backend with automatic documentation
- **Firebase Authentication**: Secure JWT-based authentication
- **OpenAI Integration**: GPT-4 powered text analysis
- **Background Processing**: Asynchronous text analysis with status tracking
- **Firestore Database**: Scalable NoSQL database for data persistence
- **Comprehensive Testing**: Full test suite with mocking and fixtures

### Frontend (Next.js)
- **Modern React**: Built with Next.js 15 and React 19
- **TypeScript**: Full type safety throughout the application
- **Firebase Auth**: Seamless user authentication and management
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Real-time Updates**: Live status updates for analysis requests

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • React 19      │    │ • FastAPI       │    │ • Firebase      │
│ • TypeScript    │    │ • Python 3.11+  │    │ • OpenAI API    │
│ • Tailwind CSS  │    │ • Firestore     │    │ • Firestore     │
│ • Firebase Auth │    │ • Background    │    │                 │
└─────────────────┘    │   Tasks         │    └─────────────────┘
                       └─────────────────┘
```

## 📋 Prerequisites

- **Node.js 18+** (for frontend)
- **Python 3.11+** (for backend)
- **Firebase Project** with Authentication and Firestore enabled
- **OpenAI API Key** for text analysis
- **Git** for version control

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (for frontend)
- **Python 3.11+** (for backend)
- **Firebase Project** with Authentication and Firestore enabled
- **OpenAI API Key** for text analysis

### Setup Instructions

👉 **For detailed setup instructions, see:**
- **[Backend Setup Guide](./backend/README.md#-installation)** - Python environment, dependencies, Firebase config
- **[Frontend Setup Guide](./frontend/README.md#-installation)** - Node.js environment, dependencies, Firebase config

### Quick Commands

```bash
# Clone repository
git clone <repository-url>
cd kai
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Individual Service Development

👉 **For detailed development instructions, see:**
- **[Backend Development Guide](./backend/README.md#-development)** - Testing, linting, code quality
- **[Frontend Development Guide](./frontend/README.md#-development)** - TypeScript, styling, components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Use meaningful commit messages
- Keep commits focused and atomic


## ⏱️ Development Timeline & Approach

### 📊 Overall Project Duration
**Total Development Time: ~16 hours**

### 🚀 Development Breakdown

- **Day 1**: Project setup, architecture planning, Research
  - Setup frontend
  - Build UI components and design
  - Implemented sign-in/sign-up using firebase
  - FastAPI application structure
  - Firebase and firestore database integration
- **Day 2**: Backend API development
  - Firebase authentication middleware
  - Implemented analyze endpoints
  - OpenAI text analysis service
  - Integrate frontend with backend analyze apis
  - Deploy frontend to firebase host
  - Deploy backend to GCP
- **Day 3**
  - Implemented some adjustments and fixes
  - Update readme files

### 🤖 AI Assistant Usage

#### **Primary AI Assistant: Claude**
  - **Code Generation**: Code out-complete and Implementation based on prompt description
  - **Documentation**: README files, API documentation, and code comments
  - **Styling**: Tailwind CSS classes and responsive design
  - **Troubleshooting**: Debugging and Common issues and solutions and search in documentations
  - **Frontend design**: I used lovable to provide app design and style

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework for production
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service platform
- [OpenAI](https://openai.com/) - AI text analysis capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the individual README files in backend/ and frontend/
- Review the API documentation
- Check the Firebase and OpenAI documentation
