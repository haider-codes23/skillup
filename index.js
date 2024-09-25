const express = require("express");
const sequelize = require("./database");
//const associations = require('./models/associations');
const user = require('./routes/user');
const course = require('./routes/course');
const enrollemnt = require('./routes/enrollment');
const Lessons = require('./routes/lesson');
const feedback = require('./routes/feedback');
const instructor = require('./routes/instructor');
const categories = require('./routes/category');
const login = require('./routes/login');
const logout = require('./routes/logout');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize express app
const app = express();

// Mounting express.json middleware onto the request processing pipeline
app.use(express.json());

// Initialize session storage in mysql with sequelize
const sessionStore = new SequelizeStore({
  db: sequelize
});

//configure session middleware
app.use(session({
  secret: "12345", // session secret is used to create a hash to sign the session id cookie, it prevents the cookie to be tempered with 
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24// expiration of 1 day
  }
}));

sessionStore.sync()
  .then(() => console.log("Session store synced with Database"))
  .catch((err) => console.log(err + "error syncing session store with database"));

// Define Routes
app.use("/api/users", user);
app.use("/api/courses", course);
app.use("/api/enrollment", enrollemnt);
app.use('/api/lessons', Lessons);
app.use('/api/feedbacks', feedback);
app.use('/api/instructors', instructor);
app.use('/api/categories', categories);
app.use('/api/login', login);
app.use('/api/logout', logout);

// Sync database and start server
sequelize.sync({force: false})
  .then(() => console.log("Database synced with sequelize models"))
  .catch(err => console.log("Error syncing sequelize with the database", err));

// starting the server
app.listen(3000, () => console.log("server is listening on port 3000"));

