import styles from './index.module.css'
import banner from '../../assets/BannerComplete.png'
export const Home = ()=>{
    return (
        <section >
            <div className={styles.container}>
                <div className={styles.containers}>
                    <h1><strong>Find</strong> all your favorite <strong>Pokemon</strong></h1>
                    <h2>You can know the type of pokemon, its strengths, disadvantages and abilities</h2>
                    <button>See Pokemons</button>
                </div>
                <div className={styles.containers}>
                    <img className={styles.banner} src={banner}/>
                </div>
            </div>
        </section>
    )
}