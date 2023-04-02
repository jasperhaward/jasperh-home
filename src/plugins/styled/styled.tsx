import type { JSX } from "preact/jsx-runtime";

import { useStylesheet } from "../stylesheet";
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
export function div<
    T extends JSX.HTMLAttributes<HTMLDivElement> = JSX.HTMLAttributes<HTMLDivElement>
>(css: string | ((props: T) => string)) {
    function StyledComponent(props: T) {
        const stylesheet = useStylesheet();

        const style = typeof css === "string" ? css : css(props);

        // hash css string to keep className the same across renders
        const generatedClassName = `div-${createHash(style)}`;

        stylesheet.append(`.${generatedClassName} {${style}}`);

        const className = props.className
            ? `${generatedClassName} ${props.className}`
            : generatedClassName;

        return <div className={className} {...props} />;
    }

    return StyledComponent;
}
