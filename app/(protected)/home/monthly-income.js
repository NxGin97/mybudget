"use client"

export default function MonthlyIncome() {

//TO DO: Update the <p> so that its a retrieve value from the database
//getItems
    const rowStyle= "flex flex-row"
    const titleStyle= "font-bold text-3xl/10 text-gray-700 my-auto ml-10"
    const valueStyle = "text-3xl text-gray-700 my-auto ml-3"


    return (
        <section>
            <div className= "flex flex-col py-5 bg-white h-[10%] rounded-lg border-2 border-[#636B2F]/70 mx-5">
                <div className={rowStyle}>
                    <h2 className={titleStyle}>Income: </h2> 
                    <p className={valueStyle}>$0000.00</p>
                </div>
                <div className={rowStyle}>
                    <h2 className={titleStyle}>Remaining: </h2> 
                    <p className={valueStyle}>$0000.00</p>
                </div>
            </div>
        </section>
    )
}