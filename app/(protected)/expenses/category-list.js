import Category from "./category"

export default function CategoryList({categories=[], onCategoryDelete}) {

    const sectionStyle="w-full rounded-md p-4 bg-white border-2 border-[#636B2F]/80 h-[15%]";

    if (!categories || categories.length === 0) {
        return (
            <section className={sectionStyle}> 
                <p className="font-bold text-center text-gray-700">No Categories Created Yet.</p>
            </section>
        )
    }

    return(
        <section className={`${sectionStyle} h-full`}>
            <div className="flex justify-between mb-2">
                <h2 className="text-gray-700 font-semibold ">Categories</h2>
                <h2 className="text-gray-700 font-semibold pr-6">Limit</h2>
            </div>
            <ul className="grid grid-cols-1 gap-2 max-w-[850px] mx-auto">
                {categories.map((cat) => (<li key={cat.categoryName}>
                    <Category
                    categoryName={cat.categoryName}
                    budgetLimit={cat.budgetLimit}
                    onDelete={onCategoryDelete}
                    />
                </li>))}
            </ul> 
        </section>
    )
}