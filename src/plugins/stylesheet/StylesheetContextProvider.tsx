import * as path from "path";
import { ComponentChildren } from "preact";
import { StylesheetContext } from "./StylesheetContext";

export interface StylesheetContextProviderProps {
    route: string;
    buildDirectory: string;
    children: ComponentChildren;
}

export function StylesheetContextProvider({
    route,
    buildDirectory,
    children,
}: StylesheetContextProviderProps) {
    const filename = `${route}.css`;

    const value = {
        filename,
        path: path.resolve(buildDirectory, filename),
    };

    return (
        <StylesheetContext.Provider value={value}>
            {children}
        </StylesheetContext.Provider>
    );
}
