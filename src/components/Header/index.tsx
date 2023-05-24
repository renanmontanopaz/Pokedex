import logo from '../../assets/Logo.svg';
import styles from './index.module.css';
import {NavLink} from "react-router-dom";
export const Header = ()=>{
    return(
        <header className={styles.header}>
            <div className={styles.navBar}>
                <div>
                    <img className={styles.img} src={logo}/>
                </div>
                <div className={styles.menuItens}>
                    <NavLink to={`/`} className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Home</NavLink>
                    <NavLink to={`/Pokedex`} className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Pokédex</NavLink>
                    <NavLink to={`/`} className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Lendários</NavLink>
                    <NavLink to={`/`} className={({ isActive }) => (isActive ? styles.active : styles.inactive)}>Documentation</NavLink>
                </div>
            </div>
        </header>
    )
}
