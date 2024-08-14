import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import {
  MdDashboard,
  MdShoppingBag,
  MdLogout,
} from "react-icons/md";
 const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "HUB Installation",
        path: "/dashboard/HUB",
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: "User",
    list: [{
      title: "LogOut",
        path: "/login",
        icon: <MdLogout/>,
    },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
       <img
        className={styles.userImage}
        src="/huaweilogo2.png" 
        alt="Huawei Logo"
        width="180"
        height="50"
      />
      <ul className={styles.list}>
       {menuItems.map((cat) =>(
        <li key={cat.title}>
          <span className={styles.cat}>{cat.title}</span>
          {cat.list.map((item)=>(
            <MenuLink item={item} key={item.title}/>
         
          ) )}
        </li>
       ))}
       </ul>
      </div>
  );
};

export default Sidebar;