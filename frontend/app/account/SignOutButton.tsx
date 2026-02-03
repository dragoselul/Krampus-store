"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Call logout endpoint to clear cookie
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      toast.success("Deconectare reușită!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Eroare la deconectare");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded transition-colors"
    >
      Deconectare
    </button>
  );
}
