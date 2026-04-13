
export default function SpendingByCategoryList() {


    //retrive the subcollection categoryTotal (inside main collection budgetUser -> doc: userId), reach into each doc found. and put into array called categories
    //Each doc has categoryName, totalAmountSpent and budgetLimit 
    // should look like
    // [{categoryName="food", totalAmountSpent="45", budgetLimit="200"},
    // categoryName="entertainment", totalAmountSpent=51, budgetLimit=100]
    //this component should look like 
    // <ul> 
    //  {Categories.map((item) => (<li key={item.id}><Item {...item}/></li>))}
    // </ul>



    return (
        <p>Insert list here</p>
    )
}