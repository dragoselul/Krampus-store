"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUpSchema, loginSchema } from "@/model/auth";

export default function AuthenticationForm({
  isSignup,
}: {
  isSignup: boolean;
}) {
  const [errors, setErrors] = useState<{ fieldName: string; message: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate with Zod
    const schema = isSignup ? signUpSchema : loginSchema;
    const validation = schema.safeParse(data);

    if (!validation.success) {
      setErrors(
        validation.error.issues.map((issue) => ({
          fieldName: issue.path[0]?.toString() || "form",
          message: issue.message,
        }))
      );
      setIsLoading(false);
      return;
    }

    if (isSignup) {
      // TODO: Call your Go backend signup endpoint
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Signup failed");
        }

        toast.success("Cont creat cu succes! Te poți autentifica acum.");
        router.push("/login");
      } catch (error: any) {
        toast.error(error.message || "Eroare la înregistrare");
        setErrors([{ fieldName: "form", message: error.message }]);
      }
      setIsLoading(false);
      return;
    }

    // Login - Call Server Action
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
        credentials: "include", // Important for cookies
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid credentials");
      }

      const result = await response.json();
      
      toast.success("Autentificare reușită! Bine ai venit!");
      router.push("/account");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Eroare de autentificare");
      setErrors([{ fieldName: "form", message: error.message }]);
    }

    setIsLoading(false);
  }

  const getFieldError = (fieldName: string) => {
    return errors.find(error => error.fieldName === fieldName)?.message;
  };

  const hasFieldError = (fieldName: string) => {
    return errors.some(error => error.fieldName === fieldName);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        {/* General form error */}
        {hasFieldError("form") && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {getFieldError("form")}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-bold mb-2 text-gray-700">
            Adresa de email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasFieldError("email") ? "border-red-500" : "border-gray-300"
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">Exemplu: email@gmail.com</p>
          {hasFieldError("email") && (
            <p className="text-red-500 text-sm mt-1">{getFieldError("email")}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block font-bold mb-2 text-gray-700">
            Parola <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasFieldError("password") ? "border-red-500" : "border-gray-300"
            }`}
          />
          <p className="text-sm text-gray-500 mt-1">
            Trebuie să conțină cel puțin o literă mare, un număr și un simbol.
          </p>
          {hasFieldError("password") && (
            <p className="text-red-500 text-sm mt-1">{getFieldError("password")}</p>
          )}
        </div>

        {/* Confirm Password (only on signup) */}
        {isSignup && (
          <div>
            <label htmlFor="confirmPassword" className="block font-bold mb-2 text-gray-700">
              Confirmă Parola <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                hasFieldError("confirmPassword") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasFieldError("confirmPassword") && (
              <p className="text-red-500 text-sm mt-1">{getFieldError("confirmPassword")}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          {isLoading ? "Se încarcă..." : isSignup ? "Înregistrează-te" : "Autentifică-te"}
        </button>
      </div>
    </form>
  );
}
