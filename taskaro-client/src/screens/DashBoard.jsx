import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import DeleteDialog from '@/components/DeleteDialog';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import TaskAddEdit from '../components/TaskAddEdit';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const DashBoard = ({ allTask }) => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);
    const Servertasks = useSelector(state => state.tasks.list);
    const taskStatus = useSelector(state => state.tasks.status);
    const [statusFilter, setStatusFilter] = useState("all"); // New state
    const token = JSON.parse(localStorage.getItem('userToken'));
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState("date");
    const taskDates = Servertasks
        .filter(task => task.createdFor)
        .map(task => parseISO(task.createdFor));

    const filteredTasks = Servertasks
        .filter((task) => {
            const taskDate = task.createdFor ? parseISO(task.createdFor) : null;
            const now = new Date();

            if (!allTask) {
                if (!taskDate) return false;
                return (
                    taskDate.getDate() === now.getDate() &&
                    taskDate.getMonth() === now.getMonth() &&
                    taskDate.getFullYear() === now.getFullYear()
                );
            }

            // If date filter is selected on the All Tasks page
            if (allTask && selectedDate && taskDate) {
                return (
                    taskDate.getDate() === selectedDate.getDate() &&
                    taskDate.getMonth() === selectedDate.getMonth() &&
                    taskDate.getFullYear() === selectedDate.getFullYear()
                );
            }

            return true;
        })
        .filter((task) => {
            const taskDate = task.createdFor ? parseISO(task.createdFor) : null;
            const now = new Date();

            if (statusFilter === "expired") {
                return taskDate && taskDate < now && task.status.toLowerCase() !== "completed";
            }

            if (statusFilter === "all") return true;
            return task.status.toLowerCase() === statusFilter;
        });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOption === "priority") {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortOption === "date") {
            const aDate = a.createdFor ? new Date(a.createdFor) : new Date(0);
            const bDate = b.createdFor ? new Date(b.createdFor) : new Date(0);
            return aDate - bDate;
        }
        return 0;
    });

    const tasks = sortedTasks.map((task) => ({
        ...task,
        due: task.createdFor
            ? formatDistanceToNow(parseISO(task.createdFor), { addSuffix: true })
            : "No due date"
    }));
    const taskCounts = {
        all: Servertasks.length,
        completed: Servertasks.filter(t => t.status.toLowerCase() === 'completed').length,
        pending: Servertasks.filter(t => t.status.toLowerCase() === 'pending').length,
        'in progress': Servertasks.filter(t => t.status.toLowerCase() === 'in progress').length,
        expired: Servertasks.filter(t => {
            const due = t.createdFor ? parseISO(t.createdFor) : null;
            return due && due < new Date() && t.status.toLowerCase() !== 'completed';
        }).length
    };

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
        console.log("Current taskStatus:", taskStatus);
        if (taskStatus === 'idle') {

            dispatch(fetchTasks());
        }
    }, [taskStatus, dispatch]);
    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId))
            .unwrap()
            .then(() => {
                toast.success("Task deleted successfully");
            })
            .catch((error) => {
                toast.error("Error deleting task:", error);
            });
    }
    return (
        <Card className="flex-1 bg-background overflow-y-auto hide-scrollbar

">
            <CardHeader>
                <CardTitle className={'text-2xl flex justify-between'}>

                    {allTask ? "All Tasks" : "Today's Tasks"}

                    <div className="flex items-center gap-6">

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Date</SelectItem>
                                    <SelectItem value="priority">Priority</SelectItem>
                                </SelectContent>
                            </Select>
                            {allTask && (
                                <div className="flex items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <div className="flex flex-col items-end pb-2 pr-1.5">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    initialFocus
                                                    modifiers={{ taskDays: taskDates }}
                                                    modifiersClassNames={{ taskDays: "bg-primary text-white rounded-full" }}
                                                />

                                                {selectedDate && (
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => setSelectedDate(null)}
                                                        className="text-red-500 text-xs"
                                                    >
                                                        Clear
                                                    </Button>

                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="all">
                                        <SelectTrigger className="w-[220px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All <span className='text-primary'>({taskCounts.all})</span></SelectItem>
                                            <SelectItem value="completed">Completed <span className='text-primary'>({taskCounts.completed})</span></SelectItem>
                                            <SelectItem value="pending">Pending <span className='text-primary'>({taskCounts.pending})</span></SelectItem>
                                            <SelectItem value="in progress">In Progress <span className='text-primary'>({taskCounts['in progress']})</span></SelectItem>
                                            <SelectItem value="expired">Expired <span className='text-primary'>({taskCounts.expired})</span></SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>)
                            }
                        </div>

                        <TaskAddEdit edit={false} />

                    </div>

                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {tasks.map((task) => {
                        const isCompleted = task.status.toLowerCase() === "completed"
                        const isPending = task.status.toLowerCase() === "pending"
                        const borderColor = "border-primary"
                        // isCompleted
                        //     ? "border-blue-600"
                        //     : task.priority === "high"
                        //         ? "border-red-600"
                        //         : task.priority === "medium"
                        //             ? "border-amber-400"
                        //             : "border-green-400"

                        const priorityTextColor = task.priority === "high"
                            ? "text-red-600"
                            : task.priority === "medium"
                                ? "text-amber-400"
                                : "text-green-400"

                        return (
                            <Card key={task._id} className={`shadow-sm border bg-gradient-to-br from-background to-card ${borderColor} group cursor-pointer`}>
                                <CardHeader>
                                    <CardTitle className={`text-lg ${isCompleted ? "line-through" : ""}`}>
                                        {task.title}
                                    </CardTitle>
                                    <CardDescription className={isCompleted ? "line-through" : ""}>
                                        Due {task.due} •{" "}
                                        <span className={`${priorityTextColor} font-medium`}>
                                            Priority: {task.priority}
                                        </span>
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between">
                                    <span className={`text-lg ${isCompleted ? "text-blue-700" : isPending ? 'text-blue-300' : "text-blue-500"}`}>
                                        {task.status}
                                    </span>
                                    <div className="flex">
                                        <TaskAddEdit edit={true} Task={{ ...task }} />
                                        <DeleteDialog onConfirm={() => handleDelete(task._id)} taskTitle={task.title} />
                                    </div>
                                </CardFooter>
                            </Card>)
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashBoard;
