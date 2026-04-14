import Category from "./category"
import { useUserAuth } from "@/contexts/authContext";
import useUserFinanceData from "@/app/hooks/useFinanceData";

export default function CategoryList({categories=[], onCategoryDelete}) {

    const {user} = useUserAuth();
    const { expenses, monthlyIncome } = useUserFinanceData(user);

    const spending = expenses.reduce((sum, expense) => {
        return sum + (Number(expense.amount) || 0);} , 0)

    const remaining = monthlyIncome - spending;

    const sectionStyle="w-full rounded-md p-4 bg-white border-2 border-[#636B2F]/80 h-[15%]";
    const labelStyle="text-gray-700 font-semibold" 
    
    if (!categories || categories.length === 0) {
        return (
            <section className={sectionStyle}> 
                <p className="font-bold text-center text-gray-700">No Categories Created Yet</p>
            </section>
        )
    }

    return(
        <section className={`${sectionStyle} h-full`}>
            <div className="flex justify-between mb-2">
                <p className={labelStyle}>Categories</p>
                <p className={`${labelStyle} pr-2`}>Budget Limit</p>
            </div>
            <ul className="grid grid-cols-1 gap-2 max-w-[850px] mx-auto">
                {categories.map((cat) => (<li key={cat.categoryName}>
                    <Category
                    categoryName={cat.categoryName}
                    budgetLimit={cat.budgetLimit}
                    type={cat.type}
                    onDelete={onCategoryDelete}
                    />
                </li>))}
            </ul> 
        </section>
    )
}