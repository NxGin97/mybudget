"use client";

import { useEffect, useState } from "react";
import { useUserAuth } from "@/contexts/authContext";
import { db } from "@/utils/firebase";
import {collection, onSnapshot} from "firebase/firestore";

export default function TotalSaved() {
    const { user } = useUserAuth();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    if (!user) return;

    const expenseRef = collection(db,"budgetUsers", user.uid, "expenseTotals");
    const incomeRef = collection(db, "budgetUsers", user.uid, "incomeTotals" );

    let expenseMap = {};
    let incomeMap = {};

    const processData = () => {
      const now = new Date();
      const result = [];

      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

        const income = incomeMap[key] || 0;
        const expense = expenseMap[key] || 0;

        result.push({
          key, 
					label: d.toLocaleDateString("en-US", {month: "short", year: "numeric"}),
          saved: income - expense,
        });
      }

      setMonths(result);
    };

    const unsubExpenses = onSnapshot(expenseRef, (snapshot) => {
      expenseMap = {};
      snapshot.forEach((doc) => {
        expenseMap[doc.id] = doc.data().totalAmount || 0;
      });
      processData();
    });

    const unsubIncome = onSnapshot(incomeRef, (snapshot) => {
      incomeMap = {};
      snapshot.forEach((doc) => {
        incomeMap[doc.id] = doc.data().totalAmount || 0;
      });

      processData();
    });

    return () => {
      unsubExpenses();
      unsubIncome();
    };
  }, [user]);

  const totalSaved = months.reduce((sum, m) => sum + m.saved, 0);

  return (
    <section className="p-4 bg-white border-2 border-[#636B2F]/70 rounded-md mt-4">
      <div className="flex justify-between mr-10">
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl text-gray-700">Total Saved</h2>
          <p className="font-bold text-4xl text-gray-700">${totalSaved.toFixed(2)}</p>
          <h2 className="text-md text-gray-700">Last 6 Months</h2>
        </div>

        <ul className="grid grid-cols-2 gap-x-10 mt-1">
          {months.map((m) => (
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