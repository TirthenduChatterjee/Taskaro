import React from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
const DeleteDialog = ({ onConfirm, taskTitle }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="icon" size="sm" className=" transition-all cursor-pointer ">
                    <Trash2 className="text-red-600" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete <strong>{taskTitle}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" className='cursor-pointer' variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>                    
                    <Button className='bg-red-500 hover:bg-text cursor-pointer' onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>)
}

export default DeleteDialog