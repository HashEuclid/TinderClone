- Create the repository on github and local machine
<!-- - Initialiaze the repository                             -->
<!-- - node_modules, package.json, package-lock.json          -->
<!-- - Install Express                                        -->
<!-- - Create a server                                        -->
<!-- - Listen to port 7777                                    -->
<!-- - Write request handlers for /test, /dashboard , /hello  -->
<!-- - Install nodemon and update scripts inside package.json -->
<!-- - Difference between carrot (^) vs tilda (~)             -->
<!-- - What are dependencies                                  -->
<!-- - What is the use of -g while npm install nodemon        -->

<!-- EP04:  
- Initialize GIT
- gitignore and add the files to be ignored from changes sorce control -- node_modules
- Create a remote repo in GIThub
- Push all code to remote origin

- Install Postman app and make a workspace/collection and then test API call
- Write logic to handle GET, POST, PATCH, PUT and DELETE API calls and test them on postman

- Explore different kids of roying and use of ?,+,(),* in the routes
- Use of Regex in routes /a/, /.*fly$/
- Go to express documentation and read more about routing
- Reading the query params in the route and reading the dyamic routes.
-->


<!-- EP05 : Middleware &Error Handlers
- Create multiple Route Handlers and play with the code
- next()
- next fucntion and errors along with res.send()
- app.use("/route,rh,[rh2,rh3],rh4,rh5)
- What is a middleware and why do we need it
- How expressjs basically handles request behind the scene
- app.use() vs app.all() difference
- Write a dummy auth middleware for Admin
- Write a dummy auth middleware for all user routes, except  /user/login
- Error handling using app.use("/", (err, req, res, next) => {});
 -->


<!--EP06 - DATABASE, SCHEMA & MODELS/MONGOOSE
- Create a free cluster on mongodb official website (Mongo Atlas)
- Install Mongoose library -- npm i mongoose
- Connect your application to the database  <ConnectionUrl>/devTinder
- Call the connectDB function and connect to database before starting application on 7777 port
- Create a user Schema & user Model
- Create a POST /signup API to add data to database
- Push some documents using API calls from Postman
-->

<!--EP07 - Diving into the APIs
- Difference between the JS Object vs JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- User.findOne() with duplicate email ids, which object returned
- API - GET user by email
- API - FEED API - GET /feed - get all the users from the database
- API - GET userById
- Create a DELETE /user API
- 
-->

<!--EP08 - Data Sanitization and Data Validation
- Explore Schema type options from the documentation
- Add required, unique, min, max, default, trim, minlength
- Create a custom validation function for gender
- Improve the DB Schema - put all appropriate validations on each field in Schema
- Add timestamps to the user schema.
- Data Sanitization - Add API level validations on PATCH request and signup POST API.
- Data Sanitization - Add API validations for each field
- Install Validator from npm
- Explore and Use validator library functions
-->

<!--EP09 - Encypting Passwords
- Validate data in signup API -- create a helper / utility function
- install bcrpt library package
- Create a password hash using bcrypt.hash() and save the user with encrypted password
- Create login API and write the logic
- Compare passwords and throw errors if email or password is invalid
-->

<!--EP10 - Authentication, JWT & Cookies
- Install cookieparser
- Send a dummy cookie to user
- Create GET /profile API and check if you get the cookie back
- Install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it to user in cookie
- Read the cookie inside your profile API and find the logged in user
- Write your usrAuth middleware
- Add the user Auth middleware in /profile API and a new /sendconnection API
- Set the expiry of JWT token and cookies for 8 hours.
- Create Schema user method to getJWT()
- Create user Schema method to comparePasswords(passwordInputByUser)
-->  

<!--EP11 - Diving into APIs and express router
- Go and explore tinder APIs and Explore the data inside the APIs.
- Create a list of all APIs you can think of in devTinder.
- Group multiple routes under respective routers

- Read documentation for express.router
- Create routes folder for managing auth, profiles, requests routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js

- Create POST /logout API.
- Create PATCH /profile/edit API.
- Test all APIs.
- Create a PATCH /profile/password API --- Forgot password API.
- Make sure you validate all data in every POST, PATCH APIs.
-->  

<!--EP11 - Logical DB query & Compound Indexes
- Read about compound indexes in mongdb website -- article
- Read more about indexes in mongoDB
- Why do we need an index in DB?
- What are the advantages and disadvantages of creating indexes?
- WHat are the disadvantages of creating lot of indexes
- 
- Create a connectionRequestSchema
- Add proper validation
- Send connection Request API
- Proper validation of data 
- Think about all corner cases and handle them
- $or query and $and query in mongoDB - read more about all logical queries
- Schema.pre("save",function(next) {})
- ALWAYS THINK ABOUT CORNER CASES
-->  