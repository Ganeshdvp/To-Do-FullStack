import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { SelectDropDown } from "./SelectDropDown";
import axios from "axios";
import { BASE_URL } from "@/utils/contants";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./ui/spinner";

export const EditForm = ({ id, task, status, priority, category }) => {
  const [editInput, setEditInput] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const [open, setOpen] = useState(false);

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


  // update logic
  const queryClient = useQueryClient();

  const saveEditTaskData = async (data)=>{
    try {
      const res = await axios.patch(BASE_URL + `/update-task/${id}`, data);
      return res.data;
    } catch (err) {
      return err;
    }
  }

  const {mutate, isPending, isError,error} = useMutation({
    mutationFn: saveEditTaskData,
    onSuccess: (res,updatedTask)=>{
      console.log(updatedTask)
      queryClient.setQueryData(['tasks'], (oldData)=>{
        return {
          ...oldData,
          data: oldData?.data?.map(item=> item._id === id ? {...item, ...updatedTask} : item)
        }
      })
      setOpen(false);
      toast.success("updated task successfully", {
                    style:{
                      background:'green',
                      color:'#ffff',
                      borderRadius:'10px',
                      fontSize:'12px',
                      width: "250px",
                      height:'40px'
                    }
                  });
    },
  })

  // handle submit logic
  const handleEditSubmit = async () => {
    const editTaskData = {
      task: editInput || task,
      status: editStatus || status,
      priority: editPriority || priority,
      category: editCategory || category,
    };
    // logic for edit
    mutate(editTaskData);
  };

  if(isError) return <p>{error.message}</p>


  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)} className="bg-white text-gray-500 hover:bg-gray-200 cursor-pointer">
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Make changes to your task here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="task-1">Task</Label>
                <Textarea
                  value={editInput || task}
                  onChange={(e) => setEditInput(e.target.value)}
                  id="task-1"
                  name="task"
                  className="border-2 border-gray-30 w-full rounded-md resize-none p-2 pl-3 mt-2 focus:border-gray-800"
                />
              </div>
              <div className="grid gap-3">
                <SelectDropDown
                  placeholder="Select Status"
                  title="Status"
                  options={statusData}
                  value={editStatus || status}
                  onChange={setEditStatus}
                />
              </div>
              <div className="grid gap-3">
                <SelectDropDown
                  placeholder="Select Priority"
                  title="Priority"
                  options={priorityData}
                  value={editPriority || priority}
                  onChange={setEditPriority}
                />
              </div>
              <div className="grid gap-3">
                <SelectDropDown
                  placeholder="Select Category"
                  title="Category"
                  options={categoryData}
                  value={editCategory || category}
                  onChange={setEditCategory}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="w-28 bg-[#d1dc00] text-black cursor-pointer hover:bg-[#f2ff00]"
                type="submit"
                onClick={handleEditSubmit}
              >
                {isPending ? <Spinner className="size-4 text-center" /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
