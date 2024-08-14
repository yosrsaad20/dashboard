import Link from 'next/link'
import styles from './menuLink.module.css'

const MenuLink = ({item}) => {
  if (!item.path) {
    console.error('MenuLink component requires a valid "path" property in the "item" object');
    return null;
  }
  return (
    <Link href={item.path} className={styles.container}>
      {item.icon}
      {item.title}
    </Link>
  )
}

export default MenuLink