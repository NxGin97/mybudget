"use client"

import { useUserAuth } from "@/contexts/authContext"
import SpendingByCategoryItems from "./spending-list-items"
import useUserFinanceData from "@/app/hooks/useFinanceData"

export default function SpendingByCategoryList() {
    const { user } = useUserAuth();
    const { categories } = useUserFinanceData(user);

    if(!categories.length) {
        return (
            <section className="py-5 bg-white rounded-lg border-2 border-[#636B2F]/70 m-5"> 
                <p className="font-bold text-center text-gray-700">No Budgets Created Yet.</p>
            </section>
        )
    }

    return (
        <section className="w-full rounded-md">
            <div>
                {categories.map((cat) => (<SpendingByCategoryItems key={cat.categoryName} category={cat} />))}
            </div>
        </section>
    )
}