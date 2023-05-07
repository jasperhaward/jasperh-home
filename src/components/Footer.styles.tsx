import { styled } from "@plugins/styled";
import { colors, backgroundColors, fonts, padding } from "@styles";

export const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${padding.md};
    background-color: ${backgroundColors.dark};
`;

export const FooterText = styled.div`
    color: ${colors.grey};
    font-size: ${fonts.size.xs};
    letter-spacing: ${fonts.spacing.narrow};
`;

export const FooterIcons = styled.div`
    display: flex;
    gap: ${padding.sm};
`;
