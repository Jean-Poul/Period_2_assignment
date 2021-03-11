/**
 * Imports
 */

// Joi module for validatin client input
// A class is returned
const Joi = require("joi"); // npm i joi
// Express module - returns a functions
const express = require("express"); // npm i express
// To call the express function (returns an object of type express)
// By convention this is called app
const app = express();

// Addind a piece of middleware
app.use(express.json());

// Simulating a database of objects
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

/**
 * GET METHODS (route handler)
 */

app.get("/", (req, res) => {
  res.send("Hello World from express");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// /:id is the parameter to read it use req.params.id
app.get("/api/courses/:id", (req, res) => {
  //res.send(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found."); // 404 - object not found
  res.send(course);
});

// To have several parameters /:year/:month
// This way I can get all the posts to a given month in a given year
// Route parameters are used for essential of required values
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params); // .year and .month to read the parameters
});

// Query string gets added by adding a ? after the url (query string parameter) -> ex: ?sortBy=name
// Is used to provide additional data to my backend service
// Query string parameters are used for anything that is optional
// To read the query type req.query
// Query parameters are stored in an object with key: value pairs
/* app.get("/api/posts/:year/:month", (req, res) => {
      res.send(req.query);  // reading query string
    }); */

/**
 * POST METHOD (route handler)
 */

app.post("/api/courses", (req, res) => {
  // A schema defines the shape of our objects
  // properties and types
  /**
   *  line 71-90 has been moved to the validateCourse function
   */
  /*  const schema = {
    name: Joi.string().min(3).required()
  };

  // validate() function returns an object. validate only works with patch @13.1.0
  const result = Joi.validate(req.body, schema);
  // console.log(result);

  // Without the use of Joi
  // if (!req.body.name || req.body.name.length < 3) {
  // With Joi
  if (result.error) {
    // Restful convention is to send a status code 400 back to the client (Bad request)
    // res.status(400).send(result.error);
    // Or can be done more specific
    res.status(400).send(result.error.details[0].message);
    // Without Joi
    // .send("Name is required and should be minimum 3 characters.");
    return; // return here because the rest of the application should not run further
  } */

  const { error } = validateCourse(req.body); // result.error the same as { error }. I am using destructuring

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    // making an object since I am not using a database atm.
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

/**
 *  PUT METHOD (route handler)
 */
// See POST method for more notes
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404 - resource not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found."); // 404 - object not found

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // result.error the same as { error }. I am using destructuring

  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  // Return the updated course to the client
  res.send(course);
});

/**
 * DELETE method
 */
app.delete("/api/courses/:id", (req, res) => {
  // Look up course
  // Not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found."); // 404 - object not found

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

/**
 * Validate function so I don't have repeating code
 */

function validateCourse(course) {
  // A schema defines the shape of our objects
  // properties and types
  const schema = {
    name: Joi.string().min(3).required()
  };

  // validate() function returns an object. validate only works with patch @13.1.0
  return Joi.validate(course, schema);
}

/**
 * Dynamic Port
 */
// When you deploy the port is dynamicly assigned by the hosting environment
// Environment variable (PORT) to make port dynamic
// Use global object process to access port
// To set an environment variable in windows use set/export PORT="theportnumber"
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
