"use client"

import { useState } from "react"
import { serverTimestamp } from "firebase/firestore"
import DivLine from "@/components/DivLine"

export default function NewIncome({onAddIncome, incomes=[]} ) {

    const [income, setIncome] = useState({
        description: "",
        amount: 1
    })
    
const handleSubmit = (e) => {
        e.preventDefault();
        const newIncome = {
            ...income, 
            amount: parseFloat(income.amount || 0),
            createdAt: serverTimestamp()};

        onAddIncome(newIncome); 

        const intitialState = {description: "", amount: 0.00}
        setIncome(intitialState);
        }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setIncome((prev) => ({
                ...prev,
                [name]: value
                }));
            };              

        const inputStyle="w-full rounded-md p-2 border border-gray-400 bg-[#f2f5f0] my-2 opacity-80 h-10 text-gray-800 placeholder-gray-700 text-sm"

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-white border-2 rounded-md border-[#636B2F]/80 pb-8">
            <p className="font-bold text-lg text-gray-700">New Income Entry</p>
            <DivLine />
            <label htmlFor="description" className="text-gray-700 font-semibold">Description </label> 
                <input type="text" name="description" id="description" value={income.description} 
                onChange={handleChange} 
                required 
                placeholder="e.g Paycheque" 
                className={inputStyle}>
                </input>
                <div>
                    <label htmlFor="amount" className="text-gray-700 font-semibold">Amount</label>
                        <input type="number" name="amount" id="amount" step="0.01" value={income.amount}
                        onChange={handleChange}  
                        required
                        className={`${inputStyle} dark:text-gray-800`}>
                        
                        </input>
                </div>
                <div>
                    <button type="submit" className="bg-[#3d6927] opacity-90 text-white active:bg-grey-800 w-full rounded-md h-10 mt-5 hover:cursor-pointer hover:opacity-75 active:opacity-50">Add Income</button>
                </div>
        </form>
        )
    }