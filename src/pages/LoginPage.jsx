import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router"
import AppwriteAccount from "../appwrite/AccountServices"

export function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const appwriteAccount = new AppwriteAccount

  const navigate = useNavigate()
  function handleToTheRegister() {
    navigate('/register')
  }

  const handleLoginUser = async (email , password) => {
    
    try {
      const result = await appwriteAccount.loginUser(email, password)

      if(result){
        navigate('/dashboard')
      }

    } catch (error) {
      console.log(error);
      alert("the error occured while login with appwrite")
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleToTheRegister}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={() => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" value={password} onChange={() => setPassword(event.target.value)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={() => handleLoginUser(email, password)}>
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}


export default LoginPage