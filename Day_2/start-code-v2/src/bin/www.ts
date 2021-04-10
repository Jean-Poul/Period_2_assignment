// TypeScript way
/* import app from '../app'
import d from 'debug'
const debug = d('www'); */

import app from "../app"
const debug = require("debug")("www");

// debug.enabled = true
// console.log(debug);

const PORT = process.env.PORT || 3333;
console.log(PORT);

app.listen(PORT, () => debug(`Server started..\n listening on PORT: ${PORT}`))
