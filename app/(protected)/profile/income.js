export default function Income({id, description, amount, createdAt, onDelete})
{
    const pStyle = "text-gray-700 capitalize";
    const divStyle = "border-b-2 border-[#1d2e0f]/70 p-2"

    const formattedDate = createdAt?.toDate ? createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        }) : "";

    return (
        <div className={`${divStyle} relative`}>
            <button className="absolute top-3 right-4 font-bold text-gray-700 hover:text-red-700 hover:cursor-pointer"
                onClick={async (e) => {await onDelete({id, amount}); }}>
                X 
            </button>
            <div className="flex justify-between">
                <p className={`${pStyle} font-semibold pl-2 text-lg`}>{description}</p>
                <p className={`${pStyle} font-light pr-10 font-semibold`}>${amount.toFixed(2)}</p>
            </div>
            <div className="flex justify-end">
                <p className={`${pStyle} font-light text-xs pr-10`} >{formattedDate}</p>
            </div>
        </div>
    )
}
