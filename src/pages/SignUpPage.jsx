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
import { useNavigate } from "react-router"
import AppwriteAccount from "../appwrite/AccountServices"


export function SignUpPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const appwriteAccount = new AppwriteAccount()

  function handleToTheLogin() {
    navigate('/login')
  }

  async function handleRegisterUser() {
      const result = await appwriteAccount.createAppwriteAccount(email,password,userName)
      if(result.status){
        navigate("/login")
      }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>SignUp to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleToTheLogin}>Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Entre your name"
                value={userName}
                onChange = {() => setUserName(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value = {email}
                onChange={() => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

              </div>
              <Input id="password" type="password"  value={password} onChange={() => setPassword(event.target.value)}required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleRegisterUser}>
          SignUp
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}


export default SignUpPage