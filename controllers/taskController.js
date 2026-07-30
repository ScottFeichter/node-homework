const taskCounter = (() => {
  let lastTaskNumber = 0;
  return () => {
    lastTaskNumber += 1;
    return lastTaskNumber;
  };
})();


const newTask = () => {
  const id =  taskCounter(),
  const userId = req.user_id.id,
  const email = req.user_id.email,
  ...value,
};



const createTask = (req, res) => {

  const newTask = newTask()
  global.tasks.push(newTask);
}

const readTask = (req, res) => {
  const task = global.tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

const updateTask = (req, res) => {
  const taskIndex = global.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  global.tasks[taskIndex] = {
    ...global.tasks[taskIndex],
    ...req.body,
  };

  res.json(global.tasks[taskIndex]);
};

const deleteTask = (req, res) => {
  const taskIndex = global.tasks.findIndex(
    (t) => t.id === parseInt(req.params.id)
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  global.tasks.splice(taskIndex, 1);

  res.json({ message: "Task deleted" });
};


module.exports = { createTask, readTask, updateTask, deleteTask, indexTask}
