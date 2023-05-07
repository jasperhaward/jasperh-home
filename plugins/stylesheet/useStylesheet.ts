import * as fs from "fs";
import { useStyleSheetContext } from ".";

export interface Stylesheet {
    filename: string;
    append: (css: string) => void;
}

export function useStylesheet(): Stylesheet {
    const { filename, path } = useStyleSheetContext();

    function append(css: string) {
        if (!fs.existsSync(path)) {
            fs.appendFileSync(path, css);
        } else {
            fs.appendFileSync(path, `\n\n${css}`);
        }
    }

    return { filename, append };
}
