"use client";

import { useState } from "react";
import { useUserAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";
import BudgetLogo from "./BudgetLogo";


export default function SignUpForm() {
    const { user, emailSignUp, signOut, auth } = useUserAuth();
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        try {
            await emailSignUp(email, password);
            await signOut(auth);
            router.replace("../../home")
        }
        catch (error) {
            setErrorMessage(getFirebaseErrorMessage(error));
        }
    }
    
    const inputStyle= "w-full rounded-sm p-2 border border-gray-400 bg-[#60753e] my-2 opacity-80 h-10 placeholder-gray-800";

return (
    <section className="bg-[#c9d1c2] min-h-screen flex items-center justify-center">
        <BudgetLogo />
        <div className=" p-10">
        {!user && (
            <div className="w-[420px] mx-auto">
                <h2 className= "text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>
                <div className="flex flex-col">
                <form onSubmit={handleEmailSignUp} className="w-[420px] m-auto mb-4 rounded-xl border border-gray-300 p-4 bg-white">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${inputStyle} text-gray-800 bg-[#b8c49f]`}
                        />

                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputStyle} text-gray-800 bg-[#b8c49f]`}
                        />
                        {errorMessage && (<p className="text-red-500 text-sm mb-2">{errorMessage}</p>)}
                    <button className={`${inputStyle} bg-[#636B2F] opacity-100 text-gray-100 hover:opacity-80 active:opacity-60`} type="submit">Sign up</button>
                </form> 
            </div>
            <div className="flex flex-row justify-center gap-1 items-baseline font-semibold">
                <p className="text-center text-sm">Already have an account?</p>
                <button
                onClick={() => router.replace("/login")}
                className="text-sm text-[#1d2e0f] text-[#1d61bf] underline hover:text-[#f2f5f0] hover:cursor-pointer">Log in
                </button>
            </div>
            </div>
        )}
        </div>
    </section>
    );
}