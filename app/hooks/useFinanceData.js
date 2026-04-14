
"use client";

import { useEffect, useState } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default function useUserFinanceData(user) {
	const [expenses, setExpenses] = useState([]);
	const [incomes, setIncomes] = useState([]);
	const [monthlyIncome, setMonthlyIncome] = useState(0);


useEffect(() => {
  if (!user) return;

  const expensesRef = collection(db, "budgetUsers", user.uid, "expenses");
  const incomesRef = collection(db, "budgetUsers", user.uid, "incomes");

  const unsubExpenses = onSnapshot(expensesRef, (snapshot) => {
    setExpenses(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
      );
    });

const unsubIncomes = onSnapshot(incomesRef, (snapshot) => {
    setIncomes(
        snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
      );
    });

  const currentMonth = new Date();
  const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;
  const monthlyRef = doc(db, "budgetUsers", user.uid, "incomeTotals", key);

  const unsubMonthlyIncome = onSnapshot(monthlyRef, (snap) => {setMonthlyIncome(snap.data()?.totalAmount || 0);
  });

  return () => {
    unsubExpenses();
    unsubIncomes();
    unsubMonthlyIncome();
  };
}, [user]);


    return { expenses, incomes, monthlyIncome };
}