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
