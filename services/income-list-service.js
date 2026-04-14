import { db } from "@/utils/firebase";
import {collection, doc, getDocs, getDoc, setDoc, addDoc, increment, writeBatch, serverTimestamp } from "firebase/firestore";

export async function addIncome(userId, income) {
  try {
    const docRef = await addDoc(collection(db, "budgetUsers", userId, "incomes"), {...income, createdAt: serverTimestamp()});

    const currentMonth = new Date();
    const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;
    const monthlyRef = doc( db, "budgetUsers", userId, "incomeTotals", key);

    await setDoc(monthlyRef,
      { totalAmount: increment(income.amount) },
      { merge: true }
    );

    return docRef.id;
		} catch (error) {
			console.error("Error adding income:", error);
			return null;
		}
}

export async function removeIncome(userId, income) {
  try {
    const batch = writeBatch(db);
    const incomeRef = doc(db,"budgetUsers", userId, "incomes", income.id);

    const currentMonth = new Date();
    const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

    const monthlyRef = doc(db, "budgetUsers", userId, "incomeTotals", key);

    batch.update(monthlyRef,{totalAmount: increment(-Number(income.amount))});
    batch.delete(incomeRef);

    await batch.commit();
    return true;
    
		} catch (error) {
			console.error("Error removing income:", error);
			return false;
		}
}

export async function getCurrentMonthIncome(userId) {
  try {
    const currentMonth = new Date();
    const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

    const ref = doc(db, "budgetUsers", userId, "incomeTotals", key);
    const snap = await getDoc(ref);

    return snap.data()?.totalAmount || 0;

  } catch (error) {
    console.error("Error getting monthly income:", error);
    return 0;
  }
}