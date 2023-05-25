
import Box from '@mui/material/Box';
import styles from './index.module.css'
import Modal from '@mui/material/Modal';
import useModalContext from "../../hooks/Modal";

export const ModalPokemon = () => {



    const {pokemonModalState, setPokemonModalState,
            openModalState, setOpenModalState} = useModalContext()


    const handleClose = () => {
        //zeroPokemon:  (array) => void;
        setOpenModalState(false);
        setPokemonModalState(null);
        console.log(pokemonModalState)
    };
    return (
        <div>
            <Modal
                open={openModalState}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.conteiner}>

                </Box>
            </Modal>
        </div>
    )

}