"use client";

import { FC, useState } from "react";
import axios from "axios";
import { Button, Input, Label } from "./";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginForm } from "@/types";
import { userLoginSchema } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const LoginForm: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors: loginFormError },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userLoginSchema),
  });
  const [error, setError] = useState<string>("");

  const { push } = useRouter();

  const handleUserLogin: SubmitHandler<ILoginForm> = async ({
    email,
    password,
  }) => {
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        push("/");
      }
    } catch (error) {
      setError((error as any).response.data.message);
      console.log((error as any).response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUserLogin)}>
        <section className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              {...register("email")}
              placeholder="xyz@gmail.com"
              type="email"
            />
            <div>
              {loginFormError.email && (
                <p className="text-center text-xs font-medium text-red-500">
                  {loginFormError.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              {...register("password")}
              placeholder="Alexa$12"
              type="password"
            />
            <div className="w-[200px] md:w-auto m-auto">
              {loginFormError.password && (
                <p className="text-center text-xs font-medium text-red-500">
                  {loginFormError.password.message}
                </p>
              )}
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            className="cursor-pointer"
            type="submit"
          >
            Submit
          </Button>
        </section>
        <p className="text-center mt-2">
          Not a User?{" "}
          <Link href={"/register"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
      {error && (
        <p className="text-center mt-4 font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default LoginForm;
