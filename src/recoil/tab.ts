import {atom} from "recoil";

export const tabIdState = atom<number | undefined>({
    key: "tabId",
    default: undefined
})