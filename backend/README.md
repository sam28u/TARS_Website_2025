# TARS Backend (Minimal)

This is a minimal Express + Mongoose backend used to receive contact form submissions from the Next.js frontend and store them in MongoDB.

## Quick start

1. Copy `.env.example` to `.env` and update values (especially `MONGODB_URI`):

```bash
cp .env.example .env
# edit .env and set your MongoDB URI
```

2. Install dependencies and start server:

```bash
cd backend
npm install
npm run dev   # requires nodemon
```

3. By default the contact endpoint will be at `http://localhost:4000/api/contact`.

4. In your Next.js frontend, set the environment variable `NEXT_PUBLIC_CONTACT_API` to point to the backend endpoint, e.g. `http://localhost:4000/api/contact`.

Notes
- CORS: `.env` has `CORS_ORIGIN` (default `*`) — change it in production to your frontend origin.
- The server returns JSON: `{ result: 'success' }` on success and `{ result: 'error', error: '...' }` on failure.

Troubleshooting: MongoDB connection (ECONNREFUSED)
-----------------------------------------------
- If you see an error like `connect ECONNREFUSED 127.0.0.1:27017`, it means the backend couldn't reach MongoDB at the configured host/port.

Local MongoDB (Ubuntu) quick start:

```bash
# install mongodb (if not installed)
sudo apt update
sudo apt install -y mongodb

# start the service
sudo systemctl start mongodb
# enable on boot
sudo systemctl enable mongodb

# check status
sudo systemctl status mongodb
```

If using `mongod` from a package that provides `mongod` rather than `mongodb` use that service name accordingly.

Using MongoDB Atlas (hosted):

1. Create a free cluster on https://www.mongodb.com/cloud/atlas
2. Create a database user and whitelist your IP
3. Copy the connection string and set `MONGODB_URI` in `backend/.env` to the provided value.

After starting MongoDB or updating `MONGODB_URI`, restart the backend:

```bash
cd backend
npm run dev
```


