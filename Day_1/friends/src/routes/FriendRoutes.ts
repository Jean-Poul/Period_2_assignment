// Node / JavaScript way
// var express = require('express')
// var router = express.Router()

// TypeScript way
import { Router } from 'express'
const router = Router()

// Input validation from Mosh video
// Node / JavaScript way
// const Joi = require('joi');
// TypeScript way
import Joi from 'joi'


import facade from '../facades/DummyDB-Facade';
import { IFriend } from '../interfaces/IFriend';

/**
 * GET METHOD for all
 */
router.get("/all", async (req, res) => {
    // Example with .then() since it is a promise
    // facade.getAllFriends()
    // .then(data => res.send(data));

    const getAllFriends: Array<IFriend> = await facade.getAllFriends()
    // Making a DTO to be able to hide some information for the user
    const friendsDTO = getAllFriends.map(friend => {
        const {firstName, lastName} = friend;
        return {firstName: firstName, lastName: lastName}
    })
    // res.json(getAllFriends)
    if (!getAllFriends)
        return res.status(404).send("No friends were found."); // 404 - object not found
    res.send(friendsDTO)
});

/**
* GET METHOD with parameter
*/
// /:id is the parameter to read it use req.params.id
router.get("/:email", async (req, res) => {
    const getFriend: IFriend | null = await facade.getFriend(req.params.email);
    // res.json(getFriend)
    if (!getFriend)
        return res.status(404).send(`The friend with the given email: ${req.params.email} was not found.`); // 404 - object not found
    res.send(getFriend);
});

// Other example with DTO
router.get("/findby-username/:userid", async (req, res, next) => {
    const userId = req.params.userid;
   
    const friend = await facade.getFriend(userId);
    if (friend == null) {
      throw new Error("user not found")
    }
    const { firstName, lastName, email } = friend;
    const friendDTO = { firstName, lastName, email }
    res.json(friendDTO);
  })
  


/**
 * POST METHOD
 */
router.post("/", async (req, res) => {
    const friend = {
        id: `${facade.friends.length + 1}`,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    // Error handling for input
    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const addFriend: IFriend | null = await facade.addFriend(friend);
    // res.json(addFriend)
    if (!addFriend)
        return res.status(404).send("Something went wrong - was not able to add a friend"); // 404 - object not found

    res.send(addFriend);
});

/**
 * DELETE METHOD - delete on id
 */
router.delete("/:email", async (req, res) => {
    const deleteFriend: IFriend | null = await facade.deleteFriend(req.params.email);
    // res.json(deleteFriend)
    if (!deleteFriend)
        return res.status(404).send(`The friend with the given email: ${req.params.email} was not found.`); // 404 - object not found

    // Delete friend from array
    let index: number = facade.friends.indexOf(deleteFriend);
    facade.friends.splice(index, 1);
    res.send(deleteFriend);
});

/**
 * PUT METHOD - update a friend
 */
 router.put("/:id", async (req, res) => {
    const updateF = await facade.updateFriend(req.params.id);
    if (!updateF) return res.status(404).send(`The friend with the given email: ${req.params.email} was not found.`);

    const { error } = validateFriend(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    updateF.firstName = req.body.firstName;
    updateF.lastName = req.body.lastName;
    updateF.email = req.body.email;
    updateF.password = req.body.password;
    res.send(updateF);
});


/**
 * Validate friend input
 */ 
function validateFriend(friend: IFriend) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(6).required()
    };

    return Joi.validate(friend, schema);
}

export default router;