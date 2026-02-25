# Backend Architecture & Routes

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 5173)               │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components & Pages                                 │  │
│  │  - Login, Signup, Dashboard, Profile, etc.          │  │
│  └──────────┬───────────────────────────────────────────┘  │
└─────────────┼──────────────────────────────────────────────┘
              │
              │ HTTP Requests (JSON)
              │ with JWT Token in Header
              │
┌─────────────▼──────────────────────────────────────────────┐
│                 Node.js Backend (Port 5000)               │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Express App (index.js)                           │  │
│  │  - CORS Middleware                                │  │
│  │  - JSON Parsing                                   │  │
│  │  - Request Logging                                │  │
│  └──────────┬─────────────────────────────────────────┘  │
│             │                                             │
│  ┌──────────▼─────────────────────────────────────────┐  │
│  │  Routes                                           │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │ /api/auth    │  │ /api/user    │             │  │
│  │  ├──────────────┤  ├──────────────┤             │  │
│  │  │ signup       │  │ profile      │             │  │
│  │  │ login        │  │ profile (PUT)│             │  │
│  │  │ logout       │  │ change-pwd   │             │  │
│  │  │ me           │  │ account (DEL)│             │  │
│  │  └──────────────┘  └──────────────┘             │  │
│  └──────────┬─────────────────────────────────────────┘  │
│             │                                             │
│  ┌──────────▼─────────────────────────────────────────┐  │
│  │  Middleware                                       │  │
│  │  - Authentication (JWT)                           │  │
│  │  - Error Handling                                 │  │
│  │  - Validation                                     │  │
│  └──────────┬─────────────────────────────────────────┘  │
│             │                                             │
│  ┌──────────▼─────────────────────────────────────────┐  │
│  │  Models                                           │  │
│  │  - User (Schema with validation)                  │  │
│  │  - Password hashing (bcryptjs)                    │  │
│  └──────────┬─────────────────────────────────────────┘  │
│             │                                             │
└─────────────┼─────────────────────────────────────────────┘
              │
              │ Database Connection
              │
┌─────────────▼──────────────────────────────────────────────┐
│              MongoDB Database (Port 27017)                │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Collections                                       │  │
│  │  - users (with indexed email field)                │  │
│  │    - firstName, lastName                           │  │
│  │    - email (unique), password (hashed)             │  │
│  │    - phone, bio, profileImage                      │  │
│  │    - isVerified, createdAt, updatedAt              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
│  Fallback: In-Memory Database (mongodb-memory-server)    │
└────────────────────────────────────────────────────────────┘
```

## API Routes Table

| Method | Endpoint | Protected | Description |
|--------|----------|:---------:|-------------|
| **Authentication Routes** |
| POST | `/api/auth/signup` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/logout` | ✅ | Logout user |
| GET | `/api/auth/me` | ✅ | Get current user |
| **User Management Routes** |
| GET | `/api/user/profile` | ✅ | Get user profile |
| PUT | `/api/user/profile` | ✅ | Update profile |
| POST | `/api/user/change-password` | ✅ | Change password |
| DELETE | `/api/user/account` | ✅ | Delete account |
| **Utility Routes** |
| GET | `/health` | ❌ | Health check |
| GET | `/api` | ❌ | API information |

## Request/Response Flow

### Example: User Signup

```
1. Frontend sends:
   POST /api/auth/signup
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "password": "password123"
   }

2. Backend processes:
   - Validate inputs
   - Check email uniqueness
   - Hash password
   - Create user in database
   - Generate JWT token

3. Backend responds:
   Status: 201
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

4. Frontend:
   - Stores token in localStorage
   - Stores user data
   - Redirects to dashboard
```

### Example: Protected Route (Get Profile)

```
1. Frontend sends:
   GET /api/user/profile
   Header: Authorization: Bearer {token}

2. Backend processes:
   - Extract token from header
   - Verify token signature
   - Check token expiration
   - Get user from database
   - Remove password field

3. Backend responds:
   Status: 200
   {
     "_id": "...",
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "phone": "+1234567890",
     "bio": "Developer",
     "profileImage": null,
     "isVerified": false,
     "createdAt": "2024-02-25T...",
     "updatedAt": "2024-02-25T..."
   }

4. Frontend:
   - Displays user profile
   - Shows no password field (never sent)
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│ User visits app                                         │
└──────────────┬──────────────────────────────────────────┘
               │
        ┌──────▼────────┐
        │ Has token?    │
        └──────┬────────┘
               │
        ┌──────▴────────┐
        │               │
       NO             YES
        │               │
        │        ┌──────▼────────────┐
        │        │ Verify token      │
        │        └──────┬────────────┘
        │               │
        │        ┌──────▴────────┐
        │        │               │
        │     VALID          INVALID
        │        │               │
        │        │        ┌──────▼────────┐
        │        │        │ Delete token  │
        │        │        │ -> Login page │
        │        │        └───────────────┘
        │        │
  ┌─────▼────────▼──────────┐
  │ Redirect to login       │
  │ or signup page          │
  └┬─────────────────────────┘
   │
   ├─► User enters credentials
   │   ├─► POST /api/auth/signup (for signup)
   │   └─► POST /api/auth/login (for login)
   │
   └─► Backend verifies & returns token
       │
       ├─► Frontend stores token
       │
       └─► Frontend can now access protected routes
           with Authorization header
```

## User Data Model

```javascript
User {
  _id: ObjectId              // Auto-generated by MongoDB
  firstName: String          // Required, min 2 chars
  lastName: String           // Required, min 2 chars
  email: String              // Required, unique, valid email
  password: String           // Required, hashed, min 6 chars
  phone: String              // Optional
  bio: String                // Optional, max 500 chars
  profileImage: String       // Optional
  isVerified: Boolean        // Default: false
  createdAt: Date            // Auto-set on creation
  updatedAt: Date            // Auto-updated on save
}
```

## Error Response Examples

### Validation Error (400)
```json
{
  "message": "Validation error",
  "errors": {
    "email": "Invalid email address",
    "password": "Password must be at least 6 characters"
  },
  "status": 400
}
```

### Unauthorized (401)
```json
{
  "message": "Invalid or expired token",
  "status": 401
}
```

### Conflict (409)
```json
{
  "message": "User with this email already exists",
  "status": 409
}
```

### Server Error (500)
```json
{
  "message": "Internal server error",
  "status": 500
}
```

## Security Implementation

### Password Security
- ✅ Hashed with bcryptjs
- ✅ Salt rounds: 10
- ✅ Never stored in plain text
- ✅ Never sent in responses

### JWT Security
- ✅ 7-day expiration
- ✅ Signed with secret key
- ✅ Verified on protected routes
- ✅ Stored in localStorage on frontend

### Input Security
- ✅ Email format validation
- ✅ Password length validation
- ✅ Name length validation
- ✅ Email uniqueness check

### CORS Security
- ✅ Only allows requests from configured frontend
- ✅ Default: http://localhost:5173
- ✅ Credentials support enabled

---

This comprehensive backend structure provides:
- ✅ Complete authentication system
- ✅ User management features
- ✅ Security best practices
- ✅ Error handling
- ✅ Scalable architecture
