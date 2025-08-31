"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAxiosErrorReturn, IRegisterForm } from "@/types";
import { userRegisterSchema } from "@/schema/user.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors: registerFormErrors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userRegisterSchema),
  });
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const handleRegisterForm: SubmitHandler<IRegisterForm> = async ({
    email,
    password,
    username,
  }) => {
    try {
      const res = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        push("/login");
      }
    } catch (error) {
      const err = error as AxiosError<IAxiosErrorReturn>;
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="z-10 relative hidden md:block">
            <Image
              src="/20943394.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="p-6 md:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="me.here"
                  {...register("username")}
                />
                {registerFormErrors.username && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {registerFormErrors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {registerFormErrors.email && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {registerFormErrors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {registerFormErrors.password && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {registerFormErrors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Register
              </Button>
              {error && (
                <p className="text-center text-sm font-medium text-red-500">
                  {error}
                </p>
              )}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
