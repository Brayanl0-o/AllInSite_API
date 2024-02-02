# AllIn API

![api1](https://github.com/Brayanl0-o/AllInSite_API/assets/107898232/fe266e10-b8cc-4cd7-a8cb-4e0907f0967c)
![api2](https://github.com/Brayanl0-o/AllInSite_API/assets/107898232/3d77c773-8157-47fb-bf7e-51a012301a4e)

## Project structure

- controlllers: This folder contains controllers to manage the video games and users (including image upload and authentication functionalities).

- middlewares: Here are the middlewares for:
   - authJwt.js: Middleware for authentication with JSON Web Tokens.
   - verifySignup.js: Middleware to verify user registration.

- models: Defines the data models for the database.

- routers: Defines the routes or endpoints that will receive the requests.

- scripts: Contains js file to initialize the roles. 

- uploads: Folder to save the api images.

- Other fields:
    - .gitignore: Defines the file and folders that will excluded of version control.
    -  app.js: Main application file.
    -  database.js: Database configuration.
    -  index.js: Application entry point.
    -  package.json: Information of the dependencies and scripts of the project.
 
## Technologies & dependencies
- Node JS   • Express • Mongoose • Nodemon
- Multer    • Sharp   • Image-size
- jsonwebtoken   • bcrypt   • nodemailer 


## Installation

1. Clone the repository on your local machine
```bash
$ git clone https://github.com/Brayanl0-o/AllInSite_API.git
```

2. Browse into the project directory
```bash
$ cd AllInSite_API
```

3. You can change the source of the project with the following commands

```bash
$ git remote -v
$ git remote remove origin
$ git remote add origin <nueva_url_del_repositorio>
```

4. Install the necessary dependencies
- Remember to have the package.json and package-lock.json in the root of the folder and run

```bash
$ npm i
```

##### Usage:
1. Start the app with: ``` npm run dev```

    
2. You can access it from the configured port:
  http://localhost:3000

3. Try the different paths avaible to perform the above operations.
