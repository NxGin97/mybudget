"use client"

import { useUserAuth } from "@/contexts/authContext";
import useUserFinanceData from "@/app/hooks/useFinanceData";

export default function HomeSummary() {

    const {user} = useUserAuth();
    const { expenses, monthlyIncome } = useUserFinanceData(user);

    const spending = expenses.reduce((sum, expense) => {
        return sum + (Number(expense.amount) || 0);} , 0)

    const remaining = monthlyIncome - spending;


    const titleStyle= "font-bold text-2xl text-gray-700 my-auto ml-10"
    const headerStyle= "font-semibold text-xl text-gray-700 my-auto ml-10"
    const valueStyle = "text-2xl/10 text-gray-700 my-auto ml-3"
    const headerValueStyle = "text-xl text-gray-700 my-auto ml-3"
    const rowStyle= "flex flex-row"

    return (
        <section className="my-5">
            <h2 className="font-semibold text-2xl text-[#1d2e0f] pb-5 ">This Month</h2>
            <div className= "flex flex-col py-5 bg-white h-[10%] rounded-lg border-2 border-[#636B2F]/70 mx-5">
                <div className={rowStyle}>
                    <h2 className={titleStyle}>Total Spending: </h2> 
                    <p className={valueStyle}>${spending.toFixed(2)}</p>
                </div>
                    <div className="border-b-2 w-[90%] m-auto my-3 border-b-[#1d2e0f]/70" />
                <div className={rowStyle}>
                    <h2 className={headerStyle}>Income: </h2> 
                    <p className={headerValueStyle}>${monthlyIncome.toFixed(2)}</p>
                </div>
                <div className={rowStyle}>
                    <h2 className={headerStyle}>Remaining: </h2> 
                    <p className={headerValueStyle}>${remaining.toFixed(2)}</p>
                </div>
            </div>
        </section>
    )
}