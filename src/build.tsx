import * as fs from "fs";
import * as path from "path";
import { FunctionComponent } from "preact";
import { render } from "preact-render-to-string";

import { AssetsContextProvider } from "@plugins/assets";
import { StylesheetContextProvider } from "@plugins/stylesheet";
import routes from "./routes";

export interface PageProps {
    route: string;
}

export interface RouteConfig {
    route: string;
    page: FunctionComponent<PageProps>;
}

const sourceDirectory = path.resolve(__dirname, "../src");
const buildDirectory = path.resolve(__dirname, "../build");

if (fs.existsSync(buildDirectory)) {
    fs.rmSync(buildDirectory, { recursive: true, force: true });
}

fs.mkdirSync(buildDirectory);

for (const { route, page: Page } of routes) {
    const page = (
        <AssetsContextProvider
            sourceDirectory={sourceDirectory}
            buildDirectory={buildDirectory}
        >
            <StylesheetContextProvider
                filename={`${route}.css`}
                buildDirectory={buildDirectory}
            >
                <Page route={route} />
            </StylesheetContextProvider>
        </AssetsContextProvider>
    );

    const html = render(page, null, { pretty: true });

    fs.writeFileSync(`${buildDirectory}/${route}.html`, html);
}

console.log(`Successfully created build at '${buildDirectory}'\n`);
