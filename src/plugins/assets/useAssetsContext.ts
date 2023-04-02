import { useContext } from "preact/hooks";
import { AssetsContext } from "./AssetsContext";

export function useAssetsContext() {
    const assetsContext = useContext(AssetsContext);

    if (!assetsContext) {
        throw new Error(
            "<AssetsContextProvider /> must be initialised before calling useAsset()."
        );
    }

    return assetsContext;
}
