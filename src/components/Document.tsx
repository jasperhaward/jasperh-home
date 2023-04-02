import { ComponentChildren } from "preact";
import { Stylesheet } from "../plugins/stylesheet";

export interface DocumentProps {
    title: string;
    stylesheet: Stylesheet;
    children: ComponentChildren;
}

export function Document({ title, stylesheet, children }: DocumentProps) {
    return (
        <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href={stylesheet.filename} />
            </head>
            <body>{children}</body>
        </html>
    );
}
