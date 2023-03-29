import * as fs from "fs";
import * as path from "path";
import { VNode } from "preact";
import { render } from "preact-render-to-string";

import { buildAndSaveStyles } from "./plugins/styled/styled";
import { Document } from "./components/Document";
import { HomePage } from "./pages/HomePage";
import { buildAssets } from "./plugins/assets";

export interface PageConfig {
    route: string;
    page: (props: { route: string }) => VNode;
}

const pages: PageConfig[] = [{ route: "index", page: HomePage }];

for (const { route, page: Page } of pages) {
    const page = <Page route={route} />;

    // render page to populate styles
    render(page);

    const rootDir = getRootDir();
    const srcDir = getSrcDir(rootDir);
    const buildDir = createBuildDir(rootDir);

    const stylesheet = buildAndSaveStyles(buildDir, route);
    buildAssets(srcDir, buildDir);

    const document = (
        <Document title="Jasper H" stylesheet={stylesheet}>
            {page}
        </Document>
    );

    const html = render(document, null, { pretty: true });

    fs.writeFileSync(`${buildDir}/${route}.html`, html);
}

function getRootDir() {
    return path.resolve(__dirname, "../");
}

function getSrcDir(rootDir: string) {
    return path.resolve(rootDir, "src");
}

function createBuildDir(rootDir: string) {
    const buildDir = path.resolve(rootDir, "build");

    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir);
    }

    return buildDir;
}
