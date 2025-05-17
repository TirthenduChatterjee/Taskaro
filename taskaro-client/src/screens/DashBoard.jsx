import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import DeleteDialog from '@/components/DeleteDialog';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import TaskAddEdit from '../components/TaskAddEdit';
const DashBoard = ({ allTask }) => {
    const dispatch = useDispatch();
    const Servertasks = useSelector(state => state.tasks.list);
    const taskStatus = useSelector(state => state.tasks.status);
    const token = JSON.parse(localStorage.getItem('userToken'));
    const navigate = useNavigate();
    const tasks = Servertasks
        .filter((task) => {
            if (allTask) return true;
            if (!task.createdFor) return false;
            const taskDate = parseISO(task.createdFor);
            const now = new Date();
            return (
                taskDate.getDate() === now.getDate() &&
                taskDate.getMonth() === now.getMonth() &&
                taskDate.getFullYear() === now.getFullYear()
            );
        })
        .map((task) => ({
            ...task,
            due: task.createdFor
                ? formatDistanceToNow(parseISO(task.createdFor), { addSuffix: true })
                : "No due date"
        }));

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
        console.log("Current taskStatus:", taskStatus); // Add this
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
        <Card className="flex-1 bg-background">
            <CardHeader>
                <CardTitle className={'text-2xl flex justify-between'}>
                    {allTask ? "All Tasks" : "Today's Tasks"}
                    {/* All Tasks */}

                    <TaskAddEdit edit={false} />
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
                                    <span className={`text-lg ${isCompleted ? "text-blue-700" :isPending?'text-blue-300':"text-blue-500"}`}>
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
