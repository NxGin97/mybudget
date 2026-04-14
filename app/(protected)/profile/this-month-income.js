"use client";

import DivLine from "@/components/DivLine";

import { useUserAuth } from "@/contexts/authContext";
import useUserFinanceData from "@/app/hooks/useFinanceData";

export default function ThisMonthIncome() {
    const { user } = useUserAuth();
    const {monthlyIncome, monthlySpending}= useUserFinanceData(user);
    
    const saved = monthlyIncome - monthlySpending;

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
								<p className="font-thin">${monthlyIncome.toFixed(2)}</p>
								<p className="font-thin">${monthlySpending.toFixed(2)}</p>
								<p className="font-thin">${saved.toFixed(2)}</p>
						</div>
					</div>
        </div>
    );

}