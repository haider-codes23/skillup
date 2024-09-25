# skill up Project Guide

# Setting up Mysql database

## Creating a new Conncetion

![Screenshot from 2024-09-17 16-12-49.png](skill%20up%20Project%20Guide%20aeeca3e10b424f3caa7ceb36a8531bd3/Screenshot_from_2024-09-17_16-12-49.png)

## Data Modelling

### Building a Conceptual Model

- Identify the entities, attributes associated with those entities, and the relationship between them.
    - User: represents the people who interact with the platform
        - user_id
        - name
        - email
        - password
        - role
        - created_at(timestamp when the user registered)
        - updated_at(timestamp for when the user profile was updated)
    - Course: represent courses offered by instructors
        - course_id
        - title
        - description
        - category
        - price
        - is_published
        - created_at(timestamp when the course was created)
        - updated_at(timestamp when the course was last updated)
    - Lessons: represents individual lessons that belong to courses
        - lesson_id
        - title
        - content: could be text or video
        - duration in minutes
        - order: order of lesson in the course
        - created_at(Timestamp for when the lesson was created )
        - updated_At(Timestamp for when the lesson was last updated)
    - Enrollment: Tracks the courses learner have enrolled in
        - enrollment_id
        - user_id: foreign key referencing user entity
        - course_id: foreign key referencing Course entity
        - enrollement_date: Date when the user enrolled
        - progress: A percentage values representing how much of the course user has completed
        - is_complete: Boolean value indicating if the course has been completed
    - Instructor: represents users who are instructors and offer courses
        - instructor_id
        - user_id: foreign key referencing the user entity
        - bio: instructor biography
        - rating: rating of instructor based of student feedback
    - feedback: represents feedbacks & reviews for courses from learners
        - feedback_id: PK
        - user_id: FK referencing User entity
        - course_id: FK referencing Course entity
        - rating: Rating out of 5 given by user
        - comment: text feedback provided by learner
        - submitted_at(Timestamp for when the feedback was submitted)
    - Categories: represents categories under which courses are organized
        - category_id: PK
        - name
        - description: short description
    
    Relationship between enitites
    
    1. User to Course: ONE-TO-MANY —> A `User` (who is an instructor) can create multiple `Course`s, but a `Course` can only belong to one `User` (the instructor). Foreign key: `User.user_id` in `Course` (as `instructor_id`)
    2. Course to Lesson: **One-to-Many**: A `Course` contains multiple `Lesson`s, but each `Lesson` belongs to only one `Course`. Foreign key: `Course.course_id` in `Lesson`
    3. User to Enrollment: **Many-to-Many**: A `User` (learner) can enroll in many `Course`s, and each `Course` can have many learners enrolled. This is implemented via the `Enrollment` entity. Foreign keys: `User.user_id` and `Course.course_id` in `Enrollment`.
    4. User to Feedback: **One-to-Many**: A `User` (learner) can give feedback to multiple `Course`s, but each feedback entry belongs to one user. Foreign key: `User.user_id` in `Feedback`
    5. Course to Feedback: **One-to-Many**: A `Course` can have multiple feedback entries, but each feedback entry belongs to one `Course`. Foreign key: `Course.course_id` in `Feedback`
    6. Course to Category: **Many-to-One**: Many `Course`s can belong to a single `Category`, but each `Category` can have many `Course`s. Foreign key: `Category.category_id` in `Course`
    
    ![Screenshot from 2024-09-17 19-08-37.png](skill%20up%20Project%20Guide%20aeeca3e10b424f3caa7ceb36a8531bd3/Screenshot_from_2024-09-17_19-08-37.png)
    

### Building a Logical Model

- Create a logical model which includes the everything in the conceptual model plus the data structures required to store the data associated with those attributes e.g. String, integer, float and so on, Note that logical models are independent of any database technologies, so we dont specify the data types e.g. VARCHAR or CHAR
    
    ![Screenshot from 2024-09-17 19-32-58.png](skill%20up%20Project%20Guide%20aeeca3e10b424f3caa7ceb36a8531bd3/Screenshot_from_2024-09-17_19-32-58.png)
    

### Building a Physical Model

- Building an implementation for MYSQL Database Management System, includes primary keys, foreign keys, and the data types for each attribute or column
    
    ![Screenshot from 2024-09-18 13-06-40.png](skill%20up%20Project%20Guide%20aeeca3e10b424f3caa7ceb36a8531bd3/Screenshot_from_2024-09-18_13-06-40.png)
    

## Getting the App ready

1. Created a package.json file for structuring and establishing the behavior of the app
2. Install required libraries
    1. express
    2. sequelize
    3. mysql2
    4. config
    5. express-session
    6. connect-express-session
    7. bcrypt

## Configuring Sequelize with MySQL

