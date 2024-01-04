# DinoBoard-Core 💻

![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

This repository focuses on providing the core of DinoBoard, offering a robust set of tools and features designed to streamline business administration.

## Getting Started 📕

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites 🤓

Ensure you have [Node.js](https://nodejs.org/en/download/) on your local machine.

### Installation

1. **Clone the repo** 📦

   ```bash
   $ git clone 'https://github.com/MilfuegosDEV/DinoBoard-Core.git'
   $ cd dinoboard-core
   ```

2. **Setup .env file** 🔒

   ```dotenv
   PORT=4000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

   CLIENT_NAME=<CLIENT_NAME>
   CLIENT_LASTNAME=<CLIENT_LASTNAME>
   CLIENT_EMAIL=<CLIENT_EMAIL>
   CLIENT_SECRET=<CLIENT_PASSWORD>

   JWT_SECRET=<YOUR_KEY>
   ```

3. **Install dependencies** 💣

   ```bash
   $ yarn install
   ```

4. **Start the app** 😀

   ```bash
   $ npm run dev
   ```

## Configuration 🔧

1. **`PORT=4000`:**

   - Specifies the port on which your server will run. In this case, the server will listen on port 4000.

2. **`MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database`:**

   - Sets the MongoDB connection URI. Replace `username`, `password`, and `cluster.mongodb.net` with your actual MongoDB credentials and cluster information. `database` should be the name of the MongoDB database.

3. **`CLIENT_NAME=<CLIENT_NAME>`:**

   - This appears to be a placeholder for the client's name. You would replace `<CLIENT_NAME>` with the actual name of the client.

4. **`CLIENT_LASTNAME=<CLIENT_LASTNAME>`:**

   - Similar to `CLIENT_NAME`, this is a placeholder for the client's last name. Replace `<CLIENT_LASTNAME>` with the actual last name of the client.

5. **`CLIENT_EMAIL=<CLIENT_EMAIL>`:**

   - Placeholder for the client's email address. Replace `<CLIENT_EMAIL>` with the actual email address of the client.

6. **`CLIENT_SECRET=<CLIENT_PASSWORD>`:**

   - Placeholder for the client's password or secret. Replace `<CLIENT_PASSWORD>` with the actual password or secret for the client. Note that storing secrets directly in environment variables might not be the most secure practice. Consider more secure methods if this is for production.

7. **`JWT_SECRET=<YOUR_KEY>`:**
   - Sets the secret key used for signing JSON Web Tokens (JWT). Replace `<YOUR_KEY>` with a secure secret key. This key is crucial for the security of your authentication system, so make sure it's a strong and secret value.

Each configuration option in the `.env` file serves a specific purpose in configuring and customizing your application. It's important to keep sensitive information, such as database credentials and secret keys, secure and not expose them publicly.

## Scripts 🛠️

- **build**: Compiles the source code.
- **dev**: Starts the app in development mode.
- **start**: Starts the compiled app.

## Project Structure 📂

```
DinoBoard-Core
├───build // compiled src
|
├───src
|   │   index.js
│   │
│   ├───app
│   │   ├───config // Configuration files.
│   │   ├───controllers // Controllers for handling business logic
│   │   ├───libs // Libraries or utility functions that are used across the application.
│   │   ├───middlewares // functions that can be applied to specific routes or globally.
│   │   ├───models // Moongose models representing MongoDB collections
│   │   ├───routes // Route definitions for different parts of this api.
│   │   └───services // Bussiness logic services.
│   │
│   └───resources // Resources used in this project.
│       └───locales // Languages files for translations.
│
├───.env
├───.gitignore
├───README.md
└───yarn.lock
```

## Contributing 🤝

Feel free to contribute! Follow these steps to get started.

2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.
