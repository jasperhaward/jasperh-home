import * as fs from "fs";
import * as path from "path";

import { useAssetsContext } from "./useAssetsContext";

export interface Asset {
    path: string;
}

export function useAsset(assetPath: string): Asset {
    const { sourceAssetsDirectory, buildAssetsDirectory } = useAssetsContext();

    const sourceAssetPath = path.resolve(sourceAssetsDirectory, assetPath);
    const buildAssetPath = path.resolve(buildAssetsDirectory, assetPath);

    if (!fs.existsSync(sourceAssetPath)) {
        throw new Error(
            `Asset '${assetPath}' does not exist in ${sourceAssetsDirectory}`
        );
    }

    // handle if the asset is within a subfolder
    if (path.dirname(assetPath) !== ".") {
        const buildAssetSubDirectory = path.dirname(buildAssetPath);

        if (!fs.existsSync(buildAssetSubDirectory)) {
            fs.mkdirSync(buildAssetSubDirectory);
        }
    }

    fs.copyFileSync(sourceAssetPath, buildAssetPath);

    return {
        path: `assets/${assetPath}`,
    };
}
