import { createContext } from "preact";

export interface IStylesheetContext {
    /** Stylesheet filename. */
    filename: string;
    /** Stylesheet path. */
    path: string;
}

export const StylesheetContext = createContext<IStylesheetContext | null>(null);
