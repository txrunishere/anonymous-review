"use client";

import { FC, useState } from "react";
import { Button, Input } from "./";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

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

      if (res.data.success) console.log(res);
    } catch (error) {
      setError((error as any).response.data.message);
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
