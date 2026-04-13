

import { db } from "@/utils/firebase";
import {collection, doc, getDocs, getDoc, setDoc, addDoc, increment, query, 
    where, writeBatch } from "firebase/firestore";

// export async function getExpense(userId) {
//     const expenses = [];
//     try {
//         const docRef = await getDocs(collection(db, "budgetUsers", userId, "expenses"));
//         docRef.forEach((doc) => {
//             expenses.push({
//             id: doc.id, ...doc.data(),
//             createdAt: doc.data().createdAt || null,
//         })
//     });

//     return expenses;

//     } catch(error) {
//         console.error("Error reading collection: " , error);
//         return [];
//     }
// }

// export async function getCategories(userId) {
//     try {
//         const querySnapshot = await getDocs(collection(db, "budgetUsers", userId, "categoryTotals"))
        
//         return querySnapshot.docs.map((doc) => doc.id);

//     } catch (error) {
//         console.error("Error reading collection: ", error);
//         return [];
//     }
// }

export async function addExpense(userId, expense) {
    try {

        const docRef = await addDoc(collection(db, "budgetUsers", userId, "expenses"), expense);

        const categoryRef = doc(db, "budgetUsers", userId, "categoryTotals", expense.category.toLowerCase());

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

        batch.delete(expenseRef);

        batch.update(categoryRef, {totalAmountSpent: increment(-Number(expense.amount))});

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