import * as fs from "fs";
import * as path from "path";
import { VNode } from "preact";
import { render } from "preact-render-to-string";

import routes from "./routes";
import { Document } from "./components/Document";
import { AssetsContextProvider } from "./plugins/assets";
import { StylesheetContextProvider } from "./plugins/stylesheet";

export interface RouteConfig {
    route: string;
    page: (props: { route: string }) => VNode;
}

for (const { route, page: Page } of routes) {
    const sourceDirectory = path.resolve(__dirname, "../src");
    const buildDirectory = path.resolve(__dirname, "../build");

    if (fs.existsSync(buildDirectory)) {
        fs.rmSync(buildDirectory, { recursive: true, force: true });
    }

    fs.mkdirSync(buildDirectory);

    //const stylesheet = buildAndSaveStyles(buildDirectory, route);

    const document = (
        <AssetsContextProvider
            sourceDirectory={sourceDirectory}
            buildDirectory={buildDirectory}
        >
            <StylesheetContextProvider
                route={route}
                buildDirectory={buildDirectory}
            >
                <Page route={route} />
            </StylesheetContextProvider>
        </AssetsContextProvider>
    );

    const html = render(document, null, { pretty: true });

    fs.writeFileSync(`${buildDirectory}/${route}.html`, html);
}
