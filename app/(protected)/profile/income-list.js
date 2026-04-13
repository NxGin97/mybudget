import Income from "./income";

export default function IncomeList({incomes, onIncomeDelete}) {

    const sortedIncomes = [...incomes].sort((a,b) => {
        return b.createdAt - a.createdAt;
    })

    const containerStyle="w-2/3 bg-white border-2 border-[#636B2F]/80 mt-4 rounded-md"

    if (!incomes || incomes.length === 0) {
        return (
            <section className={`${containerStyle} py-6 h-[10%]`}> 
                <p className="font-bold text-center text-gray-700">No Income yet</p>
            </section>
        )
    }

    return(
        <section className={`${containerStyle}`}>
            <ul className="max-w-[850px] mx-auto">
                {sortedIncomes.map((income) => (<li key={income.id}><Income {...income} onDelete={onIncomeDelete} /></li>))}
            </ul> 
        </section>
    )
}