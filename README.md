A MERN stack async job processing system built with Node.js, MongoDB, Redis, and BullMQ. Demonstrates worker queue patterns for background job processing — job creation via REST API, async processing via dedicated worker service, and job state management in MongoDB.

Architecture: Express backend creates jobs → Redis queue via BullMQ → standalone worker service processes jobs → MongoDB persists job state.

Stack: Node.js, Express, React, MongoDB, Redis, BullMQ, Docker

# How to run frontend
    cd client
    npm install
    npm start


# How to run backend
    cd backend
    npm install
    npm start

# how to run standalone worker
    cd worker
    npm install
    npm start

# how to run redis and  mongo if you have docker
    docker run -p 27017:27017 -idt mongo
    docker run -p 6379:6379 -idt redis
