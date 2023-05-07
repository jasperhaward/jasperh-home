import { createContext } from "preact";

export interface IStyledContext {
    /**
     * Previously used classNames which have been appended to
     * the current style sheet. Used to determine if a CSS class
     * should be appended to the style sheet or not.
     */
    classNames: string[];
}

export const StyledContext = createContext<IStyledContext>({
    classNames: [],
});
