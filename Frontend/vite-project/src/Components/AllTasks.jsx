import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/utils/contants";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeUI } from "./BadgeUI";
import { BadgeAlert, CircleCheckBig, CircleX, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { EditForm } from "./EditForm";
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner";

export const AllTasks = () => {

  let count = 1;

  // fetching all tasks
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return axios.get(BASE_URL + "/all-tasks");
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // delete logic
  const queryClient = useQueryClient();
  const deleteTask = async (id)=>{
    try{
      const res = await axios.delete(BASE_URL + `/delete-task/${id}`);
      return res.data;
    }
    catch(err){
      return err;
    }
  }
  const {mutate} = useMutation({
    mutationFn: deleteTask,
    onSuccess: (_,id)=>{
      queryClient.setQueryData(['tasks'], (oldData)=>{
        return {
        ...oldData,
        data: oldData.data.filter(task => task._id !== id),
      };
      })
      toast.error("Deleted task successfully", {
              style:{
                background:'red',
                color:'#ffff',
                borderRadius:'10px',
                fontSize:'12px',
                width: "250px",
                height:'40px'
              }
            });
    }
  })
  const handleDelete = async (id)=>{
    mutate(id)
  }

  

    if (isLoading) return <Skeleton className="text-center ml-14 h-30 w-[90%]" />;
    if (isError) return <p className="text-center">{error.message}</p>;


    const options = (value) => {
    switch (value) {
      case "Pending":
        return <BadgeUI value={value} className="bg-gray-50 text-gray-600" icon={<BadgeAlert/>} />;
      case "Failed":
        return <BadgeUI value={value} className="bg-red-50 text-red-600" icon={<CircleX/>} />;
      case "Completed":
        return <BadgeUI value={value} className='bg-blue-50 text-green-600' icon={<CircleCheckBig/>} />;
      case "Easy":
        return <BadgeUI value={value} className='bg-blue-50 text-blue-400'/>;
      case "Medium":
        return <BadgeUI value={value} className='bg-yellow-50 text-yellow-600'/>;
      default:
        return <BadgeUI value={value} className='bg-purple-50 text-purple-600'/>;
    }
  };

  return (
    <>
      <div className="m-18">
        {
          data?.data?.length > 0 ? <Table>
          <TableHeader>
            <TableRow className="text-[15px]">
              <TableHead className="w-30 text-center">S.No</TableHead>
              <TableHead className="w-120 text-start">Task</TableHead>
              <TableHead className="w-30 text-center">Status</TableHead>
              <TableHead className="w-30 text-center">Priority</TableHead>
              <TableHead className="w-40 text-center">Category</TableHead>
              <TableHead className="w-50 text-center">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className='text-center'>{count++}</TableCell>
                <TableCell className='text-start'>{item.task}</TableCell>
                <TableCell className='text-center'>{options(item.status)}</TableCell>
                <TableCell className='text-center'>{options(item.priority)} </TableCell>
                <TableCell className='text-center'>{item.category}</TableCell>
                <TableCell className='text-center'>{item.createdAt}</TableCell>
                <div className="ml-6 flex">
                  <EditForm id={item._id} task={item.task} status={item.status} priority={item.priority} category={item.category} />
                  <Button onClick={()=> handleDelete(item._id)} className='bg-white text-gray-500 hover:bg-gray-200 cursor-pointer'><Trash2Icon/></Button>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table> : ""
        }
      </div>
    </>
  );
};
