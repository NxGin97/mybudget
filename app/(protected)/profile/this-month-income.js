"use client";

import DivLine from "@/components/DivLine";

export default function ThisMonthIncome({ expenses = [], income}) {
    
    const currentMonth = new Date();

    const totalThisMonth = expenses.reduce((sum, expense) => {
        if(!expense.createdAt?.toDate) return sum;

        const date = expense.createdAt.toDate();

        const isSameMonth =
            date.getMonth() === currentMonth.getMonth() &&
            date.getFullYear() === currentMonth.getFullYear();

        if(!isSameMonth) return sum;
        return sum + (Number(expense.amount) || 0);
        
    }, 0);

    const currentMonthLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const labelStyle="font-bold text-gray-700";
    return (
        <div className="p-4 bg-white border-2 border-[#636B2F]/70 rounded-md mt-4">
        <h2 className={`${labelStyle} text-xl mb-2"`}>{currentMonthLabel} Summary</h2>
        <DivLine />

        <p className={labelStyle}>Income: <span className="font-thin">${income}</span></p>
        <p className={labelStyle}>Spent: <span className="font-thin">${totalThisMonth.toFixed(2)}</span></p>
        <p className={labelStyle}>Saved: <span className="font-thin">xxxx</span></p>
        </div>
    );

}