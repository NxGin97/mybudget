"use client"

import SignOut from "@/components/SignOutButton"
import NavHeader from "@/components/NavHeader"

import NewExpense from "./new-expense"
import ExpenseList from "./expense-list"
import NewCategory from "./new-category"
import CategoryList from "./category-list"

import { useState, useEffect } from "react"
import { useUserAuth } from "@/contexts/authContext"

import { db } from "@/utils/firebase"
import { addExpense, removeExpense, addCategory, removeCategory} from "@/services/expense-list-service";
import { collection, onSnapshot } from "firebase/firestore";

export default function ExpensePage() {

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const { user, loading } = useUserAuth();

    //Load expenses and categories
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

      const unsubCategory = onSnapshot(
        collection(db, "budgetUsers", user.uid, "categoryTotals"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            categoryName: doc.id,
            ...doc.data(),
          }));
          setCategories(data);
        }
      );

      return () => {
        unsubExpenses();
        unsubCategory();
      };
    }, [user]);

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

    setExpenses((prev) =>
    prev.filter((e) => e.id !== expense.id));
  }

  async function handleDeleteCategory(categoryName) {
    await removeCategory(user.uid, categoryName);
  }


    return (
        <main className="bg-[#c9d1c2] min-h-screen pt-16">
            <NavHeader />
            <div className="flex justify-center mx-5">
                <div className="w-[900px] my-10 flex gap-15">
                    <div className="flex flex-col gap-5">
                        <NewExpense onAddExpense={handleAddExpense} categories={categories}/>
                        <NewCategory onAddCategory={handleAddCategory} categories={categories}/>
                        <CategoryList categories={categories} onCategoryDelete={handleDeleteCategory} />
                    </div>
                <ExpenseList expenses={expenses} onExpenseDelete={handleDeleteExpense} />
                </div>
            </div>
            <SignOut />
        </main>
    )
}
