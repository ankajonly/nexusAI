# Backend Server

Complete Node.js backend with Express and MongoDB for user authentication and profile management.

## Features

✅ User Registration (Signup)
✅ User Login with JWT
✅ User Profile Management
✅ Password Change
✅ Account Deletion
✅ Email Validation
✅ Password Hashing with Bcrypt
✅ JWT Token Authentication
✅ Error Handling
✅ CORS Support
✅ MongoDB Integration (with fallback to In-Memory DB)
✅ Input Validation

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (optional - falls back to in-memory if not available)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/react-app
   JWT_SECRET=your_super_secret_key_here
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

### Health Check
```bash
curl http://localhost:5000/health
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Account created successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### User Routes (`/api/user`)

#### Get User Profile
```http
GET /api/user/profile
Authorization: Bearer {token}
```

#### Update User Profile
```http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "bio": "I am a developer"
}
```

#### Change Password
```http
POST /api/user/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

#### Delete Account
```http
DELETE /api/user/account
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "password123"
}
```

## Project Structure

```
server/
├── config/
│   └── database.js          # Database connection logic
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   └── User.js              # User schema and methods
├── routes/
│   ├── auth.js              # Authentication routes
│   └── user.js              # User management routes
├── utils/
│   ├── validation.js        # Input validation functions
│   └── constants.js         # HTTP codes and messages
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── index.js                 # Express app entry point
├── package.json             # Project dependencies
└── README.md                # This file
```

## Security Best Practices

1. **JWT Secret**: Always use a strong JWT secret in production
2. **CORS**: Configure CORS properly for your frontend domain
3. **Password**: Passwords are hashed using bcryptjs with salt rounds = 10
4. **Environment Variables**: Never commit `.env` file to version control
5. **HTTPS**: Use HTTPS in production
6. **Rate Limiting**: Consider adding rate limiting for login/signup routes
7. **Input Validation**: All inputs are validated before processing

## Error Handling

The server returns error messages in standardized format:

```json
{
  "message": "Error message",
  "status": 400
}
```

Common Error Codes:
- 400: Bad Request (validation error)
- 401: Unauthorized (missing or invalid token)
- 409: Conflict (email already exists)
- 500: Internal Server Error

## Testing

You can test endpoints using:
- **Postman** - Import provided Postman collection
- **cURL** - Command line HTTP client
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

## Development

### Watch Mode
```bash
npm run dev
```

### Git Ignore
The `.gitignore` file excludes:
- `node_modules/`
- `.env`
- `.env.local`
- `.DS_Store`
- `*.log`

## Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use a real MongoDB instance
3. Generate a strong JWT secret
4. Enable HTTPS
5. Set appropriate CORS origin
6. Consider adding rate limiting
7. Configure proper error logging

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally on port 27017
- Or provide a remote MongoDB URI in `.env`
- Server will fall back to in-memory database if MongoDB is unavailable

### JWT Errors
- Ensure token is sent in `Authorization: Bearer {token}` format
- Check if token has expired
- Verify JWT_SECRET matches in `.env`

### CORS Errors
- Update `CLIENT_URL` in `.env` to match your frontend URL
- Ensure frontend sends requests with correct headers

## License

ISC
