import type { JSX } from "preact/jsx-runtime";

import { useStylesheet } from "@plugins/stylesheet";
import { createHash } from "./utils";

export type PropSubstitutionExpression<P> = (props: P) => string;

/**
 * Creates a tag function for an element of `tag`
 * @param tag element tag, eg. `div`, `a`, `span`...
 * @returns `StyledComponent` tag function
 */
export function factory<T extends keyof JSX.IntrinsicElements>(tag: T) {
    /**
     * Tag function to create a `StyledComponent`.
     * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates Tagged Template Strings}
     * for how a tagged template string & its expressions are passed to this function.
     * @param strings array of string portions of a tagged template string
     * @param expressions array of substitution functions called with the `StyledComponent`'s props
     * @returns `StyledComponent` with applied styles
     */
    return function styledTagFunction<P extends JSX.IntrinsicElements[T]>(
        strings: TemplateStringsArray,
        ...expressions: PropSubstitutionExpression<P>[]
    ) {
        function StyledComponent(props: P) {
            const stylesheet = useStylesheet();

            const hasExpressions = expressions.length > 0;
            const isLastString = (idx: number) => idx === strings.length - 1;

            let css = "";

            strings.forEach((string, index) => {
                css += string;

                if (hasExpressions && !isLastString(index)) {
                    css += expressions[index](props);
                }
            });

            // hash css string to keep className the same across renders
            const generatedClassName = `${tag}-${createHash(css)}`;

            stylesheet.append(`.${generatedClassName} {${css}}`);

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
