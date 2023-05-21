import logo from '../../assets/Logo.svg';
import styles from './index.module.css';
export const Header = ()=>{
    return(
        <header className={styles.header}>
            <div className={styles.navBar}>
                <div>
                    <img className={styles.img} src={logo}/>
                </div>
                <div className={styles.menuItens}>
                    <a href="">Home</a>
                    <a href="">Pokedex</a>
                    <a href="">Lendários</a>
                    <a href="">Documentação</a>
                </div>
            </div>
        </header>
    )
}
