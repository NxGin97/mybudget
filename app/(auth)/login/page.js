"use client";

import { useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

export default function LoginForm() {
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

    const buttonStyle = "relative flex justify-center bg-white w-[420px] m-auto border-1 border-solid border-violet-600 opacity-80 p-2 rounded-md my-2";
    const iconStyle = "absolute left-4 top-2.5 text-lg text-black ";
    const inputStyle= "w-full rounded-sm p-2 border border-gray-400 bg-violet-100 my-2 opacity-80 h-10 placeholder-gray-800";

    return (
        <section>
            <h2 className= "text-center text-3xl font-bold m-6 text-gray-800">Sign In</h2>
            <div className="flex flex-col">
                <form onSubmit={handleEmailLogin} className="w-[420px] m-auto mb-7 rounded-xl border border-gray-300 p-4 bg-white">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${inputStyle} text-gray-800`}
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputStyle} text-gray-800`}
                        />
                        {errorMessage && (<p className="text-red-500 text-sm mb-2">{errorMessage}</p>)}
                    <button className={`${inputStyle} bg-violet-700 opacity-100 text-gray-100 hover:opacity-80 active:opacity-60`} type="submit">Sign in</button>
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
                className=" text-sm text-blue-600 underline hover:text-blue-400 hover:cursor-pointer">Sign up
                </button>
            </div>
        </section>
    );
}