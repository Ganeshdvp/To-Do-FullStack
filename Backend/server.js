import express from 'express';




const app = express();
const PORT = 3000;


// Routes Logic Here

app.get('/all-tasks', (req,res)=>{
    res.send("Get all tasks");
})

app.post('/add-task', (req,res)=>{
    res.send("Add a new task");
})

app.delete('/delete-task/:id', (req,res)=>{
    res.send(`Delete task with id ${req.params.id}`);
})






app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

