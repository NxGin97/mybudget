
"use client";

import { useEffect, useState } from "react";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export default function useUserFinanceData(user) {
	const [expenses, setExpenses] = useState([]);
	const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [monthlySpending, setMonthlySpending] = useState(0);
	const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyHistory, setMonthlyHistory] = useState([]);


useEffect(() => {
  if (!user) return;

  const expensesRef = collection(db, "budgetUsers", user.uid, "expenses");
  const incomesRef = collection(db, "budgetUsers", user.uid, "incomes");
  const categoryRef = collection(db, "budgetUsers", user.uid, "categoryTotals");

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

const unsubCategories = onSnapshot(categoryRef, (snapshot) => {
  setCategories(
    snapshot.docs.map((doc) => ({
        categoryName: doc.id,
        ...doc.data(),
    }))
  );
});


  const currentMonth = new Date();
  const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const monthlyIncomeRef = doc(db, "budgetUsers", user.uid, "incomeTotals", key);
  const monthlySpendingRef = doc(db, "budgetUsers", user.uid, "expenseTotals", key);

  const unsubMonthlyIncome = onSnapshot(monthlyIncomeRef, (snap) => {setMonthlyIncome(snap.data()?.totalAmount || 0)});
  const unsubMonthlySpending = onSnapshot(monthlySpendingRef, (snap) => {setMonthlySpending(snap.data()?.totalAmount || 0)});

  const historyExpenseRef = collection(db,"budgetUsers", user.uid, "expenseTotals");
  const historyIncomeRef = collection(db, "budgetUsers", user.uid, "incomeTotals" ); 

  let expenseMap={};
  let incomeMap={};

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
        label: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        saved: income - expense,
      });
    }

    setMonthlyHistory(result);
  };

  const unsubHistoryExpenses = onSnapshot(historyExpenseRef, (snapshot) => {
    expenseMap = {};
    snapshot.forEach((doc) => {expenseMap[doc.id] = doc.data().totalAmount || 0;});
    processData();
  });

  const unsubHistoryIncome = onSnapshot(historyIncomeRef, (snapshot) => {
    incomeMap = {};snapshot.forEach((doc) => {incomeMap[doc.id] = doc.data().totalAmount || 0;});
    processData();
  });


  return () => {
    unsubExpenses();
    unsubIncomes();
    unsubCategories();
    unsubMonthlyIncome();
    unsubMonthlySpending();
    unsubHistoryExpenses();
    unsubHistoryIncome();
  };
}, [user]);

    return { expenses, incomes, categories, monthlyIncome, monthlySpending, monthlyHistory};
}