1. First, we install the sequelize and mysql2 packages in our app
2. Then we load the sequelize package in our app, using the require function, which will return us the Sequelize Constructor function. This constructor function is the entry point for using sequelize to interact with the database.
3. We use this constructor function to create an instance of type Sequelize
4. A constructor function is used to create instances of a class with predefined properties, so when we call this function we pass it some properties e.g. 
    1. database name: the name of the database you want to connect to 
    2. username: MySQL user that has access to this database e.g root
    3. password: the password for the MySQL user e.g. root or 12345
    4. A configurations option object that contains properties like 
        1. host: This specifies the host address of the database e.g. [localhost](http://localhost) or 127.0.0.1 which refers to the MYSQL server running on the same machine as the application. If our database is on a remote server we would provide a server’s IP address or domain name here.
        2. port: MySQL server can be configured to listen on different ports, if you're working in a production environment, it might be listening on a non-default port, and the default port on which the MySQL server listens is 3306, if we don't provide a default port e.g. 3306 sequelize will connect using the default port 3306, so if you have configured MYSQL Server to listen on a different port e.g. 3307 you must explicitly set it. 
        3. dialect: This is used to specify to sequelize the type of database we are using e.g. MySQL, PostgreSQL, SQLite.  
        4. logging: By default sequelize logs all the SQL queries it generates. Setting logging to false disables logging. If you want to see the SQL queries in the console, set logging to console.log.
5. Once we have configured sequelize with MySQL we need to authenticate the d connection to ensure the connection to the database is working properly. So we use the instance returned by the constructor function, to invoke the authenticate() method, this step ensures that the sequelize instance can connect to the MySQL database and that your instance is correctly configured. It avoids issues later when you try to define or query models without a working connection.

## Defining models for user, enrollment, course, lesson, feedback, instructor, category

1. Next, we should use the very instance that we used for authenticating to define models using the define() method, it takes two arguments a singular name for the table that the model represents and as a second argument, we pass the Attributes object where we define the attributes of each model. Each key in the object represents a column name, and the value is an object that describes the datatype and constraints for that column.

```jsx
const {DataTypes} = require('sequelize');
const sequelize = require('../database');

// define a course model

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    alloweNull: false
  },
  name: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  email: {
    type: DataTypes.STRING,
    alloweNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    alloweNull: false
  },
  role: {
    type: DataTypes.ENUM("Learner", "Instructor", "Admin"),
    alloweNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    alloweNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    alloweNull: true
  },
}, {timestamps: false});

module.exports = User;
```

## Creating Associations

Next, we need to define the associations between the entities and ensure the models are properly imported and associated before syncing. Failing to import a model with relationships can prevent Sequelize from correctly defining foreign key constraints.

## Syncing the Models with MySQL DB

The next step is to synchronize the models with the database using the sequelize instance, so we invoke a method called sync() using the sequelize instance it is responsible for creating tables in the database based on the models. However, if our models are defined in separate modules and we are not using them anywhere e.g. in our routes, sequelize will be unaware of their existence therefore it doesn’t create the corresponding tables. So what we need to do is export those models from their modules and then import them in our route modules and then synchronous them as well this action will create the corresponding tables, and when we import them they will be processed and used in some part of the application.

## Defining Routes for user, enrollment, course, lesson, feedback, instructor, category for creating, reading, updating, and deleting

```jsx
// Create an endpoint for getting all user
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
      res.status(500).send(error.message);
  };
});
```

## Validating incoming request data

### Express-validator

- It provides us with a middleware for validating and sanitizing user input in express apps. It ensures that incoming request data is correct, clean, and safe before it reaches our route handler.
- It has some key features
    - Validation: It allows us to validate incoming data, e.g. check if the field is required, if an email is in the correct format, if a string meets the length requirement, etc
    - Senitization:  we can also sanitize inputs by trimming white space, converting strings to lowercase/uppercase
    - Schema-Based Validation: this allows us to define validation and sanitization rules for multiple fields.
    - Handling Validation results: It provides us with a function called validationResult(), it gathers the result of the validation and checks whether any error occurred.

### Using Express-validator

1. Then we create schemas for validation, it is used to define validation rules for the fields e.g. constraints for fields. Schemas are necessary for ensuring that the data being passed into the back-end meets the expected criteria, e.g. we define requirements for each field e.g. type, length, allowNull, primaryKey, autoIncrement. It prevents invalid data from entering your database
2. Then we use the Express-Validator library which provides us a function called `checkSchema()` for comparing the data in the body of the request against the Schema, as an argument we pass it a schema. It ensures that incoming requests adhere to the defined validation schema before hitting the actual route handler, rejecting requests that don't conform to your rules and returning errors to the client. So we place this checkSchema() as a middleware before the appropriate route handlers. 
    
    ```jsx
    // Create an endpoint for adding a new user
    router.post('/', checkSchema(userValidationScehma) ,async (req, res) => {
      
      try {
        const result = validationResult(req);
        console.log(result);
        if (!result) return res.status(400).send({error: result.array()});
        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          created_at: new Date(),
        });
        res.status(201).json(user);
      } catch(error) {
          res.status(400).send(error.message);
      };
      
    });
    ```
    
3. Next, we use the express-validator library which has another function called `validatorResult()`, which is used to collect any validation errors that occur. When we call it returns a result that contains the validation errors. It ensures that only valid requests pass to the next stage.

## Implementing Express-Sessions

### Cookies

- A cookie is a small piece of data usually an object, that our server sends to the client or browser.
- So when we send a request to e.g post /api/login, the server authenticates the user and will send a cookie as a response to the browser or postman from where we sent that login request, the web browser then stores the cookie until the cookie expires(a cookie has a maxAge property that we can set in milli sec). Now whenever a request is made the browser will send this cookie on every request we make to the server. The cookie contains a sessionId that the server can use to look up in the database and identify the user.
- The reason why this is important is because HTTP is stateless, and the restful services exposed on the server are stateless as well they don't store any client context or session information between requests, so whenever a request is made the server doesn’t know who that request is coming from, who the user is, it knows nothing.
- The server sends a cookie to the client when the client is Authenticated, and tells the client that when I send a cookie to you, you(client) need to send this cookie back to me(server), in order for you(client) to make future request to access endpoints at all, and when the client makes any further request the server checks for cookies and if the cookie contains the valid data, only then the server will send data back to the user that the user requested. So using the cookie the server can identify the user(client).

### What is a session, why do we need them, the difference between sessions and cookies, and how do sessions work and express-session

- A session is a series of browser requests that come from the same client during a time period. A **session** in web development refers to a series of interactions (or requests) between a user (client) and a server that occurs within a specific time period. It’s a way to store data across multiple HTTP requests. Since HTTP is a stateless protocol (meaning each request is independent of the others), a session allows you to maintain a state (e.g., user login status, shopping cart data) between requests coming from the same client.
- The reason why we need sessions is to add persistence to our app. Client and server communicate using the HTTP protocol which is potentially stateless, so after each request and response cycle the client and server forget everything about each other, if we want the client and server to remember each other we use sessions. Sessions contain data about the client allowing the server to keep track of the user
- Both cookies and sessions store data about the user, the difference is cookies are stored on the browser, and sessions are stored in the database to which the server has access.
- When a user is logged in or when the user sends their first request to the server, the express-session middleware on the server generates a session and stores it in the database, the server then responds with a header property called set-cookie to the client to set a cookie that contains the session’s unique id or we can say the cookie references the session. This cookie is then sent to every subsequent request to the server. The server then looks up the sessionId in the cookie and then looks up the saved session data which is stored in the database to identify the user.
- We can use the library express-session which creates session middleware to handle sessions in express, express-sessions handles everything for us e.g. creating sessions, setting the session cookie, and creating the session object on the request object. As a session use a cookie to store an id, so we need to create a cookie when we create a session. With express-session version 1.17.0 we do not need the cookie-parser middleware at express-sessions parse the cookies itself.

### Express-sessions

- When we require it, it returns a function that we use to create session middleware and configure session middleware. We invoke this function called session() to configure the session middleware function, we pass it a configuration options object as arg, e.g. the object contains properties like a secret, store, resave, saveUninitialized, and a cookie. It returns a middleware that manages sessions e.g. this middleware attaches a session object to the request
- The config options object contains different properties
    - Secret: It can be a string or an array, it is used to sign the sessionId cookie so that no one can modify the session data on the client side.
    - saveUninitialized: It is set to a boolean value and determines whether sessions that are new but not yet modified should be saved to the store.
    - store: Its type is sessionStore object such as connect-session-sequelize or connect-mongo etc. It specifies the storage mechanism for session data. By default, express-session uses an in-memory store, which is not suitable for production. Instead, we should use a session store that saves data to the database. e.g `new SequelizeStore({db: sequelize})`, by setting store property to this, configures express-session middleware to store sessions in your SQL database using Sequelize, it creates a session store that connects to your database using sequelize
    - cookie: Its type is an object, it defines the options for cookies, that is sent to the client. The sessionID is stored in the cookie, and the server uses it to identify the user’s session. We can also set the max-age property of the cookie in milliseconds

### Connect-session-sequelize

- When we import it using the require function, it is a middleware that integrates Sequelize with express-session. This allows us to store session data in the SQL database using Sequelize.  It uses Sequelize to interact with the database and stores session data in a specified SQL database.
- so we load this library using the require function, it returns us a function, and we call that function and pass it [session.Store](http://session.Store) as argument. The [sessions.Store](http://sessions.Store) is a built-in class from the express-session package that defines the default session store, by passing it session.Store we are telling connect-session-sequelize to extend the session store functionality so that session data can be saved in the database via Sequelize instead of in the memory. This require function returns us a constructor function of a class that we can use to create an instance of session store, which is backed by both sequelize and the database. When we are setting the configuration on express-session middleware function, it has a property called store, we can set it to an instance of this class when invoking this constructor function we pass it an object that contains a property called db, here we specify the Sequelize instance that the store will use to interact with the database, we set it to the instance called sequelize that we used to configure and connect our MySQL database, this instance knows the database username, password, and other configs details