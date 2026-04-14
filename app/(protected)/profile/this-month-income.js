"use client";

import DivLine from "@/components/DivLine";
import { useState, useEffect } from "react"
import { useUserAuth } from "@/contexts/authContext";
import {doc, onSnapshot} from "firebase/firestore";
import { db } from "@/utils/firebase";


export default function ThisMonthIncome() {

        const [income, setIncome] = useState(0);
        const [spending, setSpending] = useState(0);
        const {user} = useUserAuth();
    
        useEffect(() => {
            if (!user) return;

            const currentMonth = new Date();
            const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

            const incomeRef = doc(db,"budgetUsers",user.uid,"incomeTotals",key);
            const spendingRef = doc(db, "budgetUsers", user.uid, "expenseTotals", key);

            const unsubIncome = onSnapshot(incomeRef, (snap) => {
                setIncome(snap.data()?.totalAmount || 0);
            });
            const unsubSpending = onSnapshot(spendingRef, (snap) => {
                setSpending(snap.data()?.totalAmount || 0);
            });

            return () => {
                unsubIncome(),
                unsubSpending()};
            }, [user]);
    
    const saved = income - spending;

    const currentMonthLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const labelStyle="font-bold text-gray-700";
    return (
        <div className="p-4 bg-white border-2 border-[#636B2F]/70 rounded-md mt-4">
        <h2 className={`${labelStyle} text-xl mb-2"`}>{currentMonthLabel} Summary</h2>
        <DivLine />
        <div className="flex justify-between">
            <div>
                <p className={labelStyle}>Income: </p>
                <p className={labelStyle}>Spent: </p>
                <p className={labelStyle}>Saved: </p>
            </div>
            <div className="mr-2 text-right">
                <p className="font-thin">${income.toFixed(2)}</p>
                <p className="font-thin">${spending.toFixed(2)}</p>
                <p className="font-thin">${saved.toFixed(2)}</p>
            </div>
        </div>
        </div>
    );

}