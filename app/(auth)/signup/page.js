
"use client";

import SignUpForm from "@/components/SignUpForm";
import { useUserAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignInPage() {
    const { user } = useUserAuth(); 
    const router = useRouter();

    useEffect(() => {
        if(user) {
            router.replace("/home");
        }
    }, [user, router]);

  return (
    <main className="bg-[#c9d1c2] min-h-screen">
        <SignUpForm />;
    </main>
  )
}