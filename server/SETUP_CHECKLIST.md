# Backend Setup Verification Checklist

Complete this checklist to ensure your backend is properly configured.

## ✅ Pre-Setup (Before Installation)

- [ ] Node.js installed (v14 or higher)
  - Check: `node --version`
- [ ] npm installed (comes with Node.js)
  - Check: `npm --version`
- [ ] Port 5000 is available
  - Check: `netstat -ano | findstr :5000` (Windows)
- [ ] Working directory: `e:\React js\react-app\server\`

## ✅ Installation

- [ ] Navigate to server directory
  ```bash
  cd "e:\React js\react-app\server"
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```
  
  Should install:
  - [ ] express (^4.19.2)
  - [ ] mongoose (^8.4.1)
  - [ ] bcryptjs (^2.4.3)
  - [ ] jsonwebtoken (^9.0.2)
  - [ ] cors (^2.8.5)
  - [ ] dotenv (^16.4.5)
  - [ ] nodemon (dev dependency)

## ✅ Configuration

- [ ] Check `.env` file exists in server folder
  - [ ] MONGODB_URI is set
  - [ ] JWT_SECRET is set
  - [ ] PORT is set (default: 5000)
  - [ ] NODE_ENV is set (development)
  - [ ] CLIENT_URL is set

- [ ] `.env` should contain:
  ```
  MONGODB_URI=mongodb://localhost:27017/react-app
  JWT_SECRET=nexusui_secret_jwt_key_2024
  PORT=5000
  NODE_ENV=development
  CLIENT_URL=http://localhost:5173
  ```

## ✅ File Structure

Verify all required files exist:

### Root Files
- [ ] `index.js` - Main server file
- [ ] `package.json` - Dependencies file
- [ ] `.env` - Environment variables
- [ ] `.env.example` - Example env file
- [ ] `.gitignore` - Git ignore file

### Folders & Files
- [ ] `config/` folder exists
  - [ ] `config/database.js`

- [ ] `middleware/` folder exists
  - [ ] `middleware/auth.js`
  - [ ] `middleware/errorHandler.js`

- [ ] `models/` folder exists
  - [ ] `models/User.js`

- [ ] `routes/` folder exists
  - [ ] `routes/auth.js`
  - [ ] `routes/user.js`
  - [ ] `routes/admin.js`

- [ ] `utils/` folder exists
  - [ ] `utils/validation.js`
  - [ ] `utils/constants.js`
  - [ ] `utils/logger.js`

### Documentation Files
- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `COMPLETION_SUMMARY.md`
- [ ] `ARCHITECTURE.md`
- [ ] `API_DOCUMENTATION.json`
- [ ] `API_USAGE_EXAMPLES.md`

## ✅ Pre-Startup Checks

- [ ] Open terminal/PowerShell in server folder
- [ ] Run: `npm list`
  - Should show all dependencies installed
- [ ] Run: `node --version`
  - Should show v14 or higher
- [ ] Check port 5000 availability
  - `lsof -i :5000` (Mac/Linux)
  - `netstat -ano | findstr :5000` (Windows)

## ✅ Starting the Server

### Development Mode
- [ ] Run: `npm run dev`
- [ ] Should see output:
  ```
  ==================================================
  🚀 Server running on http://localhost:5000
  📡 Health check: http://localhost:5000/health
  📚 API info: http://localhost:5000/api
  ==================================================
  ```

### Health Check
- [ ] Open browser: `http://localhost:5000/health`
- [ ] Should see JSON response with status: "ok"

### API Info
- [ ] Open browser: `http://localhost:5000/api`
- [ ] Should see JSON with available endpoints

## ✅ Testing Endpoints

### Test 1: Signup (no token needed)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```
- [ ] Expected: 201 Created
- [ ] Response includes token and user data

### Test 2: Login (no token needed)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```
- [ ] Expected: 200 OK
- [ ] Response includes token

### Test 3: Get Current User (requires token)
```bash
# Replace {token} with actual token from login response
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer {token}"
```
- [ ] Expected: 200 OK
- [ ] Response shows user data (without password)

### Test 4: Get Profile (requires token)
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer {token}"
```
- [ ] Expected: 200 OK
- [ ] Response shows user profile

## ✅ Frontend Integration Ready

- [ ] Backend is running on `http://localhost:5000`
- [ ] React app should be on `http://localhost:5173`
- [ ] CORS is configured for `http://localhost:5173`
- [ ] Can test API calls from React

## ✅ Stopping the Server

- [ ] Press `Ctrl + C` in terminal
- [ ] Server should stop gracefully
- [ ] No errors should appear

## ✅ Common Issues & Solutions

### Issue: Port 5000 already in use
- [ ] Change PORT in `.env` to 5001
- [ ] Restart server

### Issue: Cannot connect to MongoDB
- [ ] This is expected if MongoDB isn't installed
- [ ] Server will use in-memory database
- [ ] Data won't persist between restarts
- [ ] Perfect for development

### Issue: "Cannot find module" error
- [ ] Run `npm install` again
- [ ] Delete `node_modules` folder and reinstall
- [ ] Check package.json has all dependencies

### Issue: CORS error in console
- [ ] Check CLIENT_URL in `.env`
- [ ] Should be `http://localhost:5173`
- [ ] Update if frontend is on different port

### Issue: Token errors
- [ ] Check JWT_SECRET in `.env`
- [ ] Verify token sent as: `Authorization: Bearer {token}`
- [ ] Check token hasn't expired (7 days)

## ✅ Production Preparation

Before deploying to production:

- [ ] Update JWT_SECRET with strong random key
- [ ] Set NODE_ENV=production
- [ ] Configure real MongoDB connection
- [ ] Set correct CLIENT_URL for frontend domain
- [ ] Enable HTTPS
- [ ] Add rate limiting to auth routes
- [ ] Configure proper CORS origin
- [ ] Set up environment variables on hosting platform
- [ ] Add email verification (optional enhancement)
- [ ] Add logging/monitoring

## ✅ Development Workflow

Daily development:
- [ ] Run `npm run dev` to start server
- [ ] Server auto-restarts on file changes (nodemon)
- [ ] Check terminal for any errors
- [ ] Test API endpoints during development
- [ ] Commit code to git (excluding .env)

## ✅ Next Steps

After verification:
1. [ ] Test all endpoints with Postman/cURL
2. [ ] Integrate API calls in React components
3. [ ] Handle success/error responses
4. [ ] Store JWT token in localStorage
5. [ ] Add logout functionality
6. [ ] Implement protected routes
7. [ ] Add loading states
8. [ ] Handle edge cases

## ✅ Documentation Reference

- [ ] Read QUICKSTART.md for quick overview
- [ ] Check API_USAGE_EXAMPLES.md for React integration
- [ ] See ARCHITECTURE.md for system design
- [ ] Refer to README.md for detailed docs
- [ ] Use API_DOCUMENTATION.json as API reference

---

## Final Verification

When everything is checked:

✅ Installation complete
✅ Configuration correct
✅ Files in place
✅ Server starts without errors
✅ Health check works
✅ Endpoints respond correctly
✅ Ready for frontend integration

**Your backend is ready to use! 🎉**

Start development with: `npm run dev`
