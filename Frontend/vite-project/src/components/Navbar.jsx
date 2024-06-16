import React  from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Navbar.module.css"

export default function Navbar() {

    const {isDark, toggleTheme} = useTheme();

    return (
        <nav className={styles.menu}>
         
          <ul className={styles.list}>
            <li><Link to="/" style={{textDecoration:"none"}}><span className={styles.itemtext}>Home</span></Link></li>
            <li><Link to="/users"  style={{textDecoration:"none"}}><span className={styles.itemtext}>Authors</span></Link></li>
            <li><Link to="/posts"  style={{textDecoration:"none"}}><span className={styles.itemtext}>Posts</span></Link></li>
            <li><Link to="/signin"  style={{textDecoration:"none"}}><span className={styles.itemtext}>SignUp</span></Link></li>
            <li><Link to="/account"  style={{textDecoration:"none"}}><span className={styles.itemtext}>My account</span></Link></li>
            {/*<li><button style={{marginLeft: "20px"}} onClick={toggleTheme}>Dark/Light</button></li>*/}
          </ul>
        </nav>
      );
    }