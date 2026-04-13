import { db } from "@/utils/firebase";
import {collection, doc, getDocs, getDoc, setDoc, addDoc, increment, query, 
    where, writeBatch } from "firebase/firestore";

export async function addIncome(userId, income) {
  try {
    // Add Income
    const docRef = await addDoc(collection(db, "budgetUsers", userId, "incomes"), income);

    const amount = Number(income.amount) || 0;

    // Update totalIncome
    const totalIncomeRef = doc(db,"budgetUsers", userId, "incomeTotals", "overall");

    await setDoc(totalIncomeRef,
      { totalAmount: increment(amount) },
      { merge: true }
    );

    //update the month's total income
    const currentMonth = new Date();
    const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

    const monthlyRef = doc( db, "budgetUsers", userId, "incomeTotals", key);

    await setDoc(monthlyRef,
      { totalAmount: increment(amount) },
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
    const amount = Number(income.amount) || 0;

    //Delete income doc
    const incomeRef = doc(db,"budgetUsers", userId, "incomes", income.id);

    batch.delete(incomeRef);

    //Decrement from totalIncome
    const totalIncomeRef = doc(db, "budgetUsers", userId, "incomeTotals", "overall");

    batch.set(totalIncomeRef,
      { totalAmount: increment(-amount) },
      { merge: true }
    );

    //Decrement the current month's income
    let key = null;

    if (income.createdAt?.toDate) {
      const date = income.createdAt.toDate();

      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    }

    if (key) {
      const monthlyRef = doc( db, "budgetUsers", userId, "incomeTotals", key);

      batch.set(
        monthlyRef,
        { totalAmount: increment(-amount) },
        { merge: true }
      );
    }

    await batch.commit();
    return true;
		} catch (error) {
			console.error("Error removing income:", error);
			return false;
		}
}


// export async function getIncome(userId) {
//   const income = [];

//   try {
//     const snapshot = await getDocs(collection(db, "budgetUsers", userId, "incomes"));

//     snapshot.forEach((doc) => {
//       income.push({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt || null,
//       });
//     });

//     return income;
//   } catch (error) {
//     console.error("Error getting income:", error);
//     return [];
//   }
// }

export async function getCurrentMonthIncome(userId) {
  try {
    const currentMonth = new Date();
    const key = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

    const ref = doc(db, "budgetUsers", userId, "incomeTotals", "monthly", key);

    const snap = await getDoc(ref);

    return snap.data()?.totalAmount || 0;

  } catch (error) {
    console.error("Error getting monthly income:", error);
    return 0;
  }
}