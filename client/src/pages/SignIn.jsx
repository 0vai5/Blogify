import react, { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardDescription,
    CardFooter,
    Input,
    Label,
    Button
} from "@/components/index"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";
import { GlobalContext } from "@/contexts/GlobalContext";
const SignIn = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    const [loading, setLoading] = useState(false)
    const { setUser, setIsLoggedIn } = useContext(GlobalContext)


    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/auth/signIN", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const data = await response.json();
            setUser = data.user.username;
            setIsLoggedIn(true);
            setLoading(false)
            toast.success(data.message)
        } catch (error) {
            setLoading(false)
            toast.error(data.message)
        }
    }
    return (
        <section className="max-container">
            <Toaster position="top-right" reverseOrder={false} />
            <main className="flex justify-center items-center py-6">
                <Card>
                    <CardHeader>
                        <CardTitle >
                            Great to see you back
                        </CardTitle>
                        <CardDescription>
                            Get access to your existing blogs and interesting profiles
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                            <Label>
                                Email
                                <Input
                                    type="text"
                                    placeholder="Enter your Email"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                    })}
                                />
                            </Label>
                            <Label>
                                Password
                                <Input
                                    type="password"
                                    placeholder="Enter your Password"
                                    {...register("password", {
                                        required: true
                                    })}
                                />
                            </Label>
                        </CardContent>
                        <CardFooter className="flex justify-center items-center flex-col">
                            <p className="text-gray-400">Don't have an Account? <a href="/signup" className="font-semibold text-[#00c6ff]">SignUp</a></p>
                            <Button size="lg" variant="default">{loading ? "Signing In..." : "Sign In"}</Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </section>
    )
}

export default SignIn