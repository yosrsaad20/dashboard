import Card from "@/app/ui/dashboard/card";
import styles from "@/app/ui/dashboard/dashboard.module.css";

const Dashboard =  () => {

  return (
    <div className={styles.dashboard}>
      {Card.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          number={card.number}
          change={card.change}
        />
      ))}
    </div>
  );
};

export default Dashboard;
