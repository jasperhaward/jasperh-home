import { JSX } from "preact";

export type HTMLAttributes = {
    [K in keyof JSX.HTMLAttributes]: boolean;
};

/**
 * List of attributes which should be passed to rendered
 * HTML elements. Partial list for now...
 */
export const attributes: HTMLAttributes = {
    children: true,
    target: true,
    rel: true,
    href: true,
    onClick: true,
    onChange: true,
};

export function isHTMLAttribute(key: string): key is keyof JSX.HTMLAttributes {
    return key in attributes;
}

export function isHTMLAttributeValue<K extends keyof JSX.HTMLAttributes>(
    key: K,
    value: unknown
): value is JSX.HTMLAttributes[K] {
    return (
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "function" ||
        typeof value === "string"
    );
}

/**
 * Returns all props which are valid HTML attributes.
 * Determines which props, if any, are passed to the
 * rendered HTML/DOM element from a `StyledComponent`'s props.
 */
export function toHTMLAttributes<P>(props: P): JSX.HTMLAttributes {
    const attributes: JSX.HTMLAttributes = {};

    for (const key in props) {
        const value = props[key];

        if (isHTMLAttribute(key)) {
            // @ts-ignore
            attributes[key] = value;
        } else {
            console.log(`Omitted prop '${key}' of type '${typeof value}'`);
        }
    }

    return attributes;
}
