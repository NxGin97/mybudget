import Expense from "./expense";

export default function ExpenseList({expenses, onExpenseDelete}) {

    const sortedExpenses = [...expenses].sort((a,b) => {
        return b.createdAt - a.createdAt;
    })

    if (!expenses || expenses.length === 0) {
        return (
            <section className="w-2/3 py-5.5 bg-white border-2 border-[#636B2F]/80 rounded-md h-18"> 
                <p className="font-bold text-center text-[#1d2e0f]">No Expenses Yet</p>
            </section>
        )
    }

    return(
        <section className="w-2/3 bg-white rounded-md border-2 border-[#636B2F]/80">
        <ul className="max-w-[850px] mx-auto">
            {sortedExpenses.map((expense) => (
                <li key={expense.id}>
                    <Expense {...expense} onDelete={onExpenseDelete} />
                </li>
            ))}
        </ul>
    </section>
    )
}