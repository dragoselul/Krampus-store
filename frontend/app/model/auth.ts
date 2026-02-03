import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Email invalid"),
    password: z
      .string()
      .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
      .regex(/[A-Z]/, "Lipsă literă mare")
      .regex(/\d/, "Lipsă cifră")
      .regex(/[\W_]/, "Lipsă simbol"),
    confirmPassword: z.string().min(1, "Confirmă parola"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolele nu se potrivesc",
    path: ["confirmPassword"], // This sets the error on confirmPassword field
  });

export const loginSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(1, "Parola este obligatorie"),
});

export type AuthenticationActionState = {
  form?: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  errors?: { fieldName: string; message: string }[];
};
