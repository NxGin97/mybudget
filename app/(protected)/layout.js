"use client";

import { useUserAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({children}) {
    const {user, loading} = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className= "flex justify-center items-center h-screen"> 
                <p> Checking authentication... </p>
            </div>
        )
    }

    if(!user) return null;
    return<> {children}</>
}