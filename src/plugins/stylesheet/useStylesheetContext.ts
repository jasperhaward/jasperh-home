import { useContext } from "preact/hooks";
import { StylesheetContext } from ".";

export function useStyleSheetContext() {
    const stylesheetContext = useContext(StylesheetContext);

    if (!stylesheetContext) {
        throw new Error(
            "<StylesheetContextProvider /> must be initialised before calling useStylesheet()."
        );
    }

    return stylesheetContext;
}
