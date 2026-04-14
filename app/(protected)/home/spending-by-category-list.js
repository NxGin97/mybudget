"use client"

import { useEffect, useState } from "react"
import { useUserAuth } from "@/contexts/authContext"
import { onSnapshot, collection } from "firebase/firestore"
import SpendingByCategoryItems from "./spending-list-items"
import { db } from "@/utils/firebase"

export default function SpendingByCategoryList() {
    const {user} = useUserAuth();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!user) return;

    const categoriesRef = collection(db, "budgetUsers", user.uid, "categoryTotals");

    const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(data);
    });

    return () => unsubscribe();
  }, [user]);


    const sectionStyle="w-full rounded-md ";

    if(!categories.length) {
        return (
            <section className="py-5 bg-white rounded-lg border-2 border-[#636B2F]/70 m-5"> 
                <p className="font-bold text-center text-gray-700">No Budgets Created Yet.</p>
            </section>
        )
    }


    return (
        <section className={`${sectionStyle}`}>
            <div>
                {categories.map((cat) => (<SpendingByCategoryItems key={cat.id} category={cat} />))}
            </div>
        </section>
    )
}