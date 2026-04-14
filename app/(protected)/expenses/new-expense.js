"use client"

import { serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import DivLine from "@/components/DivLine";

export default function NewExpense({ onAddExpense, categories=[] }) {
    const [expense, setExpense] = useState({
        description: "",
        amount: "",
        category: "",
    })
    
    useEffect(() => {
    if (categories.length > 0 && !expense.category) {
        setExpense((prev) => ({
        ...prev,
        category: categories[0].categoryName,
        }));
    }
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!expense.category) return;
        const newExpense = {
            ...expense, 
            amount: parseFloat(expense.amount || 0),
            createdAt: serverTimestamp()};

        onAddExpense(newExpense); 

        const intitialState = {description: "", amount: "", category: categories[0]?.categoryName || "",}
        setExpense(intitialState);
        }

        const handleChange = (e) => {
            const { name, value } = e.target;
            setExpense((prev) => ({
                ...prev,
                [name]: value
                }));
            };              

        const inputStyle="w-full rounded-md p-2 border border-gray-400 bg-[#f2f5f0] my-2 opacity-80 h-10 text-[#1d2e0f] placeholder-gray-700 text-sm"
        const labelStyle="text-[#1d2e0f] font-semibold text-sm";

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-white border-2 rounded-md border-[#636B2F]/80 pb-8">
            <p className="font-bold text-lg text-gray-700">New Expense</p>
            <DivLine />
            <label htmlFor="description" className={labelStyle}>Description </label> 
                <input type="text" name="description" id="description" value={expense.description} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g Takeout" 
                    className={inputStyle}>
                </input>
                <div>
                    <label htmlFor="amount" className={labelStyle}>Amount</label>
                        <input type="number" name="amount" id="amount" step="0.01" value={expense.amount}
                            onChange={handleChange}  
                            required
                            placeholder="e.g 100"
                            className={`${inputStyle} dark:text-gray-800`}>
                        </input>
                </div>
                <div>
                <label htmlFor="category" className={labelStyle}>Category</label>
                    <select
                        name="category"
                        id="category"
                        value={expense.category}
                        onChange={handleChange}
                        className={`${inputStyle} dark:text-[#1d2e0f]`}
                        disabled={categories.length === 0}
                        >
                        {categories.length === 0 ? (
                            <option value="">
                            Please create a category first
                            </option>
                        ) : (
                            categories.map((cat) => (
                                <option key={cat.categoryName} value={cat.categoryName}>
                                    {cat.categoryName[0].toUpperCase() + cat.categoryName.slice(1)}
                                </option>
                                ))
                        )}
                        </select>
                </div>
                <div>
                    <button type="submit" className="bg-[#3d6927] opacity-90 text-white active:bg-grey-800 w-full rounded-md h-10 mt-3 hover:cursor-pointer hover:opacity-75 active:opacity-50">Add Expense</button>
                </div>
        </form>
        )
    }


