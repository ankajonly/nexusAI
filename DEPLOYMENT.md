# Deployment Guide for NexusUI

This guide covers the steps required to deploy your full-stack application to production.

## 1. Database Setup (MongoDB Atlas)
1.  Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster and a database named `nexusui`.
3.  Go to **Database Access** and create a user (remember the password).
4.  Go to **Network Access** and add IP `0.0.0.0/0` (allow access from anywhere).
5.  Get your **Connection String** from the "Connect" button (choose Drivers -> Node.js).
    - It should look like: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/nexusui?retryWrites=true&w=majority`

## 2. Backend Deployment (Render.com)
1.  Create an account on [Render](https://render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    - **Root Directory**: `server`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
5.  Add **Environment Variables**:
    - `MONGODB_URI`: (Your MongoDB Atlas connection string)
    - `JWT_SECRET`: (A long random string)
    - `CLIENT_URL`: (Your frontend URL - you will get this after following step 3)
    - `PORT`: `10000` (Render will provide this, but you can set it)
6.  Deploy the service and copy the **Service URL** (e.g., `https://nexusui-backend.onrender.com`).

## 3. Frontend Deployment (Vercel)
1.  Create an account on [Vercel](https://vercel.com/).
2.  Import your GitHub repository.
3.  Vercel will detect it's a Vite project.
4.  Configure **Environment Variables**:
    - `VITE_API_URL`: (Your Backend Service URL from step 2)
5.  Click **Deploy**.
6.  Once deployed, copy your **Frontend URL** and add it as the `CLIENT_URL` in your Render (Backend) environment variables.

## 4. Final Checklist
- [ ] Backend is running (`/health` endpoint returns 200).
- [ ] MongoDB Atlas has data.
- [ ] Frontend can login and signup using the production backend.
