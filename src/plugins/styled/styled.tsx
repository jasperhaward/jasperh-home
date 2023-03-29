import * as fs from "fs";
import type { JSX } from "preact/jsx-runtime";
import { createHash } from "./utils";

/**
 * CSS classes created by styled components.
 * @example class
 * ```css
 * .div-1a345op {
 *      color: red;
 *      width: 100px;
 * }
 * ```
 */
export const classes: string[] = [];

function div<
    T extends JSX.HTMLAttributes<HTMLDivElement> = JSX.HTMLAttributes<HTMLDivElement>
>(css: string | ((props: T) => string)) {
    function StyledComponent(props: T) {
        const style = typeof css === "string" ? css : css(props);

        // hash css string to keep className the same across renders
        const generatedClassName = `div-${createHash(style)}`;

        classes.push(`.${generatedClassName} {${style}}`);

        const className = props.className
            ? `${generatedClassName} ${props.className}`
            : generatedClassName;

        return <div className={className} {...props} />;
    }

    return StyledComponent;
}

export default { div };

export function buildAndSaveStyles(buildDir: string, route: string) {
    const cssFile = `${route}.css`;
    const cssOutput = classes.join("\n\n");

    fs.writeFileSync(`${buildDir}/${cssFile}`, cssOutput);

    return <link rel="stylesheet" href={cssFile} />;
}
