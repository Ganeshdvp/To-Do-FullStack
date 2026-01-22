import mangoose from "mongoose";

const taskSchema = new mangoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // validate(value){
      //   if(!['pending','completed','failed'].includes(value)){
      //     throw new Error("status data is not valid!")
      //   }
      // }
    },
    priority: {
      type: String,
      required: true,
      // validate(value){
      //   if(!['Hard','Medium','Easy'].includes(value)){
      //     throw new Error("priority data is not valid!")
      //   }
      // }
    },
    category: {
      type: String,
      required: true,
    },
    // validate(value){
    //     if(!['Management','Design','Development','Testing','Deployment','Learning','others','entertainment','goal'].includes(value)){
    //       throw new Error("category data is not valid!")
    //     }
    // }
  },
  { timestamps: true },
);

const Task = mangoose.model("Task", taskSchema);

export default Task;
