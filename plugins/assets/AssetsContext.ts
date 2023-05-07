import { createContext } from "preact";

export interface IAssetsContext {
    sourceAssetsDirectory: string;
    buildAssetsDirectory: string;
}

export const AssetsContext = createContext<IAssetsContext | null>(null);
