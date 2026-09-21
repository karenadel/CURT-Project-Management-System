import { useContext } from "react";
import { Context } from "./Context";

export function useAppContext() {
    return useContext(Context);
}