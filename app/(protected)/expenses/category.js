export default function Category({categoryName, budgetLimit, type, onDelete})
{
    const pStyle = "text-gray-700 font-semibold capitalize text-sm";
    const divStyle = "border-1 border-[#1d2e0f]/70 mx-auto p-2 rounded-md"

    console.log(categoryName, type);
    return (
        <div className={`${divStyle} relative`}>
            <button className="absolute top-2.5 right-3 font-bold text-xs text-gray-700 hover:text-red-700 hover:cursor-pointer"
                onClick={async (e) => {
                await onDelete(categoryName); 
                }}> X </button>
            <div className="flex justify-between">
                <p className={pStyle}>{categoryName}</p>
                <p className={`text-gray-700 pr-6 text-sm`}>{type === "fixed" ? `$${budgetLimit}` : `${budgetLimit}%`}</p>
            </div>
        </div>
    )
}
