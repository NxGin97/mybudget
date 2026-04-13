"use client";

export default function ProgressBar({ spent, limit }) {
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const clamped = Math.min(Math.max(percentage, 0), 100);

  let color = "bg-[#3a6b2f]"; 
	let baseColor = "bg-[#afc9a9]"

  if (percentage > 100) {
    color = "bg-[#b53535]";
  } else if (percentage > 80) {
		color = "bg-[#ebd757]";
		baseColor= "bg-[#f2ecc4]"
  }

	let remaining = limit - spent
	let remainingMessage = `$${remaining.toFixed(2)} left`
	let remainingPositive = 0;

	if (remaining < 0) {
		remainingPositive = remaining * -1
		remainingMessage = `Over budget by $${remainingPositive.toFixed(2)}`
	}

	//there is a styleing issue here, where if the screen is small enough, the width of progress clips. 
  return (
		<div className="flex flex-col">
				<div className={`w-[90.5%] ${baseColor} mx-10 rounded-full h-5 overflow-hidden mt-3 mr-25`}>
					<div className={`${color} h-full transition-all duration-300`} style={{ width: `${clamped}%` }}/>
				</div>
				<div className="flex justify-between w-[89%] ml-10 mt-2 font-light text-gray-600 text-xs">
					<p>{percentage.toFixed(2)}% of budget spent</p>
					<p>{remainingMessage}</p>
				</div>
		</div>
  );
}