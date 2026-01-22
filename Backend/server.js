import express from "express";
import connectDB from "./Config/database.js";
import Task from "./models/tasks.js";
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


// middleware to parse JSON bodies
app.use(express.json());

// middleware to enable communication between the cilent and server
app.use(cors());

// API Routes
app.get('/all-tasks', async (req,res)=>{
    try{
      const alltasks = await Task.find({});
      res.send(alltasks);
    }
    catch(err){
      return res.status(500).send("Error fetching tasks")
    }
})

// get request to fetch a single task by id
app.get('/task/:id', async (req,res)=>{
    const taskId = req.params.id;
    
    try{
      const task = await Task.findById(taskId);
      res.send(task);
    }
    catch(err){
      return res.status(500).send("Error fetching task");
    }
})

// post request to add a task
app.post("/add-task", async (req, res) => {

  const newTask = req.body;
  const task = new Task(newTask);

  try{
    await task.save();
    res.send("Task added successfully");
  }
  catch(err){
    return res.status(500).send("Error saving task");
  }
});

// delete request to delete a task
app.delete('/delete-task/:id', async (req,res)=>{
    const taskId = req.params.id;

    try{
      const deletedOne = await Task.findByIdAndDelete(taskId);
      res.send("Task deleted successfully");
    }
    catch(err){
      return res.status(500).send("Error deleting task");
    }
})

// update request to update a task
app.patch('/update-task/:id', async (req,res)=>{
  const taskId = req.params.id;
  const data = req.body;

  try{
    await Task.findByIdAndUpdate(taskId, data);
    res.send("Task updated successfully");
  } 
  catch(err){
    return res.status(500).send("Error updating task");
  }
})






// Connet to Database and Start Server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
