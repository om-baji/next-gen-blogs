import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from "@/components/ui/separator"



const Signin: React.FC = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const [email, setEmail] = useState("")
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return
        try {
            setPending(true)
            const response = await signIn.create({
                identifier: email
            })

            if (response.status !== "complete") {
                setError("Something went wrong")
                return
            }

            if (response.status === "complete") {
                await setActive({ session: response.createdSessionId })
                console.log("Login success")
                navigate("/home")
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log(JSON.stringify(error))
                setError(error.message)
            }
            setError(error as string)
            console.log("Unknown error ocuured", error)
        } finally {
            setPending(false)
        }
    }

    const handleOauth = async () => {
        if(!isLoaded) return
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: window.location.origin,
            redirectUrlComplete: `${window.location.origin}/home`
        })
    }

    if (!isLoaded) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className="min-w-[25%]">
                <CardHeader>
                    <CardTitle className="flex justify-center p-4">
                        Notes Native
                    </CardTitle>
                    <CardDescription>
                        Next gen blog website!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className='flex flex-col gap-4 justify-center items-center'>


                        <Input placeholder='someone@xyz.com'
                            onChange={e => setEmail(e.target.value)}
                            id='email'
                            value={email}
                            required
                        />

                        <Button 
                        disabled={isPending}
                        type="submit" className="w-full">
                            {isPending ? "Loading..." : "Login" }
                        </Button>

                        {error && (
                            <Alert variant={"destructive"}>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                    </form>
                    <Separator className='mt-4 mb-4'/>
                    <p>or</p>
                    <Button
                    type="submit" className="w-full mt-2"
                    onClick={handleOauth}>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className='text-gray-500 text-sm text-center'
                    >New here? <Link className="text-neutral-900 underline"
                        to={"/sign-up"}>Sign Up</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signin
