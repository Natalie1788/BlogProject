import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./resourses/users.routes.js"
import postRouter from "./resourses/post.routes.js"
import lastRouter from "./resourses/lastContent.routes.js"
dotenv.config();


const app = express();
const port = 3000;



// Middleware
app.use(cors());
app.use(bodyParser.json());

/*const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};*/

// api routes
app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", lastRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});