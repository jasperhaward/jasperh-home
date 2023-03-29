import * as fs from "fs";
import * as path from "path";
import { createContext } from "preact";

export interface TAssetsContext {
    sourceDirectory: string;
    buildDirectory: string;
}

export const AssetsContext = createContext<TAssetsContext>(
    {} as TAssetsContext
);

const assetPaths: string[] = [];

export function useAsset(assetPath: string) {
    assetPaths.push(assetPath);

    return `assets/${assetPath}`;
}

export function buildAssets(srcDir: string, buildDir: string) {
    const assetsSrcDir = getSrcAssetsDir(srcDir);
    const assetsBuildDir = createBuildAssetsDir(buildDir);

    for (const assetPath of assetPaths) {
        copyAsset(assetsSrcDir, assetsBuildDir, assetPath);
    }
}

function getSrcAssetsDir(srcDir: string) {
    const assetsSrcDir = path.resolve(srcDir, "assets");

    if (!fs.existsSync(assetsSrcDir)) {
        throw new Error(`No assets directory in '${srcDir}/'`);
    }

    return assetsSrcDir;
}

function createBuildAssetsDir(buildDir: string) {
    const assetsBuildDir = path.resolve(buildDir, "assets");

    if (!fs.existsSync(assetsBuildDir)) {
        fs.mkdirSync(assetsBuildDir);
    }

    return assetsBuildDir;
}

function copyAsset(
    assetsSrcDir: string,
    assetsBuildDir: string,
    assetPath: string
) {
    const assetSrcPath = path.resolve(assetsSrcDir, assetPath);
    const assetBuildPath = path.resolve(assetsBuildDir, assetPath);

    if (!fs.existsSync(assetSrcPath)) {
        throw new Error(
            `Asset '${assetPath}' does not exist in ${assetsSrcDir}`
        );
    }

    // handle if we need to create nested directories in the build/assets folder
    if (assetPath.includes("/")) {
        // extract directories from asset path, eg 'images' from 'images/background.jpg'
        const assetNestedDir = assetPath.substring(
            0,
            assetPath.lastIndexOf("/")
        );
        const nestedBuildDir = `${assetsBuildDir}/${assetNestedDir}`;

        if (!fs.existsSync(nestedBuildDir)) {
            fs.mkdirSync(nestedBuildDir);
        }
    }

    fs.copyFileSync(assetSrcPath, assetBuildPath);
}
