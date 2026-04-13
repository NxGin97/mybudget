"use client"

import { useUserAuth } from "@/contexts/authContext"
import Link from "next/link"

export default function NavHeader() {
    const { user } = useUserAuth();

    const linkStyle= "p-3 font-semibold hover:text-[#f2f5f0] text-xl hover:underline hover:cursor-pointer "


    return (
        <div className="w-full bg-[#60753e] text-grey-700 border-b-3 border-b-[#1d2e0f]/70 fixed top-0 left-0 right-0 z-100">
            <div className= "max-w-5xl mx-auto flex justify-between items-center px-6 py-3 ">
                <Link href = "/home" className = {linkStyle}>Home</Link> 
                <Link href = "/expenses" className = {linkStyle}>Expenses</Link> 
                <Link href = "/profile" className = {linkStyle}>Profile </Link> 
                <div className= "text-xl">{user?.displayName || user.email}</div>
            </div>

        </div>
    )

}