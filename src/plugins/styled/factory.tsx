import type { JSX } from "preact/jsx-runtime";

import { useStylesheet } from "@plugins/stylesheet";
import { createHash } from "./utils";

/**
 * Creates a styled component builder function.
 * @param tag element tag, eg. `div`, `a`, `span`...
 */
export function factory<T extends keyof JSX.IntrinsicElements>(tag: T) {
    /**
     * Creates a styled component.
     * @param css component styling/css or a function that returns the component styling/css
     */
    return function styled<P extends JSX.IntrinsicElements[T]>(
        css: string | ((props: P) => string)
    ) {
        function StyledComponent(props: P) {
            const stylesheet = useStylesheet();

            const style = typeof css === "string" ? css : css(props);

            // hash css string to keep className the same across renders
            const generatedClassName = `${tag}-${createHash(style)}`;

            stylesheet.append(`.${generatedClassName} {${style}}`);

            const className = props.className
                ? `${generatedClassName} ${props.className}`
                : generatedClassName;

            const Tag = tag;

            // we are typing the props correctly with `P extends JSX.IntrinsicElements[T]`,
            // the ts ignore is a necessary evil :(
            // @ts-ignore
            return <Tag className={className} {...props} />;
        }

        return StyledComponent;
    };
}
