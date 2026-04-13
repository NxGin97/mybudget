import { useUserAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
    
export default function SignOut() {
    const { firebaseSignOut } = useUserAuth();
    const router = useRouter();
    
    const handleLogout = async () => {
        try {
            await firebaseSignOut();
            router.replace("/login")
        } catch (error) {
            console.error("Logout Failed: ", error);
        }
    };

    return(
        <button onClick={handleLogout} className="w-full border-2 border-[#911f1f] bg-[#b53535] opacity-100 text-white rounded-md px-2 right-align text-center hover:opacity-80 hover:cursor-pointer py-3 active:opacity-70">
            Sign out
        </button>
    )
}