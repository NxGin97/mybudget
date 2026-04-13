import { LiaWalletSolid } from "react-icons/lia";

export default function BudgetLogo() {
    return(
        <div className="flex flex-row items-center absolute top-5 left-5">
            <LiaWalletSolid />
            <div className="ml-2 mt-0.5 font-light text-gray-800 font-mono">MyBudget</div>
        </div>
    );
}