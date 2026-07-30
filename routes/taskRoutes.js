const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.route("/")
  .get(taskController.index)
  .post(taskController.create);


router.route("/:id")
  .get(taskController.show)
  .patch(taskController.update)
  .delete(taskController.deleteTask)

module.exports = router;
