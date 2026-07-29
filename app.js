const express = require("express");
const timeRouter = require("./routes/timeRoutes");
const userRouter = require("./routes/userRouter");
const notFound = require("./middleware/not-found.js");
const baseError = require("./middleware/base-error.js");
const authenticationMiddleware = require("./middleware/authentication.js");
const taskRouter = require("./routes/taskRoutes.js");

const app = express();

global.user_id = null;
global.users = [];
global.tasks = [];

app.use(express.json());

app.use("/api", timeRouter);

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/testpost", (req, res) => {
  res.status(200).json({
    message: "POST route works",
  });
});


app.use("/api/tasks", authenticationMiddleware, taskRouter);


app.use(notFound);
app.use(baseError);



const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

module.exports = { app, server };
