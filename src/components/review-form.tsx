"use client";

import { FC, useState } from "react";
import { Button, Input } from "./";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { IAxiosErrorReturn } from "@/types";

export const ReviewForm: FC<{ username: string }> = ({ username }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const [error, setError] = useState<string>("");

  const handleReviewForm: SubmitHandler<{ content: string }> = async ({
    content,
  }) => {
    try {
      const res = await axios.post(`/api/message/${username}`, {
        content,
      });

      if (res.data.success) return;
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
    <div className="mx-4">
      <form onSubmit={handleSubmit(handleReviewForm)}>
        <div className="flex gap-2">
          <Input placeholder="write a review..." {...register("content")} />
          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
        </div>
      </form>
      {error && (
        <p className="text-center mt-4 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
