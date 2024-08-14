import Transactions from "../ui/dashboard/transactions/transactions";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";

const Dashboard = () => {
  
  return (
    <div className={styles.wrapper}>
      <div id ="dashboard-content" className={styles.main}>
        <div className={styles.cards}>
        <Card/>
      
        </div>
        <Transactions />
        <Chart />
      </div>
    
    </div>
    
  );
};

export default Dashboard;