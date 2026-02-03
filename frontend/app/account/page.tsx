import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

// TODO: Replace with actual user data fetch from your Go backend
async function getUserFromToken(token: string) {
  try {
    // Call your Go backend to verify token and get user info
    const response = await fetch("http://backend:8080/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
}

export default async function AccountPage() {
  const authCookie = cookies().get("auth");

  if (!authCookie) {
    redirect("/account/authenticate");
  }

  // Fetch user data from your Go backend
  const user = await getUserFromToken(authCookie.value);

  if (!user) {
    redirect("/account/authenticate");
  }

  // Get initials for avatar
  const getInitials = (name: string | undefined, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  const initials = getInitials(user.name, user.email);

  return (
    <div className="max-w-3xl mx-auto py-40 px-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex flex-col gap-6">
            {/* User Header */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {initials}
              </div>
              
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">Bine ai venit!</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Account Info */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Informații cont</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Nume:</span>
                  <span className="text-gray-900">{user.name || "Nesetat"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                {user.createdAt && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Membru din:</span>
                    <span className="text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString("ro-RO")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Order History Section (optional) */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Comenzile mele</h2>
              <p className="text-gray-500">Nu ai încă comenzi plasate.</p>
              {/* TODO: Add order history here */}
            </div>

            <hr className="border-gray-200" />

            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
