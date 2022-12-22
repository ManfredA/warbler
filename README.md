Description: This is a very dummy application meant to practice Fullstack skills.

# Dummy-app
A "dummy" application exercise to improve the fullstack skills.
   There are a lot of areas of improvement that have TODOs

## Steps to install
 1. install mongo db docker image
  ```bash
    docker run --name warbler -d -p 27013:27017 -v d/Projects/personal/data/db mongo
  ```
  **Optional**: install mongodb compass to interact with the db

2. install dependencies
  ```bash
    npm install
  ```

3. Add the MONGO_ATLAS_PASS to the env variables

4. start applications
  inside of the client folder
  ```bash
    npm start
  ```

  inside of the backend folder
  ```bash
    npm start
  ```
