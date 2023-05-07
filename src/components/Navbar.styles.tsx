import { styled } from "@plugins/styled";
import { padding, colors, backgroundColors, fonts } from "@styles";

export const Navbar = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${padding.md};
    background-color: ${backgroundColors.dark};
`;

export interface NavbarLinkProps {
    href: string;
    selected: boolean;
    children: string;
}

export const NavbarLink = styled.a<NavbarLinkProps>`
    padding: ${padding.md};
    color: ${props => (props.selected ? colors.white : colors.grey)};
    font-size: ${fonts.size.xs};
    letter-spacing: ${fonts.spacing.narrow};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover,
    &:focus {
        color: ${colors.white};
    }
`;
