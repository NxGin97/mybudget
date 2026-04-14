"use client";

import { useUserAuth } from "@/contexts/authContext";
import useUserFinanceData from "@/app/hooks/useFinanceData";

export default function TotalSaved() {
  const { user } = useUserAuth();
  const { monthlyHistory } = useUserFinanceData(user);

  const totalSaved = monthlyHistory.reduce((sum, m) => sum + m.saved, 0);

  return (
    <section className="p-4 bg-white border-2 border-[#636B2F]/70 rounded-md mt-4">
      <div className="flex justify-between mr-10">
        <div className="flex flex-col">
          <p className="font-bold text-2xl text-gray-700">Total Saved</p>
          <p className="font-bold text-4xl text-gray-700">${totalSaved.toFixed(2)}</p>
          <p className="text-md text-gray-700">Last 6 Months</p>
        </div>

        <ul className="grid grid-cols-2 gap-x-10 mt-1">
          {monthlyHistory.map((m) => (
            <li key={m.key} className="flex justify-between">
              <span className="font-bold text-xl mr-10 text-gray-700">{m.label}</span>
              <span className="text-xl text-gray-700">${m.saved.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}