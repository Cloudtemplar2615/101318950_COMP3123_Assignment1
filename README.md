Assignment 1 Comp3123


## To run locally clone repo

## Installation 

1.npm install

2.Create a .env file

PORT=8080

MONGODB_URI=your_mongo_atlas_uri

JWT_SECRET=supersecret

JWT_EXPIRES=1d


3.npm run dev


## Live URL for API host via vercel

https://101318950-comp-3123-assignment1.vercel.app/





## SAMPLE USER 

username
"johndoe"

email
"johndoe@example.com"

password
"$2b$10$fsJfOqXH2udP4FZnwEzTnupgKTx1MpL4V29wO5nLgvZu6wijbPqYy" if doesnt work try password123


## Assignment 2 Note

This backend from Assignment 1 is reused as the API for Assignment 2 (React frontend).
It now includes:
- Employee CRUD endpoints
- Login/Signup with JWT
- File upload for profile pictures
- Docker support (Dockerfile + docker-compose)
- On local/Docker, profile pictures are uploaded to the uploads/ folder and work as expected. On the Vercel deployment, file uploads are limited because the backend runs as serverless functions, so image upload may fail there. Please use the local/Docker setup to test file uploads.

