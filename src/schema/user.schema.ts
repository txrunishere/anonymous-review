import { z } from "zod";

export const userRegisterSchema = z.object({
  username: z
    .string({ error: "username must be string!!" })
    .min(3, "username must be atleast 3 letters long")
    .max(20, { error: "username not be more than 20 letters" })
    .regex(/^[a-zA-Z0-9._~-]{3,20}$/, "username is in invalid format"),
  email: z
    .string({ error: "email must be string" })
    .email({ error: "invalid email format" }),
  password: z
    .string({ error: "password must be in string" })
    .min(8, "password must be atleast 8 letters long")
    .max(30, "password mot be more than 30 letters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
});

export const userLoginSchema = z.object({
  email: z
    .string({ error: "email must be string" })
    .email({ error: "invalid email format" }),
  password: z
    .string({ error: "password must be in string" })
    .min(8, "password must be atleast 8 letters long")
    .max(30, "password mot be more than 30 letters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
});
