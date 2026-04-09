"use client";

// Import the useUserAuth hook
import { useState } from "react";
import { useUserAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/app/utils/firebaseErrors";

import ReturnHome from "../../components/ReturnHome";

export default function Home() {
    // Use the useUserAuth hook to get the user object email sign up
    const { user, emailSignUp, signOut, auth } = useUserAuth();
    const router = useRouter();

    //set error messages that may be 'caught' during handling
    const [errorMessage, setErrorMessage] = useState("");

    //email and password form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        try {
            await emailSignUp(email, password);
            await signOut(auth);
            //prevents user from being 'logged in' right after creation
            router.replace("/week-10")
        }
        catch (error) {
            setErrorMessage(getFirebaseErrorMessage(error));
        }
    }
    
    const inputStyle= "w-full rounded-sm p-2 border border-gray-400 bg-violet-100 my-2 opacity-80 h-10";

return (
    <main className="bg-violet-100 py-10 min-h-screen">
    <div className=" p-10">
      {/* If user is NOT logged in */}
        {!user && (
            <section>
            <h2 className= "text-center text-3xl font-bold m-6">Sign Up</h2>
            <div className="flex flex-col">
                <form onSubmit={handleEmailSignUp} className="w-[420px] m-auto mb-4 rounded-xl border border-gray-300 p-4 bg-white">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputStyle}
                        />

                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyle}
                        />
                        {errorMessage && (<p className="text-red-500 text-sm mb-2">{errorMessage}</p>)}
                    <button className={`${inputStyle} bg-violet-700 opacity-100 text-gray-100 hover:opacity-80 active:opacity-60`} type="submit">Sign up</button>
                </form> 
            </div>
            <div className="flex flex-row justify-center gap-1 items-baseline">
                <p className="text-center text-sm">Already have an account?</p>
                <button
                onClick={() => router.replace("/week-10")}
                className=" text-sm text-blue-600 underline hover:text-blue-400 hover:cursor-pointer">Sign in
                </button>
            </div>
            </section>
        )}
        </div>
        <ReturnHome />
    </main>
    );
}