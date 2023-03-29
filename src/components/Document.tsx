import { ComponentChildren } from "preact";

export interface DocumentProps {
    title: string;
    stylesheet: ComponentChildren;
    children: ComponentChildren;
}

export function Document({ title, stylesheet, children }: DocumentProps) {
    return (
        <html>
            <head>
                <title>{title}</title>
                {stylesheet}
            </head>
            <body>{children}</body>
        </html>
    );
}
