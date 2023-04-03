import type { JSX } from "preact/jsx-runtime";

import { useStylesheet } from "@plugins/stylesheet";
import { createHash } from "./utils";

export type PropExpression<P> = (props: P) => string | number;
/** 
 * Possible expressions in a `StyledComponent`'s tagged template string.
 * @example 
 * ```ts
    const height = "24 rem"; 
    const width = 24; 
    const Div = styled.div`
        height: ${height}; // string expression
        width: ${width}; // number expression, shorthand for px
        color: ${(props) => props.color}; // prop expression
    `;
    ```
 */
export type StyledTaggedTemplateExpression<P> =
    | string
    | number
    | PropExpression<P>;

/**
 * Creates a tag function for an element of `tag`.
 * @param tag element tag, eg. `div`, `a`, `span`...
 * @returns `StyledComponent` tag function
 */
export function factory<T extends keyof JSX.IntrinsicElements>(tag: T) {
    /**
     * Tag function to create a `StyledComponent`, called with a tagged template string.
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates Tagged Template Strings}
     * for how a tagged template string & its expressions are passed to this function.
     */
    return function styledTagFunction<
        P extends object = JSX.IntrinsicElements[T]
    >(
        strings: TemplateStringsArray,
        ...expressions: StyledTaggedTemplateExpression<P>[]
    ) {
        function StyledComponent(props: P) {
            const stylesheet = useStylesheet();

            const css = buildCss(strings, expressions, props);

            // hash CSS string to keep className the same across renders
            const generatedClassName = `${tag}-${createHash(css)}`;

            stylesheet.append(`.${generatedClassName} {${css}}`);

            const className =
                "className" in props
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

export function buildCss<P>(
    strings: TemplateStringsArray,
    expressions: StyledTaggedTemplateExpression<P>[],
    props: P
) {
    let css = "";

    strings.forEach((string, index) => {
        css += string;

        const expression = expressions[index];

        if (expression) {
            css += buildExpression(expression, props);
        }
    });

    return css;
}

export function buildExpression<P>(
    expression: StyledTaggedTemplateExpression<P>,
    props: P
) {
    if (typeof expression === "function") {
        const value = expression(props);

        if (typeof value === "number") {
            return `${value}px`;
        } else {
            return value;
        }
    } else if (typeof expression === "number") {
        return `${expression}px`;
    } else {
        return expression;
    }
}
