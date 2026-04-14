export default function Expense({id, description, amount, category, createdAt, onDelete})
{
    const pStyle = "text-[#1d2e0f] capitalize";
    const divStyle = "border-b-2 border-[#1d2e0f]/70 mx-auto px-2 py-4"

    const formattedDate = createdAt?.toDate ? createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        }) : "";

    return (
        <div className={`${divStyle} relative`}>
            <button className="absolute top-2 right-4 font-bold text-[#1d2e0f] hover:text-red-700 hover:cursor-pointer"
                onClick={async (e) => {
                await onDelete({id, amount, category}); 
                }}>
                X </button>
                <div className="flex justify-between">
                    <p className={`${pStyle} font-semibold pl-2 text-lg `}>{description}</p>
                    <p className={`${pStyle} font-light pr-10 font-semibold`}>${amount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className={`${pStyle} font-regular text-sm pl-2`}>{category}</p>
                    <p className={`${pStyle} font-light text-xs pr-10`} >{formattedDate}</p>
                </div>
        </div>
    )
}
