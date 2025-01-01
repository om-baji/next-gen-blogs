import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-react'
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const Signup: React.FC = () => {
    const { isLoaded, setActive, signUp } = useSignUp()
    const [email, setEmail] = useState("")
    const [isPending, setPending] = useState(false)
    const [error, setError] = useState("")
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return <div>Loading...</div>

        try {
            await signUp.create({ emailAddress: email })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            setPending(true)
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(JSON.stringify(error))
                setError(error.message)
            }
            setError(error as string)
            console.log("Unknown error ocuured", error)
        }
    }

    const handleVerify = async () => {
        try {
            const response = await signUp?.attemptEmailAddressVerification({
                "code": code
            })

            if (response?.status !== "complete") {
                throw new Error("Something went wrong!")
            }

            if (response?.status === "complete") {
                if (setActive) {
                    await setActive({ session: response.createdSessionId });
                    navigate("/home")
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(JSON.stringify(error))
                setError(error.message)
            }
            setError(error as string)
            console.log("Unknown error ocuured", error)
        }
    }

    const handleOauth = async () => {
        if (!isLoaded) return
        await signUp.authenticateWithRedirect({
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
                    {!isPending ? (
                        <form onSubmit={handleSignUp} className='flex flex-col gap-4 justify-center items-center'>


                            <Input placeholder='someone@xyz.com'
                                onChange={e => setEmail(e.target.value)}
                                id='email'
                                value={email}
                                required
                            />

                            <Button
                                disabled={isPending}
                                type="submit" className="w-full">
                                {isPending ? "Loading..." : "Sign up"}
                            </Button>

                        </form>
                    ) : (<div>
                        <form onSubmit={handleVerify} className="flex flex-col gap-4">

                            <Input placeholder='Enter OTP'
                                onChange={e => setCode(e.target.value)}
                                value={code}
                                required />

                            {error && (
                                <Alert variant={"destructive"}>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button type='submit'
                            >Verify Email</Button>

                        </form>

                    </div>)}
                    <Separator className='mt-4 mb-4' />
                    <p>or</p>
                    <Button
                        type="submit" className="w-full mt-2"
                        onClick={handleOauth}>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className='text-gray-500 text-sm text-center'
                    >Already have an account? <Link className="text-neutral-900 underline"
                        to={"/sign-in"}>Login</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup
