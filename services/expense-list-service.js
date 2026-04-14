

import { db } from "@/utils/firebase";
import {collection, doc, getDocs, getDoc, setDoc, addDoc, increment, query, where, writeBatch } from "firebase/firestore";

export async function addExpense(userId, expense) {
    try {
        
        const normalizedName = expense.category.toLowerCase();
        const expenseData = {...expense, category: normalizedName};
        
        const docRef = await addDoc(collection(db, "budgetUsers", userId, "expenses"), expenseData);
        const categoryRef = doc(db, "budgetUsers", userId, "categoryTotals", normalizedName);

        const currentMonth = new Date();
        const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;
        const monthlyRef = doc(db, "budgetUsers", userId, "expenseTotals", key);

        await setDoc(monthlyRef,
            {totalAmount: increment(Number(expense.amount))},
            {merge:true});

        await setDoc(categoryRef, 
            {totalAmountSpent: increment(Number(expense.amount))}, 
            {merge: true});

        return docRef.id;

    } catch (error) {
        console.error("Error adding to collection: ", error);
        return null;
    }
}

export async function addCategory(userId, category) {
    try {
        const normalizedName = category.categoryName.toLowerCase();

        const docRef = doc(db, "budgetUsers", userId, "categoryTotals", normalizedName);
        
        const checkCategory = await getDoc(docRef);
        if(checkCategory.exists()) {
            throw new Error("Category already exists");
        }

        await setDoc(docRef, {
            categoryName: normalizedName,
            budgetLimit: category.budgetLimit,
            type: category.type,
            totalAmountSpent: 0,
        });

        return normalizedName;

    } catch (error) {
        console.error("Error adding to collection: ", error);
        return null;
    }
}

export async function removeExpense(userId, expense) {
    try {
        const batch = writeBatch(db);
        const expenseRef = doc(db, "budgetUsers", userId, "expenses", expense.id);
        const categoryRef = doc(db, "budgetUsers", userId, "categoryTotals", expense.category.toLowerCase());

        const currentMonth = new Date();
        const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

        const monthlyRef = doc(db, "budgetUsers", userId, "expenseTotals", key);

        batch.update(categoryRef, {totalAmountSpent: increment(-Number(expense.amount))});
		batch.update(monthlyRef,{ totalAmount: increment(-Number(expense.amount))});
        batch.delete(expenseRef);


        await batch.commit();
        return true;

    } catch (error) {
        console.error("Error removing item ", error);
        return false;
    }
}

    export async function removeCategory(userId, categoryName) {
    try {
        const normalizedName = categoryName.toLowerCase();

        const q = query(collection(db, "budgetUsers", userId, "expenses"), 
            where("category", "==", normalizedName));

        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);

        querySnapshot.docs.forEach((docSnap) => {
            batch.delete(docSnap.ref)});

        const categoryRef = doc(db, "budgetUsers", userId, "categoryTotals", normalizedName);

        batch.delete(categoryRef);
        await batch.commit();
        
        return true;
    } catch (error) {
        console.error("Error removing category ", error);
        return false;
    }
}

    export async function getCategories(userId) {
    try {
        const snapshot = await getDocs(collection(db, "budgetUsers", userId, "categoryTotals"));

        return snapshot.docs.map(doc => {
            const data = doc.data();
            if (!data) return null;

            return {id: doc.id, ...data }; 
        }).filter(Boolean);

    } catch (error) {
        console.error("Error getting categories:", error);
        return [];
        }
    }

    export async function getCurrentMonthSpending(userId) {
    try {
        const currentMonth = new Date();
        const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

        const ref = doc(db, "budgetUsers", userId, "expenseTotals", key);
        const snap = await getDoc(ref);

        return snap.data()?.totalAmount || 0;
    } catch (error) {
        console.error("Error getting monthly spending:", error);
        return 0;
        }
    }