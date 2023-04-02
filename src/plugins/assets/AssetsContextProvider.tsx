import * as fs from "fs";
import * as path from "path";
import { ComponentChildren } from "preact";

import { AssetsContext } from "./AssetsContext";

export interface AssetsContextProviderProps {
    sourceDirectory: string;
    buildDirectory: string;
    children: ComponentChildren;
}

export function AssetsContextProvider({
    sourceDirectory,
    buildDirectory,
    children,
}: AssetsContextProviderProps) {
    const sourceAssetsDirectory = path.resolve(sourceDirectory, "assets");
    const buildAssetsDirectory = path.resolve(buildDirectory, "assets");

    if (!fs.existsSync(sourceAssetsDirectory)) {
        throw new Error(`No assets directory in '${sourceDirectory}'`);
    }

    if (!fs.existsSync(buildAssetsDirectory)) {
        fs.mkdirSync(buildAssetsDirectory);
    }

    return (
        <AssetsContext.Provider
            value={{ sourceAssetsDirectory, buildAssetsDirectory }}
        >
            {children}
        </AssetsContext.Provider>
    );
}
