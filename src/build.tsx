import * as fs from "fs";
import * as path from "path";
import { VNode } from "preact";
import { render } from "preact-render-to-string";

import { buildAndSaveStyles } from "./plugins/styled/styled";
import { AssetsContextProvider } from "./plugins/assets";
import { Document } from "./components/Document";
import { HomePage } from "./pages/HomePage";

export interface PageConfig {
    route: string;
    page: (props: { route: string }) => VNode;
}

const pages: PageConfig[] = [{ route: "index", page: HomePage }];

for (const { route, page: Page } of pages) {
    // const page = <Page route={route} />;

    // // render page to populate styles
    // render(page);

    const sourceDirectory = path.resolve(__dirname, "../src");
    const buildDirectory = path.resolve(__dirname, "../build");

    if (fs.existsSync(buildDirectory)) {
        fs.rmSync(buildDirectory, { recursive: true, force: true });
    }

    fs.mkdirSync(buildDirectory);

    const stylesheet = buildAndSaveStyles(buildDirectory, route);

    const document = (
        <AssetsContextProvider
            sourceDirectory={sourceDirectory}
            buildDirectory={buildDirectory}
        >
            <Document title="Jasper H" stylesheet={stylesheet}>
                <Page route={route} />
            </Document>
        </AssetsContextProvider>
    );

    const html = render(document, null, { pretty: true });

    fs.writeFileSync(`${buildDirectory}/${route}.html`, html);
}
