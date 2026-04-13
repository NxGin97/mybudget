"use client"

import SignOut from "@/components/SignOutButton"
import NavHeader from "@/components/NavHeader"
import TotalSaved from "./total-saved"

import { useEffect, useState } from "react"
import { useUserAuth } from "@/contexts/authContext"
import ThisMonthIncome from "./this-month-income"
import NewIncome from "./new-income"
import IncomeList from "./income-list"

import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/utils/firebase"
import { addIncome, getCurrentMonthIncome, removeIncome} from "@/services/income-list-service"

export default function ProfilePage() {
    const { user, loading } = useUserAuth();
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
		const [monthlyIncome, setMonthlyIncome] = useState(0);

useEffect(() => {
  if (!user) return;

  const unsubExpenses = onSnapshot(
    collection(db, "budgetUsers", user.uid, "expenses"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    }
  );

  const unsubIncomes = onSnapshot(
    collection(db, "budgetUsers", user.uid, "incomes"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncomes(data);
    }
  );

  const currentMonth = new Date();
  const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const monthlyRef = doc(db, "budgetUsers", user.uid, "incomeTotals", key);

  const unsubMonthlyIncome = onSnapshot(monthlyRef, (snap) => {
    if (snap.exists()) {
      setMonthlyIncome(snap.data().totalAmount || 0);
    } else {
      setMonthlyIncome(0);
    }
  });

  return () => {
    unsubExpenses();
    unsubIncomes();
    unsubMonthlyIncome();
  };
}, [user]);


if(loading || !user) 
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Redirecting...</p>
            </div>);

			async function handleAddIncome(newIncome) {
				await addIncome(user.uid, newIncome);
			}

				async function handleDeleteIncome(income) {
					await removeIncome(user.uid, income);
			
					setIncomes((prev) =>
					prev.filter((e) => e.id !== income.id));
				}
        
    return (
        <main className="bg-[#c9d1c2] min-h-screen pt-16">
            <NavHeader />
            <div className="flex justify-center mx-5 ">
              <div className="w-[900px] my-5">
                <TotalSaved expenses={expenses}/>
                <div className="flex gap-15">
                  <div className="flex flex-col gap-5">
                    <ThisMonthIncome expenses={expenses} income={monthlyIncome} />
                    <NewIncome expenses={expenses} onAddIncome={handleAddIncome}/>
                    <SignOut />
                  </div>
                <IncomeList incomes={incomes} onIncomeDelete={handleDeleteIncome}/>
                </div>
              </div>
            </div>
        </main>
    )
}
