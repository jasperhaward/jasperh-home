import { useContext } from "preact/hooks";

import { RouteContext } from "@context";
import * as S from "./Navbar.styles";

export const Navbar = S.Navbar;

export type NavbarLinkProps = Omit<S.NavbarLinkProps, "selected">;

export function NavbarLink({ href, children }: NavbarLinkProps) {
    const route = useContext(RouteContext);

    function isSelectedLink(href: string) {
        if (href === "/") {
            return route === "index";
        }

        return href.includes(route);
    }

    return (
        <S.NavbarLink href={href} selected={isSelectedLink(href)}>
            {children}
        </S.NavbarLink>
    );
}
