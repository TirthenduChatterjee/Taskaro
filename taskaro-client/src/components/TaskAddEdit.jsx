import React, { useState,useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { Label } from "./ui/label"
import { Plus, CalendarIcon, SquarePen } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils" // adjust path if needed
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { addTask, fetchTasks, updateTask } from "@/redux/taskSlice"
const TaskAddEdit = ({ edit, Task }) => {
  const dispatch = useDispatch();

  const [task, setTask] = useState(
    edit
      ? {
        _id: Task?._id,
        title: Task?.title || "",
        description: Task?.description || "",
        status: Task?.status || "pending",
        priority: Task?.priority || "medium",
        createdFor: Task?.createdFor ? new Date(Task.createdFor) : null,
      }
      : {
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        createdFor: null,
      }
  );
  useEffect(() => {
    if (edit && Task) {
      setTask({
        _id: Task._id,
        title: Task.title || "",
        description: Task.description || "",
        status: Task.status || "pending",
        priority: Task.priority || "medium",
        createdFor: Task.createdFor ? new Date(Task.createdFor) : null,
      });
    } else if (!edit) {
      setTask({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        createdFor: null,
      });
    }
  }, [edit, Task]);

  // edit && console.log('task', task)
  const handleChange = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }))
  }
  const handleSubmit = async () => {
    try {
      dispatch(addTask(task))
      toast.success("Task added successfully")
      // toast("Task added successfully")
      dispatch(fetchTasks())
      setTask({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        createdFor: null,
      })
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message)
    }
  }

  const handleEdit = async (id,task) => {
    console.log('task', task)
    console.log('id', id)
    try {
      dispatch(updateTask({id,updatedData:task})).unwrap()
        .then(() => {
          toast.success("Task updated successfully");
                dispatch(fetchTasks())
        }).catch((error) => {
          toast.error("Error updating task:", error);
        });
      setTask({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        createdFor: null,
      })
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message)
    }
  }
  return (
    <Dialog >
      <DialogTrigger asChild>
        {edit ?
          <Button variant="icon" size="sm" className=" cursor-pointer">
            <SquarePen />
          </Button> :

          <Button variant="outline" size="icon" className={'cursor-pointer'}>
            <Plus className="h-5 w-5" />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className=" max-w-full lg:max-w-[500px] ">
        <DialogHeader>
          <DialogTitle>{edit ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogDescription>Fill in the task details and click {edit ? 'Edit Task' : 'Add Task'}.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 space-y-3">
          <div className="grid gap-2">
            {/* <Label htmlFor="title">Title</Label> */}
            <Input
              id="title"
              value={task.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              className={"h-12"}
            />
          </div>

          <div className="grid gap-2">
            {/* <Label htmlFor="description">Description</Label> */}
            <Textarea
              id="description"
              value={task.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter task description"
              className={"h-24"}
            />
          </div>
          <div className="flex justify-between px-4">
            <div className="flex gap-6 pl-2">
              <Label>Status</Label>
              <Select
                value={task.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-6 pl-2">
              <Label>Priority</Label>
              <Select
                value={task.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            {/* <Label>Due Date</Label> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal h-12",
                    !task.createdFor && "text-muted-foreground"
                  )}
                >
                  {task.createdFor ? format(task.createdFor, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={task.createdFor}
                  onSelect={(date) => handleChange("createdFor", date)}
                  disabled={(date) =>
                    date < new Date("1900-01-01") || date > new Date("2100-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={edit ? ()=>handleEdit(task._id,task) : handleSubmit} className={'bg-[#7638f8] text-white cursor-pointer hover:text-accent'}>{edit ? 'Edit Task' : 'Add Task'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskAddEdit
