# Backend Setup - Quick Start Guide

## What's Been Completed ✅

Your Node.js backend is now fully configured with:

### Core Features
- ✅ User Registration (Signup)
- ✅ User Login with JWT Authentication
- ✅ User Profile Management
- ✅ Password Change Functionality
- ✅ Account Deletion
- ✅ Email & Password Validation
- ✅ Password Hashing (bcryptjs)
- ✅ JWT Token Authorization
- ✅ Error Handling Middleware
- ✅ CORS Configuration
- ✅ MongoDB Integration (with in-memory fallback)

### Project Structure

```
server/
├── config/
│   └── database.js              ← Database connection logic
├── middleware/
│   ├── auth.js                  ← JWT authentication
│   └── errorHandler.js          ← Global error handling
├── models/
│   └── User.js                  ← User schema with validation
├── routes/
│   ├── auth.js                  ← Login, Signup, Logout
│   ├── user.js                  ← Profile, Password, Delete
│   └── admin.js                 ← Admin routes (for future use)
├── utils/
│   ├── validation.js            ← Input validation
│   ├── constants.js             ← HTTP codes & messages
│   └── logger.js                ← Logging utility
├── .env                         ← Environment variables
├── .env.example                 ← Example config
├── .gitignore                   ← Git ignore rules
├── index.js                     ← Express app entry point
├── package.json                 ← Dependencies
├── README.md                    ← Full documentation
├── API_DOCUMENTATION.json       ← API endpoints reference
└── API_USAGE_EXAMPLES.md        ← Integration examples
```

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Environment
No changes needed - `.env` is already configured with development defaults!

**Current `.env` settings:**
- MongoDB: `mongodb://localhost:27017/react-app`
- Port: `5000`
- JWT Secret: `nexusui_secret_jwt_key_2024`
- Client URL: `http://localhost:5173`

### Step 3: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
====================================================
🚀 Server running on http://localhost:5000
📡 Health check: http://localhost:5000/health
📚 API info: http://localhost:5000/api
====================================================
```

## 📌 Important Notes

### Missing MongoDB?
- If MongoDB isn't installed locally, the server automatically falls back to an in-memory database
- In-memory mode is perfect for development and testing
- To use persistent storage, install MongoDB or use MongoDB Atlas

### First Time Setup
1. No database migrations needed - schema created automatically
2. No seeding needed - ready to use immediately
3. Make sure port 5000 isn't in use

## 🔑 API Keys Required on Frontend

Store these in your React environment variables:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 Documentation Files

1. **README.md** - Complete backend documentation
2. **API_DOCUMENTATION.json** - Structured API reference
3. **API_USAGE_EXAMPLES.md** - Frontend integration examples
4. **This file** - Quick start guide

## 🧪 Testing the API

### Option 1: Using cURL
```bash
# Test health check
curl http://localhost:5000/health

# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Option 2: Using Postman
1. Open Postman
2. Create new request
3. Set method to POST
4. Enter URL: `http://localhost:5000/api/auth/signup`
5. Add body (JSON):
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Option 3: Using VS Code REST Client
Create a file `test.http` in server folder:
```http
### Signup
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

## 🔌 Available Endpoints

### Auth Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (frontend deletes token)
- `GET /api/auth/me` - Get current user (requires token)

### User Routes
- `GET /api/user/profile` - Get profile (requires token)
- `PUT /api/user/profile` - Update profile (requires token)
- `POST /api/user/change-password` - Change password (requires token)
- `DELETE /api/user/account` - Delete account (requires token)

### Utility Routes
- `GET /health` - Health check
- `GET /api` - API info and available endpoints

## 🔐 Security Features

✅ JWT Token Authentication
✅ Password Hashing (bcryptjs with salt 10)
✅ Input Validation
✅ CORS Protection
✅ Error Handling
✅ HTTP Status Codes

## 📋 Next Steps (Optional)

To enhance the backend further:

1. **Email Verification**
   - Add email confirmation on signup
   - Implement forgot password

2. **Rate Limiting**
   - Add rate limiter to login/signup
   - Prevent brute force attacks

3. **Refresh Tokens**
   - Implement token refresh mechanism
   - Better security with separate access/refresh tokens

4. **File Upload**
   - Add profile image upload
   - Use multer for file handling

5. **Admin Panel**
   - Implement admin routes in `routes/admin.js`
   - Add role-based access control

6. **Social Login**
   - Add Google/GitHub authentication
   - Use Passport.js

7. **Testing**
   - Add Jest for unit tests
   - Add Supertest for API tests

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Server will automatically use in-memory database
- This is fine for development
- To use real MongoDB: install locally or use MongoDB Atlas

### "Port 5000 already in use"
- Change port in `.env`: `PORT=5001`
- Find and close the process using port 5000

### "CORS errors in console"
- Make sure `CLIENT_URL` in `.env` matches your frontend
- Default is `http://localhost:5173` (Vite default)

### "Token authentication not working"
- Ensure token is sent as: `Authorization: Bearer {token}`
- Check that JWT_SECRET in `.env` is correct
- Verify token hasn't expired (default: 7 days)

## 📞 Support

Refer to the documentation files for more details:
- Complete API docs: See `README.md`
- Integration examples: See `API_USAGE_EXAMPLES.md`
- API reference: See `API_DOCUMENTATION.json`

Good luck with your project! 🎉
