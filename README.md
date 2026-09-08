# Stokpro Backend

RESTful API backend for Stokpro project using Node.js, Express.js, Sequelize, and MySQL.

## Prerequisites
- Node.js (>= 18.x)
- MySQL Server

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and configure your database credentials
   ```bash
   cp .env.example .env
   ```
4. Start your MySQL server and create a database named in `.env` (`stokpro_db` by default)

## Running the app
- Development mode (with nodemon): `npm run dev`
- Production mode: `npm start`

## API Endpoints
- `GET /api/health` - Check if the server and database are running properly.
