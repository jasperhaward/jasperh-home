import { styled } from "@plugins/styled";
import { ComponentChildren } from "preact";

export interface BodyProps {
    backgroundImg: string;
    children: ComponentChildren;
}

export const Body = styled.body<BodyProps>`
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: "proxima-nova";
    background-image: ${props => `url(${props.backgroundImg})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
`;
