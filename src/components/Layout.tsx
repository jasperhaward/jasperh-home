import { ComponentChildren } from "preact";

import { useAsset } from "@plugins/assets";
import { links } from "@config";
import {
    Navbar,
    Footer,
    FooterText,
    FooterIcons,
    IconLink,
    NavbarLink,
} from ".";
import * as S from "./Layout.styles";

export interface LayoutProps {
    children: ComponentChildren;
}

export function Layout({ children }: LayoutProps) {
    const backgroundImg = useAsset("images/background.jpg");

    return (
        <S.Body backgroundImg={backgroundImg.path}>
            <Navbar>
                <NavbarLink href="/">HOME</NavbarLink>
                <NavbarLink href="/about">ABOUT</NavbarLink>
                <NavbarLink href="/links">LINKS</NavbarLink>
            </Navbar>
            {children}
            <Footer>
                <FooterText>Built with Preact, TypeScript & SASS.</FooterText>
                <FooterIcons>
                    <IconLink href={links.github} icon={["fab", "github"]} />
                    <IconLink
                        href={links.linkedin}
                        icon={["fab", "linkedin"]}
                    />
                    <IconLink href={links.steam} icon={["fab", "steam"]} />
                    <IconLink href={links.email} icon={["fas", "envelope"]} />
                </FooterIcons>
                <FooterText>
                    © 2021 Jasper Haward, All Rights Reserved.
                </FooterText>
            </Footer>
        </S.Body>
    );
}
