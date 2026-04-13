"use client";

import { useState } from "react";
import { useUserAuth } from "@/contexts/authContext";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";
import BudgetLogo from "./BudgetLogo";

export default function Home() {
    const { gitHubSignIn, googleSignIn, emailSignIn } = useUserAuth();

    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
        await emailSignIn(email, password);
        } catch (error) {
        setErrorMessage(getFirebaseErrorMessage(error));
        }
    };

    const handleLogin = async (provider) => {
        try {
        await provider();
        } catch (error) {
        setErrorMessage(getFirebaseErrorMessage(error));
        }
    };

    const buttonStyle = "relative flex justify-center bg-white w-[420px] m-auto border-1 border-solid border-[#60753e] opacity-80 p-2 rounded-md my-2";
    const iconStyle = "absolute left-4 top-2.5 text-lg text-black ";
    const inputStyle= "w-full rounded-sm p-2 border border-gray-400 bg-[#60753e] my-2 opacity-80 h-10 placeholder-gray-800";

    return (
        <section className="bg-[#c9d1c2] min-h-screen flex items-center justify-center">
            <BudgetLogo />
            <div className="w-[420px] mx-auto">
                <h2 className= "text-3xl font-bold mb-6 text-gray-800">Login</h2>
                <div className="flex flex-col">
                    <form onSubmit={handleEmailLogin} className="w-[420px] m-auto mb-7 rounded-xl border border-gray-300 p-4 bg-white">
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
                        <button className={`${inputStyle} bg-[#60753e] opacity-100 text-gray-100 hover:opacity-80 active:opacity-60`} type="submit">Sign in</button>
                    </form> 
                    <p className="text-center mb-3 text-gray-800"> or </p>
                    <div className={buttonStyle}>
                        <FaGithub className={iconStyle}/>
                        <button  onClick={() => handleLogin(gitHubSignIn)} className="text-gray-800">Sign in with GitHub</button>
                    </div>
                    <div className={buttonStyle}>
                        <FaGoogle className={iconStyle}/>
                        <button onClick={() => handleLogin(googleSignIn)} className="text-gray-800">Sign in with Google</button>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-1 items-baseline">
                    <p className="text-center text-sm mt-2 text-gray-800"> Don't have an account?</p>
                    <button
                    className=" text-sm text-[#1d2e0f] underline hover:text-[#f2f5f0] hover:cursor-pointer">Sign up
                    </button>
                </div>
            </div>
        </section>
    );
}