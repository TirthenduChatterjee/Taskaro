import React, { useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email: formData.email,
        password: formData.password
      })

      console.log('Login success:', response.data)
      // For example, save token or user info here
      // localStorage.setItem('token', response.data.token)

      // Redirect after login
      if (response.data.token) {
        localStorage.setItem('userToken', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
        navigate('/today', { replace: true, state: { user: response.data.user } })
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message)
      setError(err.response?.data?.message || 'Login failed')
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      navigate('/today', { replace: true })
    }
  }, [])
  return (
    <div className='w-full flex items-center justify-center bg-background min-h-screen'>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className='text-center font-light text-4xl'>Welcome Back</CardTitle>
          <CardDescription className='text-center text-sm font-light'>
            Don't have an account yet? <Link className='text-foreground' to={'/signup'}>Sign up</Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2.5">
                <Input
                  id="email"
                  placeholder="Enter Email"
                  className='h-10'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2.5">
                <Input
                  id="password"
                  placeholder="Enter Password"
                  type="password"
                  className='h-10'
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <CardFooter className="flex mt-4 px-0">
              <Button type="submit" className='w-full bg-primary text-foreground hover:text-background'>Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
