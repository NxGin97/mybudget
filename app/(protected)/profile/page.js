"use client"

import SignOut from "@/components/SignOutButton"
import NavHeader from "@/components/NavHeader"

import TotalSaved from "./total-saved"
import ThisMonthIncome from "./this-month-income"
import NewIncome from "./new-income"
import IncomeList from "./income-list"

import { useUserAuth } from "@/contexts/authContext"
import { addIncome, removeIncome} from "@/services/income-list-service"
import useUserFinanceData from "@/app/hooks/useFinanceData"

export default function ProfilePage() {
    const { user, loading } = useUserAuth();
    const { expenses, incomes, monthlyIncome } = useUserFinanceData(user);

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
