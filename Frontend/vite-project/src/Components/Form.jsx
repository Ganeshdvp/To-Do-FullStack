import React, { useState } from "react";
import { SelectDropDown } from "./SelectDropDown";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "@/utils/contants";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

export const Form = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const statusData = [
    { value: "Pending" },
    { value: "Failed" },
    { value: "Completed" },
  ];

  const priorityData = [
    { value: "Hard" },
    { value: "Medium" },
    { value: "Easy" },
  ];

  const categoryData = [
    { value: "Management" },
    { value: "Design" },
    { value: "Developement" },
    { value: "Testing" },
    { value: "Deployment" },
    { value: "Learning" },
    { value: "Career" },
    { value: "Entertainment" },
    { value: "Goal" },
    { value: "Others" },
  ];



  // posting data to the db
  const postTask = async (newTask)=>{
    try{
      return await axios.post(BASE_URL + '/add-task', newTask)
    }
    catch(err){
      return err;
    }
  }
  const queryClient = useQueryClient();  // auto refetching when posted
  const {mutate, isPending} = useMutation({
    mutationFn: postTask,
    onSuccess: ()=>{                    // auto refetching when posted
      toast.success("Task has been added.", {
        style:{
          background:'#d1dc00',
          color:'#000',
          borderRadius:'10px',
          fontSize:'12px',
          width: "250px",
          height:'40px'
        }
      });
      queryClient.invalidateQueries({queryKey:['tasks']})
    },
    onError:()=>{
      toast.error("Failed to add task", {
        style:{
          background:'#d1dc00',
          color:'#000',
          borderRadius:'10px',
          fontSize:'12px',
          width: "250px",
          height:'40px'
        }
      });
    }
  })

  // handle submit logic
  const handleSubmit = async ()=>{
    if(!input || !status || !priority || !category) return;

    const newTaskData = {
      task: input,
      status: status,
      priority: priority,
      category: category
    }
    // main method to call the post.
    mutate(newTaskData);

    
      // clearing the fields
      setInput("");
      setStatus("");
      setPriority("");
      setCategory("");
  }

  return (
    <>
      <div className="flex flex-col gap-y-4 m-16 bg-gray-100 p-10">
        <h2 className="text-3xl font-semibold underline mb-6">To-Do Lists</h2>

        <div className="w-9/12 flex flex-col gap-y-4">
          <label>
            Task :
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter Your Task"
              className="border-2 border-gray-30 w-full rounded-md resize-none p-2 pl-4 mt-2 focus:border-gray-800"
            />
          </label>
          <div className="flex gap-x-2">
            <SelectDropDown
              placeholder="Select Status"
              title="Status"
              options={statusData}
              value={status}
              onChange={setStatus}
            />
            <SelectDropDown
              placeholder="Select Priority"
              title="Priority"
              options={priorityData}
              value={priority}
              onChange={setPriority}
            />
            <SelectDropDown
              placeholder="Select Category"
              title="Category"
              options={categoryData}
              value={category}
              onChange={setCategory}
            />
          </div>
        </div>
        <Button disable={isPending} onClick={handleSubmit} className="w-25 mt-6 cursor-pointer shadow-2xl bg-[#d1dc00] text-black hover:bg-[#ccd600] hover:scale-105">
          {isPending ? <Spinner className="size-4" /> : "ADD"}
        </Button>
      </div>
    </>
  );
};
