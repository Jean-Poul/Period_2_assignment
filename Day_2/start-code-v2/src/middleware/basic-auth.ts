import auth from 'basic-auth'
import compare from 'tsscmp'

import { Request, Response } from "express"
import facade from "../facades/DummyDB-Facade"
// import { isRef } from 'joi'

const authMiddleware = async function (req: Request, res: Response, next: Function) {
    // Finds user and pass from request
    const credentials = auth(req)
    // If I do not await here the statement will be true long before i get the user info
    if (credentials && await check(credentials.name, credentials.pass, req)) {
        next()
    } else {
        // Makes the browser throw the pop up window to be able to verify user / password
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        res.end('Access denied')
    }
}

// Basic function to validate credentials 
// I use req: any because the Request object does not have a credential property
// I could make an interface that extends from Request and add my property but here it is easier to use any
async function check(name: string, pass: string, req: any) {
    const user = await facade.getFriend(name)
    // If user was found
    if (user && compare(pass, user.password)) {
        // If I want roles in the future I can add a role in my DummyDB (friends array)
        req.credentials = { userName: user.email, role:"user"}
        return true
    }
    // If no user were found
    return false
}

export default authMiddleware;

