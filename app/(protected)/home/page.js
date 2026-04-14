"use client"
import NavHeader from "@/components/NavHeader"
import HomeSummary from "./home-summary"
import SpendingByCategoryList from "./spending-by-category-list"

export default function HomePage() {
    return (
        <main className="bg-[#c9d1c2] min-h-screen pt-16">
            <NavHeader />
            <div className="flex justify-center mx-5">
                <div className="w-[900px] my-5">
                <HomeSummary />
                <h2 className="font-semibold text-2xl text-[#1d2e0f] my-4 ">Spending By Category</h2>
				<SpendingByCategoryList />
                </div>
            </div>
        </main>
    )
}
