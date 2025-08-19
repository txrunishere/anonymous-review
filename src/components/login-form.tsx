"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm } from "@/types";
import { userLoginSchema } from "@/schema/user.schema";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors: loginFormErrors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userLoginSchema),
  });
  const [error, setError] = useState<string>("");
  const { push } = useRouter();

  const handleLoginForm: SubmitHandler<ILoginForm> = async ({
    email,
    password,
  }) => {
    try {
      const res = await axios.post("/api/login", { email, password });

      if (res.data.success) {
        toast.success(res.data.message);
        push("/");
      }
    } catch (error) {
      setError((error as any).response.data.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(handleLoginForm)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {loginFormErrors.email && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {loginFormErrors.email.message}
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
                {loginFormErrors.password && (
                  <p className="text-center text-sm font-medium text-red-500">
                    {loginFormErrors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                Login
              </Button>
              {error && (
                <p className="text-center text-sm font-medium bg-red-500">
                  {error}
                </p>
              )}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="z-10 relative hidden md:block">
            <img
              src="/20943394.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
