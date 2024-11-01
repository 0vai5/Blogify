import react, { useState } from "react";
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
const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:3000/auth/signUP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const data = await response.json();
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
                            New Here! Create an Account
                        </CardTitle>
                        <CardDescription>
                            Get the luxury to publish and read Blogs
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent>
                            <Label>
                                Username
                                <Input
                                    type="text"
                                    placeholder="Enter your Username"
                                    {...register("username", {
                                        required: true,
                                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                                    })}
                                />
                            </Label>
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
                            <p className="text-gray-400">Have an Account? <a href="/signin" className="font-semibold text-[#00c6ff]">SignIn</a></p>
                            <Button size="lg" variant="default">{loading ? "Signing Up..." : "Sign Up"}</Button>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </section>
    )
}

export default SignUp