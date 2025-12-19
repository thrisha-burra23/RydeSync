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

function SignUpPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const appwriteAccount = new AppwriteAccount()

    function handleLogInNavigate() {
        navigate("/login")
    }

    async function handleUserRegistration() {
        const result = await appwriteAccount.createAppwriteAccount(email, password, fullName);
        console.log(result);
        if(result.status){
            navigate("/login")
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register to your account</CardTitle>
                    <CardDescription>
                        Enter your details to register a new account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={handleLogInNavigate}>Log In</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    onChange={() => setFullName(event.target.value)}
                                    id="fullName"
                                    type="text"
                                    placeholder="e.g., Sundeeep Dasari"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={() => setEmail(event.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    onChange={() => setPassword(event.target.value)}
                                    id="password"
                                    type="password"
                                    placeholder="******"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleUserRegistration} className="w-full">
                        Register
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign Up with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}



export default SignUpPage;