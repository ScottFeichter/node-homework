const { taskSchema, patchTaskSchema } = require("../validation/taskSchema");

const taskCounter = (() => {
  let lastTaskNumber = 0;
  return () => {
    lastTaskNumber += 1;
    return lastTaskNumber;
  };
})();


const newTask = (value) => {

  return {
    title: value.title,
    id: taskCounter(),
    isCompleted: value.isCompleted ?? false,
    userId: global.user_id.email
  }

};



const index = (req, res) => {
  const userTasks = global.tasks.filter(
      (task) => task.userId === global.user_id.email,
      ).map(({ userId, ...task }) => task);

      if (userTasks.length === 0) return res.status(404).json({ message: "No tasks found" });


      res.json(userTasks);
  };


const create = (req, res) => {

  const { error, value } = taskSchema.validate(req.body, { abortEarly: false });

  if(error) return res.status(400).json({errors: error.details.map(detail => detail.message)})

  const task = newTask(value);

  global.tasks.push(task);
  const { userId, ...taskResponse } = task;
  res.status(201).json(taskResponse);
}



const show = (req, res) => {
  const task = global.tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(400).json({ message: "Task not found" });
  }
  res.json(task);
};



const update = (req, res) => {

  const { error, value } = patchTaskSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error)
    return res.status(400).json({
      errors: error.details.map((detail) => detail.message),
    });


  const taskIndex = global.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (global.tasks[taskIndex].userId !== global.user_id.email) {
  return res.status(403).json({ message: "Forbidden" });
}


  global.tasks[taskIndex] = {
  ...global.tasks[taskIndex],
  ...value,
};



  const { userId, id, ...taskResponse } = global.tasks[taskIndex];
    res.json(taskResponse);
};

const deleteTask = (req, res) => {
  const taskIndex = global.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (global.tasks[taskIndex].userId !== global.user_id.email) {
  return res.status(403).json({ message: "Forbidden" });
}


  global.tasks.splice(taskIndex, 1);

  res.json({ message: "Task deleted" });
};


module.exports = { create, show, update, deleteTask, index}
