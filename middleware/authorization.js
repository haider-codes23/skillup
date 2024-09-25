function adminAuthorization (req, res, next) {
  if (req.session.user && req.session.user.role === "Admin") {
    return next();
  } else {
    return res.status(401).json({message: "you dont have the authorization, only logged In Admin have the permission"});
  }
}


function learnerAuthorization (req, res, next) {
  if (req.session.user && req.session.user.role === "Learner") {
    return next();
  } else {
    res.status(401).json({message: "you dont have the authorization, only logged in Learner have the authorization"});
  };
};

function instructorAuthorization (req, res, next) {
  if (req.session.user && req.session.user.role === "Instructor") {
    return next();
  } else {
    res.status(401).json({message: "you dont have the authorization, only logged in Instructors have the authorization"});
  };
};

module.exports = {
  adminAuthorization,
  instructorAuthorization,
  learnerAuthorization
};