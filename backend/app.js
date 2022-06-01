const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

  //using middlewares
  app.use(express.json({limit:'50mb'}))
  app.use(express.urlencoded({limit:'50mb', extended:true}))
  app.use(cookieParser())


  //importing routes
  const post = require("./routes/post")
  const user = require("./routes/user")
  const story = require("./routes/story")


  //using Route

  app.use("/api/v1", post)
  app.use("/api/v1", user)
  app.use("/api/v1", story)


module.exports = app;