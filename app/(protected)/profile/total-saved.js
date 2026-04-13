//Total Saved + Last 6 Months
export default function TotalSaved({expenses = []}) {
    const currentMonth = new Date();
    const months = [];

    //Get the last six months --reverse, i want the amount SAVED
    for(let i = 0; i< 6; i++) {
        const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - i, 1);

        const monthTotal = expenses.reduce((sum, expense) => {
            if(!expense.createdAt?.toDate) return sum;

            const date = expense.createdAt.toDate();

            if ( date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear()) {
                return sum + (Number(expense.amount) || 0);
            }

            return sum;
        }, 0);

        months.push({label: d.toLocaleDateString("en-US", { month: "short", year: "numeric" }), monthTotal});
    }

    return (
        <section className="p-4 bg-white border-2 border-[#636B2F]/70 rounded-md mt-4">
            <div className="flex justify-between mr-10">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-gray-700"> Total Saved </h2>
                <p className="font-bold text-4xl text-gray-700" >$0000.00</p>
                <h2 className=" text-md text-gray-700">Last 6 Months</h2>
            </div>
                <ul className="grid grid-cols-2 gap-x-10 mt-1">
                    {months.map((m) => (
                        <li key={m.label} className="flex justify-between">
                        <span className="font-bold text-xl mr-10 text-gray-700">{m.label}</span>
                        <span className="text-xl text-gray-700">${m.monthTotal.toFixed(2)}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </section>
    );

}