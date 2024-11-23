import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
  Input,
  Label,
  Button,
} from "@/components/index";
import { UserContext } from "@/contexts/UserContext";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn, "isLoggedIn");
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(user, "user");
  }, [user]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/signIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        setLoading(false);
        return toast.error(result.message || "Error occurred");
      }

      toast.success(result.message);
      setIsLoggedIn(true);
      setUser(result.user.username);
      // Persist state
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(result.user.username));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Error occurred");
    }
  };

  return (
    <section className="max-container">
      <Toaster position="top-right" reverseOrder={false} />
      <main className="flex justify-center items-center py-6">
        <Card>
          <CardHeader>
            <CardTitle>Great to see you back</CardTitle>
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
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
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
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </Label>
            </CardContent>
            <CardFooter className="flex justify-center items-center flex-col">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a href="/signup" className="font-semibold text-[#00c6ff]">
                  Sign Up
                </a>
              </p>
              <Button
                size="lg"
                variant="default"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </section>
  );
};

export default SignIn;
