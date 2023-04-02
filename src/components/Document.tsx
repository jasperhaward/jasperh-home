import { ComponentChildren } from "preact";

import { useAsset } from "../plugins/assets";
import { Stylesheet } from "../plugins/stylesheet";

export interface DocumentProps {
    title: string;
    stylesheet: Stylesheet;
    children: ComponentChildren;
}

export function Document({ title, stylesheet, children }: DocumentProps) {
    const fonts = useAsset("css/fonts.css");

    return (
        <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href={fonts.path} />
                <link rel="stylesheet" href={stylesheet.filename} />
            </head>
            <body>{children}</body>
        </html>
    );
}
