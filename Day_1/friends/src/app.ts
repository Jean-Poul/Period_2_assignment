import express from "express";
import dotenv from "dotenv";
import path from "path"

// import FriendsFacade from './facades/DummyDB-Facade';
// import facade from './facades/DummyDB-Facade';

import friendRoutes from "./routes/FriendRoutes";

dotenv.config()  // Loads environment variables

const app = express()

// Adding a piece of middleware
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//Singleton facade
//const facade = new FriendsFacade();

// Something has to go in here
//app.use('/static', express.static('public')
app.use(express.static(path.join(process.cwd(), "public"))) // So I can access files from the outside

app.use("/api/friends", friendRoutes)

/**
 * GET METHOD for test
 */
app.get("/demo", (req, res) => {
  const demo = 369;
  console.log(demo);
  res.send("Server is up");
})


/**
 * GET METHOD for all
 */
/* app.get("/api/friends", async (req, res) => {
  const getAllFriends = await facade.getAllFriends();
  // res.json(getAllFriends)
  if (!getAllFriends)
    return res.status(404).send("No friends were found."); // 404 - object not found
  res.send(getAllFriends)
}); */


/**
 * GET METHOD with parameter
 */
// /:id is the parameter to read it use req.params.id
/* app.get("/api/friends/:email", async (req, res) => {
   const getFriend = await facade.getFriend(req.params.email);
  if (!getFriend)
    return res.status(404).send("The friend with the given email was not found."); // 404 - object not found
  res.send(getFriend);
}); */


/**
 * POST METHOD
 */
/* app.post("/api/friends", async (req, res) => {
  const friend = {
    id: `${facade.friends.length + 1}`,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }

  const addFriend = await facade.addFriend(friend);

  if (!addFriend)
  return res.status(404).send("Something went wrong - was not able to add a friend"); // 404 - object not found


  res.send(addFriend);
}); */

/**
 * DELETE METHOD - delete on id
 */
/*  app.delete("/api/friends/:email", async (req, res) => {

  const deleteFriend = await facade.deleteFriend(req.params.email);

  if (!deleteFriend)
    return res.status(404).send("The friend with the given email was not found."); // 404 - object not found

    res.send(deleteFriend);

 }); */

export default app;

/*
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server started, listening on PORT: ${PORT}`))
 */
