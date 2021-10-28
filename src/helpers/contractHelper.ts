import Networks from "@configs/networks"

export const getContractAddress = (networkKey: string) => {
    return Networks[networkKey].addresses
}