import * as path from "path";
import { ComponentChildren } from "preact";
import { StylesheetContext } from ".";

export interface StylesheetContextProviderProps {
    filename: string;
    buildDirectory: string;
    children: ComponentChildren;
}

export function StylesheetContextProvider({
    filename,
    buildDirectory,
    children,
}: StylesheetContextProviderProps) {
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
