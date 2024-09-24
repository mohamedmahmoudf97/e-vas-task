import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    toggle: () => void;
    withClose?: boolean;
    title?: string|null;
    subTitle?: string|null;
    children:ReactNode 
}

export interface CloseButtonProp {
    toggle: () => void;
    withClose: boolean;
    
}

export interface ModalHeaderProp {
    title: string|null;
    subTitle?: string|null;
}