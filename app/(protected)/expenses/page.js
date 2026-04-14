"use client"

import NavHeader from "@/components/NavHeader"

import NewExpense from "./new-expense"
import ExpenseList from "./expense-list"
import NewCategory from "./new-category"
import CategoryList from "./category-list"


import { useUserAuth } from "@/contexts/authContext"
import { addExpense, removeExpense, addCategory, removeCategory} from "@/services/expense-list-service";
import useUserFinanceData from "@/app/hooks/useFinanceData"

export default function ExpensePage() {
    const { user, loading } = useUserAuth();
    const { expenses, categories } = useUserFinanceData(user);

      if(loading || !user) 
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Redirecting...</p>
            </div>);

  async function handleAddExpense(newExpense) {
    await addExpense(user.uid, newExpense);
  }

  async function handleAddCategory(newCategory) {
    await addCategory(user.uid, newCategory);
  }

  async function handleDeleteExpense(expense) {
    await removeExpense(user.uid, expense);
  }

  async function handleDeleteCategory(categoryName) {
    await removeCategory(user.uid, categoryName);
  }

    return (
        <main className="bg-[#c9d1c2] min-h-screen pt-16">
            <NavHeader />
            <div className="flex justify-center mx-5">
                <div className="w-[900px] my-10 flex gap-15">
                    <div className="flex flex-col gap-5 w-[300px] shrink-0">
                        <NewExpense onAddExpense={handleAddExpense} categories={categories}/>
                        <NewCategory onAddCategory={handleAddCategory} categories={categories}/>
                        <CategoryList categories={categories} onCategoryDelete={handleDeleteCategory} />
                    </div>
                <ExpenseList expenses={expenses} onExpenseDelete={handleDeleteExpense} />
                </div>
            </div>
        </main>
    )
}
