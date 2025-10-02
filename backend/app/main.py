from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .firebase import initialize_firebase
from .routes.v1_routes import v1_router
from .utils.responses import success_response
from .middleware.auth import authorize_token

app = FastAPI(
    title="Kai Backend API",
    description="Backend API for Kai application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.add_middleware(authorize_token, exclude_patterns=["/health", "/docs"])


# Add HTTP middleware
# app.middleware("http")(error_handling_middleware)

initialize_firebase()



@app.get('/')
def root():
    """Root endpoint - API health check"""
    return success_response(
        data={"status": "healthy", "service": "kai-backend"},
        message="Kai Backend API is running",
        status_code=200
    )


@app.get('/health')
def health_check():
    """Health check endpoint"""
    return success_response(
        data={"status": "healthy"},
        message="Service is healthy",
        status_code=200
    )

app.middleware("http")(authorize_token)
app.include_router(v1_router)