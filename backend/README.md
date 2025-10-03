# Kai Backend API

A FastAPI-based backend service for the Kai application, providing text analysis capabilities with Firebase authentication and OpenAI integration.

## 🚀 Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **Firebase Authentication**: JWT token-based authentication with Firebase Admin SDK
- **Text Analysis**: OpenAI-powered text analysis with sentiment, summary, and keyword extraction
- **Firestore Database**: Async Firestore client for data persistence
- **Background Tasks**: Asynchronous text processing with status tracking
- **CORS Support**: Configured for frontend integration
- **Code Quality**: Pre-commit hooks with Ruff linting and formatting

## 📋 Prerequisites

- Python 3.11+
- Firebase project with Firestore database
- OpenAI API key
- Service account credentials for Firebase

## 🛠️ Installation

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kai/backend
   ```

2. **Configure environment variables**
   ```bash
   cp example.env .env
   ```
   Then edit the `.env` file with your actual values.

3. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up pre-commit hooks**
   ```bash
   pre-commit install
   ```

## 🚀 Running the Application

### Development Mode

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Docker

```bash
make docker-compose-up
```

## 🚀 GCP Deployment

### Prerequisites

- **Google Cloud Account** with billing enabled
- **GitHub Repository** with your code
- **Firebase Project** configured
- **OpenAI API Key** available

### Deploy to Google Cloud Run

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to **Cloud Run** in the GCP Console
3. Click **"Deploy Container"**
4. Select **"Continuously deploy from a repository (source or function)"**
5. Choose your repository (GitHub/GitLab)
6. Select the **backend** folder as the source directory
7. Configure settings


**Container Configuration:**
- **Port**: `8000`
- **Container port**: `8000`

#### 3. **Environment Variables Setup**
In the **Variables & Secrets** tab, add environment variables from .env file:


#### 4. **Deploy the Service**
1. Click **"Create"** to deploy your service
2. Wait for the deployment to complete (usually 2-5 minutes)

### Post-Deployment Verification

#### 1. **Test Health Endpoints**
```bash
# Test the health endpoint
curl https://xxxxx/health

# Test the root endpoint
curl https://xxxxx/
```

#### 2. **Test API Documentation**
Visit your deployed API documentation:
```
https://xxxxx/docs
```

#### 3. **Test Authentication Endpoint**
```bash
# Test user profile endpoint (requires authentication)
curl -H "Authorization: Bearer YOUR_FIREBASE_JWT_TOKEN" \
     https://xxxxx/v1/user/me
```

## 📚 API Documentation

### Base Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Health check and service status | No |
| GET | `/health` | Detailed health check | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/v1/user/me` | Get current user profile | Yes |
| POST | `/v1/user/analyze` | Submit text for analysis | Yes |
| GET | `/v1/user/analyze` | Get user's analysis requests | Yes |

### Authentication

All protected endpoints require a Firebase JWT token in the Authorization header:

```http
Authorization: Bearer <firebase-jwt-token>
```

### Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── config.py              # Configuration settings
│   ├── firebase.py            # Firebase initialization
│   ├── dependencies.py        # FastAPI dependencies
│   ├── middleware/
│   │   └── auth.py            # Authentication middleware
│   ├── models/
│   │   ├── response.py        # Response models
│   │   └── user.py            # User models
│   ├── routes/
│   │   ├── v1_routes.py       # API v1 router
│   │   └── v1/
│   │       └── user.py        # User endpoints
│   ├── services/
│   │   └── analyze_text.py    # Text analysis service
│   └── utils/
│       ├── responses.py       # Response utilities
│       └── firestore.py       # Firestore utilities
├── tests/                     # Test suite
├── requirements.txt           # Python dependencies
├── pyproject.toml            # Project configuration
├── .pre-commit-config.yaml   # Pre-commit hooks
├── example.env               # Environment variables template
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

## 📝 TODO
- [ ] **Rate Limiting**: Implement basic rate limiting middleware
- [ ] **Health Checks**: Enhanced health check endpoints
- [ ] **Testing**: Comprehensive test suite (unit, integration, E2E)
- [ ] **CI/CD**: Automated testing and deployment pipeline
- [ ] **Message Queues**: Redis/RabbitMQ/SQS for task processing


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pytest`)
5. Run code quality checks (`ruff check app/`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/docs`
- Review the test cases for usage examples

## 🔄 Changelog

### v1.0.0
- Initial release
- Firebase authentication integration
- Text analysis with OpenAI
- Background task processing
- Comprehensive test suite
- API documentation
