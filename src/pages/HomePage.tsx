import { useAsset } from "../plugins/assets";
import { styled } from "../plugins/styled";
import { useStylesheet } from "../plugins/stylesheet";
import { Document } from "../components/Document";

export interface HomePageProps {
    route: string;
}

const Div = styled.div(`
    color: red;
`);

const AnotherDiv = styled.div(`
    color: green;
`);

const AnotherDivAgain = styled.div(`
    color: blue;
`);

interface DivUsingFuncProps {
    color: "yellow" | "black";
    children: string;
}

const DivUsingFunc = styled.div<DivUsingFuncProps>(
    (props) => `
    color: ${props.color};
`
);

export default function HomePage({ route }: HomePageProps) {
    const stylesheet = useStylesheet();
    const backgroundImg = useAsset("images/background.jpg");

    return (
        <Document title="Jasper H" stylesheet={stylesheet}>
            <Div>STYLED DIV</Div>
            <AnotherDiv>ANOTHER DIV</AnotherDiv>
            <AnotherDivAgain>ANOTHER DIV AGAIN</AnotherDivAgain>
            <DivUsingFunc color="yellow">yellow</DivUsingFunc>
            <DivUsingFunc color="black">black</DivUsingFunc>
            <img src={backgroundImg} />
            <h1>Hello {route}</h1>
        </Document>
    );
}
