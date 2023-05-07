import { useStylesheet } from "@plugins/stylesheet";
import { StyledContext } from "@plugins/styled";
import { RouteContext } from "@context";
import { Document, Layout } from "@components";

export interface HomePageProps {
    route: string;
}

export default function HomePage({ route }: HomePageProps) {
    const stylesheet = useStylesheet();

    return (
        <RouteContext.Provider value={route}>
            <StyledContext.Provider value={{ classNames: [] }}>
                <Document title="Jasper H" stylesheet={stylesheet}>
                    <Layout>
                        <div>JASPER HAWARD</div>
                    </Layout>
                </Document>
            </StyledContext.Provider>
        </RouteContext.Provider>
    );
}
