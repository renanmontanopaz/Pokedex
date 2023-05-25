import { useContext } from "react";
import ModalContext, { ModalContextProps } from "../../contexts/Modal";

export const useModalContext = (): ModalContextProps => {
    const modalContext = useContext<ModalContextProps> (ModalContext);
    return modalContext;
}

export default useModalContext;