"use client";

import useUserFinanceData from "@/app/hooks/useFinanceData";
import { useUserAuth } from "@/contexts/authContext";

export default function ProgressBar({ spent, limit, type }) {

	const { user } = useUserAuth();
	const { monthlyIncome } = useUserFinanceData(user);

	let adjustedLimit = limit;

	if (type === "percent") {
		adjustedLimit = (limit / 100) * monthlyIncome;
	}

	const percentage = adjustedLimit > 0 ? (spent / adjustedLimit) * 100 : 0;
  	const clamped = Math.min(Math.max(percentage, 0), 100);

	let color = "bg-[#3a6b2f]"; 
	let baseColor = "bg-[#afc9a9]"

	if (percentage > 100) {
		color = "bg-[#b53535]";
	} else if (percentage >= 80) {
			color = "bg-[#eda807]/70";
			baseColor= "bg-[#f2ecc4]"
	}

	let remaining = adjustedLimit - spent
	let remainingMessage = `$${remaining.toFixed(2)} left`
	let remainingPositive = 0;

	if (remaining < 0) {
		remainingPositive = remaining * -1
		remainingMessage = `Over budget by $${remainingPositive.toFixed(2)}`
	}

  return (
		<div className="flex flex-col">
				<div className={`w-[90%] mx-auto ${baseColor} rounded-full h-5 overflow-hidden mt-3`}>
					<div className={`${color} h-full`} style={{ width: `${clamped}%` }}/>
				</div>
				<div className="flex justify-between w-[89%] ml-10 mt-2 font-light text-gray-600 text-xs">
					<p>{percentage.toFixed(2)}% of budget spent</p>
					<p>{remainingMessage}</p>
				</div>
		</div>
  );
}