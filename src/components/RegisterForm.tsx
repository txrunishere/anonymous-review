"use client";

import { FC, useState } from "react";
import { Button, Input, Label } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegisterForm } from "@/types";
import { userRegisterSchema } from "@/schema/user.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: registerFormError, isSubmitting },
  } = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
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
      setError((error as any).response.data.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleRegisterForm)}>
          <section className="flex gap-5 flex-col">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                placeholder="alex.here"
                type="text"
                {...register("username")}
              />
              <div className="w-[200px] md:w-auto m-auto">
                {registerFormError.username && (
                  <p className="text-center text-red-500 text-sm font-medium">
                    {registerFormError.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="xyz@gmail.com"
                type="email"
                {...register("email")}
              />
              <div>
                {registerFormError.email && (
                  <p className="text-center text-red-500 text-sm font-medium">
                    {registerFormError.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                placeholder="Alexa$12"
                type="password"
                {...register("password")}
              />
              <div className="w-[200px] md:w-auto m-auto">
                {registerFormError.password && (
                  <p className="text-center text-red-500 text-sm font-medium">
                    {registerFormError.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Submit
            </Button>
          </section>
          <p className="mt-2 text-center ">
            Already a User?{" "}
            <Link className="text-blue-600 hover:underline" href={"/login"}>
              Sign in
            </Link>
          </p>
        </form>
        {error && (
          <p className="text-center mt-4 font-medium text-red-500">{error}</p>
        )}
      </div>
    </>
  );
};

export default RegisterForm;
