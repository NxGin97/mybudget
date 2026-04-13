"use client"

import { useState } from "react";
import DivLine from "@/components/DivLine";

export default function NewCategory({ onAddCategory, categories=[] }) {
    
    const [category, setCategory] = useState({
        categoryName: "",
        budgetLimit: 1,
    });

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const exists = categories.some(
            (cat) => cat.categoryName.toLowerCase() === category.categoryName.toLowerCase());

            if (exists) {
            setError("Category already exists.");
            return;
            }

            setError("");
            onAddCategory(category); 
            setCategory({categoryName: "", budgetLimit: 0.00});
        }

        const handleChange = (e) => {
            const {name, value} = e.target;
            setCategory((prev) => ({...prev, [name]: name === "amount" ? parseFloat(value) || 0 : value}));
        }

        const inputStyle="w-full rounded-md p-2 border border-gray-400 bg-[#f2f5f0] my-2 opacity-80 h-10 text-gray-800 placeholder-gray-700 text-sm"

    return (
        <form onSubmit={handleSubmit} className="w-full p-4 bg-white border-2 border-[#636B2F]/80 pb-8 rounded-md">
            <p className="font-bold text-lg text-gray-700">New Category</p>
            <DivLine />
            <label htmlFor="categoryName" className="text-[#1d2e0f] font-semibold text-sm">Name</label> 
                <input type="text" name="categoryName" id="categoryName" value={category.categoryName} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Hobby" 
                className={`${inputStyle} dark:text-[#1d2e0f]`}>
                </input>
                <div>
                    <label htmlFor="budgetLimit" className="text-[#1d2e0f] font-semibold text-sm">Budget Limit</label>
                        <input type="number" name="budgetLimit" id="budgetLimit" step="0.01" value={category.budgetLimit} 
                        onChange={handleChange}  
                        className={`${inputStyle} dark:text-[#1d2e0f]`}>
                        </input>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <button type="submit" className="bg-[#3d6927] opacity-90 text-white active:bg-grey-800 w-full rounded-md h-10 mt-3 hover:cursor-pointer hover:opacity-75 active:opacity-50">Create New Category</button>
                </div>
        </form>
        )
    }


