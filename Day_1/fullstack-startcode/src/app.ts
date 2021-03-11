import express from "express";
import dotenv from "dotenv";
import path from "path"

dotenv.config()

const app = express()

// Something has to go in here
//app.use('/static', express.static('public')
app.use(express.static(path.join(process.cwd(), "public"))) // Så man kan tilgå filer udefra

 
app.get("/demo", (req, res) => {
    const a = 124;
    console.log(a);  
  res.send("Server is up");
})

export default app;
/* 
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server started, listening on PORT: ${PORT}`))
 */
