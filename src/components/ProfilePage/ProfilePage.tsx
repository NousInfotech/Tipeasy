import { logoutUser } from "@/services/firebase/auth";
import React from "react";
import Cookie from "js-cookie"
import { useRouter } from "next/navigation";


interface ProfilePageProps {
    username: string;
    email: string;
    phoneNumber: string;
    role: "admin" | "superadmin";
}

const ProfilePage: React.FC<ProfilePageProps> = ({
    username,
    email,
    phoneNumber,
    role,
}) => {

    const router = useRouter();


    const handleLogout = async () => {
        await logoutUser();
        Cookie.remove("userUID")
        router.push('/login')
    }

    return (
        <div className="bg-gray-50 p-6 max-w-md mx-auto mt-10 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Profile Details</h2>

            <div className="text-gray-700 text-sm space-y-2">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {phoneNumber}</p>
                <p><strong>Role:</strong> {role}</p>
            </div>

            <button
                onClick={handleLogout}
                className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
