import { useAsset } from "@plugins/assets";
import { useStylesheet } from "@plugins/stylesheet";
import { styled } from "@plugins/styled";
import { Document } from "@components";

export interface HomePageProps {
    route: string;
}

const Div = styled.div`
    color: red;
`;

const height = 24;
const width = "24rem";

interface AnotherDivProps {
    hide: boolean;
    children: string;
}

const AnotherDiv = styled.div<AnotherDivProps>`
    height: ${height};
    width: ${width};
    color: green;
    display: ${(props) => (props.hide ? "none" : "block")};
`;

interface DivUsingFuncProps {
    color: "yellow" | "black";
    children: string;
}

const DivUsingFunc = styled.div<DivUsingFuncProps>`
    color: ${(props) => props.color};
`;

const Link = styled.a`
    color: pink;

    &:hover {
        color: red;
    }
`;

export default function HomePage({ route }: HomePageProps) {
    const stylesheet = useStylesheet();
    const backgroundImg = useAsset("images/background.jpg");

    return (
        <Document title="Jasper H" stylesheet={stylesheet}>
            <Div>STYLED DIV</Div>
            <AnotherDiv hide={false}>ANOTHER DIV</AnotherDiv>
            <AnotherDiv hide>ANOTHER DIV HIDDEN</AnotherDiv>
            <DivUsingFunc color="yellow">yellow</DivUsingFunc>
            <DivUsingFunc color="black">black</DivUsingFunc>
            <img src={backgroundImg.path} />
            <h1>Hello {route}</h1>
            <Link href="links">Links</Link>
        </Document>
    );
}
