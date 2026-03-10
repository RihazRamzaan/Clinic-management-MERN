# Clinic Management System

A full-stack MERN application for managing medical clinic patient records.

## Features
- **Patient Management**: Create, read, update, and delete patient profiles.
- **Search capabilities**: Easily find patients by name.
- **Modern UI**: Built with React, TailwindCSS, and Lucide icons.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, React Router, Axios
- **Backend**: Node.js, Express, MongoDB/Mongoose

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance running locally or via MongoDB Atlas

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the server directory (or modify the existing one) with:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/clinicCMS
   PORT=5000
   ```
4. Start the backend: `npm run dev`

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Access the application at `http://localhost:5173`