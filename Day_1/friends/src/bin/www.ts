import app from '../app'

import d from 'debug'

const debug = d('www');

const PORT = process.env.PORT || 3333;
console.log(PORT);

app.listen(PORT, () => debug(`Server started..\n listening on PORT: ${PORT}`))
