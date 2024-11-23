import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  CardFooter,
  Button,
} from "@/components";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/auth/signUP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setLoading(false);
      if (!response.ok) {
        toast.error(responseData.message || "Something went wrong.");
      }

        toast.success(responseData.message || "Sign Up successful!");
        window.location.replace = "/signin";
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error occurred!");
    }
  };

  return (
    <section className="max-container">
      <Toaster position="top-right" reverseOrder={false} />
      <main className="flex justify-center items-center py-6">
        <Card>
          <CardHeader>
            <CardTitle>New Here! Create an Account</CardTitle>
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
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_]{3,20}$/,
                      message: "Invalid username format",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </Label>
              <Label>
                Email
                <Input
                  type="email"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </Label>
              <Label>
                Password
                <Input
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </Label>
            </CardContent>
            <CardFooter className="flex justify-center items-center flex-col">
              <p className="text-gray-400">
                Have an Account?{" "}
                <a href="/signin" className="font-semibold text-[#00c6ff]">
                  SignIn
                </a>
              </p>
              <Button size="lg" variant="default" type="submit">
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </section>
  );
};

export default SignUp;
