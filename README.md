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

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the individual README files in backend/ and frontend/
- Review the API documentation
- Check the Firebase and OpenAI documentation

## 🔄 Changelog

### v1.0.0
- Initial release
- Full-stack text analysis platform
- Firebase authentication integration
- OpenAI-powered analysis
- Real-time status tracking
- Responsive web interface
- Comprehensive documentation

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework for production
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service platform
- [OpenAI](https://openai.com/) - AI text analysis capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
