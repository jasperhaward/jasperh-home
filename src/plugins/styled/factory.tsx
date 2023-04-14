import { JSX } from "preact";
import * as sass from "sass";

import { useStylesheet } from "@plugins/stylesheet";
import { createHash } from "./utils";
import { toHTMLAttributes } from "./attributes";

export type PropExpression<P> = (props: P) => string | number;
/** 
 * Possible expressions in a `StyledComponent`'s tagged template string.
 * @example 
 * ```ts
    const height = "24 rem"; 
    const width = 24; 
    const Div = styled.div`
        height: ${height}; // string expression
        width: ${width}; // number expression, shorthand for `24px`
        color: ${(props) => props.color}; // prop expression
    `;
    ```
 */
export type StyledTaggedTemplateExpression<P> =
    | string
    | number
    | PropExpression<P>;

/**
 * Creates a tag function for an element of `type`.
 * @param type element type, eg. `div`, `a`, `span`...
 * @returns `StyledComponent` tag function
 */
export function factory<T extends keyof JSX.IntrinsicElements>(type: T) {
    const Type = type;

    /**
     * Tag function to create a `StyledComponent`, called with a tagged template string.
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates Tagged Template Strings}
     * for how a tagged template string & its expressions are passed to this function.
     */
    return function styledTagFunction<P = JSX.IntrinsicElements[T]>(
        strings: TemplateStringsArray,
        ...expressions: StyledTaggedTemplateExpression<P>[]
    ) {
        function StyledComponent(props: P) {
            const stylesheet = useStylesheet();

            const scss = createScss(strings, expressions, props);
            const className = createClassName(type, scss);

            const result = sass.compileString(`.${className} {${scss}}`);

            stylesheet.append(result.css);

            const attributes = toHTMLAttributes(props);

            // Preact's createElement function does not play nice with generic element types...
            // @ts-ignore
            return <Type className={className} {...attributes} />;
        }

        return StyledComponent;
    };
}

/**
 * Creates a `StyledComponent`'s SCSS. Assumes the first and
 * last elements of the template string are strings.
 * @example
 * // notice how there is a line break/string after the opening backtick (`)
 * const Div = styled.div`
 *    color: red;
 *    height: 21px;
 * `;
 * // and before the trailing backtick
 */
export function createScss<P>(
    strings: TemplateStringsArray,
    expressions: StyledTaggedTemplateExpression<P>[],
    props: P
) {
    let scss = "";

    strings.forEach((string, index) => {
        scss += string;

        const expression = expressions[index];

        if (expression) {
            scss += buildExpression(expression, props);
        }
    });

    return scss;
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

/**
 * Creates a `StyledComponent`'s className. Hashes the SCSS styling to keep
 * the className the same across renders.
 * @returns className - eg `.div-e70a8756`
 */
export function createClassName(
    tag: keyof JSX.IntrinsicElements,
    scss: string
) {
    return `${tag}-${createHash(scss)}`;
}
