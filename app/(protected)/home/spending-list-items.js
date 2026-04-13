"ise client"
import ProgressBar from "@/components/ProgressBar"

export default function SpendingByCategoryItems({category, spent, limit}) {
    //only spending by category list should be called in page, this is just to set up the design

    return (
            <div className= "flex flex-col py-5 bg-white h-[30%] rounded-lg border-2 border-[#636B2F]/70 m-5">
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-2xl text-gray-700 my-auto ml-10">Category{category} </p>
                    <p className="text-2xl text-gray-700 my-auto mr-10">$42.45{spent}</p>
                </div>
                <ProgressBar spent={42.445} limit={100}/>
                {/* <ProgressBar spent={spent} limit={limit}/> */}
            </div>
    )
}