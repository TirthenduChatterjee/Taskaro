import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Link, Navigate } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            const response = await axios.post('http://localhost:8000/api/users/register', {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password

            })

            console.log("Success:", response.data)
            if (response.data.token) {
            localStorage.setItem('userToken', JSON.stringify(response.data.token))
            Navigate('/today', { replace: true, state: { user: response.data.user} })
            }
            // Optionally redirect or show a message
        } catch (error) {
            console.error("Error during sign up:", error.response?.data || error.message)
        }
    }

    return (
        <div className='w-full flex min-h-screen items-center justify-center bg-background'>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className='text-center font-light text-4xl'>Welcome</CardTitle>
                    <CardDescription className='text-center text-sm font-light'>
                        Have an account? <Link className='text-foreground' to={'/'}>Login</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2.5">
                                <div className="flex gap-2.5 space-y-2.5">
                                    <Input id="firstName" placeholder="First Name" className='h-10' value={formData.firstName} onChange={handleChange} />
                                    <Input id="lastName" placeholder="Last Name" className='h-10' value={formData.lastName} onChange={handleChange} />
                                </div>
                                <Input id="email" placeholder="Email Address" className='h-10' value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-2.5">
                                <Input id="password" placeholder="Password" type="password" className='h-10' value={formData.password} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-2.5">
                                <Input id="confirmPassword" placeholder="Re Enter Password" type="password" className='h-10' value={formData.confirmPassword} onChange={handleChange} />
                            </div>
                        </div>
                        <CardFooter className="flex justify-center mt-4 px-0">
                            <Button type="submit" className='w-full bg-primary text-foreground hover:text-background'>Sign up</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp
