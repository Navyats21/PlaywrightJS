import{test,expect} from './Hooks';
import { AccountsOverview } from "../Pages/AccountsOverview";

test('Accounts Over View' , async({page})=>{
    const accts_overview = new AccountsOverview(page);    
    await accts_overview.NavigateToOverviewPage();
    const totalBalance = await accts_overview.GetTotalBalance();
console.log(`Total Balance: ${totalBalance}`);
}) ;
