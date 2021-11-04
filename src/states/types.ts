import { ReactNode } from "react";

export type ModalType = {
    title: string,
    component: ReactNode | null,
    closable: boolean
}