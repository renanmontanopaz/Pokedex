import React, {  useState } from 'react';
import { Pokemon } from '../../models/Pokemon.ts'

type ModalContextProviderProps = {
    children:React.ReactNode
}



export type ModalContextProps = {
    pokemonModalState: Pokemon | null,
    setPokemonModalState: React.Dispatch<React.SetStateAction<Pokemon[]>>,
    openModalState: boolean,
    setOpenModalState: React.Dispatch<React.SetStateAction<boolean>>,
}



const DEFAULT_VALUE = {
    pokemonModalState: [],
    setPokemonModalState: () => [{}],
    openModalState: Boolean,
    setOpenModalState: Boolean,
}


const ModalContext = React.createContext(DEFAULT_VALUE)
const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
    const [pokemonModalState, setPokemonModalState] = useState<Pokemon[]>([]);
    const [openModalState, setOpenModalState] = useState(false)
    return (
        <ModalContext.Provider value={{ pokemonModalState, setPokemonModalState, openModalState, setOpenModalState}}>
            {children}
        </ModalContext.Provider>
    )
}

export {ModalContextProvider};
export default ModalContext;