import React, { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios from "axios"

const Login = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      
      const response= await axios.post('https://plivo-sgnh.onrender.com/api/auth/login',{email,password})

      const { token } = response.data

      localStorage.setItem("token", token)

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })

      window.location.href = "/dashboard"
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong"
      })
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[350px] shadow-xl">
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
