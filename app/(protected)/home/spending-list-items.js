"use client"

import ProgressBar from "@/components/ProgressBar"
import useUserFinanceData from "@/app/hooks/useFinanceData";
import { useUserAuth } from "@/contexts/authContext";

export default function SpendingByCategoryItems({ category }) {
    const { user } = useUserAuth();
    const { monthlyIncome } = useUserFinanceData(user);
    
    const spent = category.totalAmountSpent || 0;
    const limit = category.budgetLimit || 0;
    const type = category.type || "fixed";

    let adjustedLimit = limit;

	if (type === "percent") {adjustedLimit = (limit / 100) * monthlyIncome;}

	const percentage = adjustedLimit > 0 ? (spent / adjustedLimit) * 100 : 0;
    let borderColor = "border-[#636B2F]/70"; 

    if (percentage >= 100) {
        borderColor = "border-[#c41414]/70";
    } else if (percentage >= 80) {
            borderColor = "border-[#eda807]/70";
    }

    return (
    <div className={`${borderColor} flex flex-col py-5 bg-white rounded-lg border-2 m-5 relative`}>
        <div className="flex flex-row justify-between">
            <p className="font-bold text-2xl text-gray-700 my-auto ml-10 capitalize">{category.categoryName}</p>
            <p className="text-2xl text-gray-700 my-auto mr-13">${spent.toFixed(2)}</p>
        </div>
        <ProgressBar spent={spent} limit={limit} type={type}/>
    </div>
)
}