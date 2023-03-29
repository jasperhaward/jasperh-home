import { useAsset } from "../plugins/assets";
import styled from "../plugins/styled/styled";

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

export function HomePage({ route }: HomePageProps) {
    const backgroundImg = useAsset("images/background.jpg");

    return (
        <div>
            <Div>STYLED DIV</Div>
            <AnotherDiv>ANOTHER DIV</AnotherDiv>
            <AnotherDivAgain>ANOTHER DIV AGAIN</AnotherDivAgain>
            <DivUsingFunc color="yellow">yellow</DivUsingFunc>
            <DivUsingFunc color="black">black</DivUsingFunc>
            <img src={backgroundImg} />
            <h1>Hello {route}</h1>
        </div>
    );
}
