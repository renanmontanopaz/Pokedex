import styles from './index.module.css'
import banner from '../../assets/BannerComplete.png'
import {CardMedia, Grid} from "@mui/material";
export const HomePokedex = ()=>{
    return (
        <section className={styles.section}>
            <div className={styles.container}>
            <Grid container sx={{ justifyContent: 'space-between'}} spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 11 }}>
                <Grid xs={2} sm={4} md={4}>
                    <h1><strong>Find</strong> all your favorite <strong>Pokemon</strong></h1>
                    <h2>You can know the type of pokemon, its strengths, disadvantages and abilities</h2>
                    <button>See Pokemons</button>
                </Grid>
                <Grid xs={7}>
                    <CardMedia component="img" sx={{ width: 800}} image={banner}/>
                </Grid>
            </Grid>
            </div>
        </section>
    )
}