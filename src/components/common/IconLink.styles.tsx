import { styled } from "@plugins/styled";
import { colors, fonts, padding } from "@styles";

export const IconLink = styled.a`
    margin: 0 ${padding.sm};
    color: ${colors.white};
    font-size: ${fonts.size.lg};
    transition: color 0.3s ease;

    &:hover,
    &:focus {
        color: ${colors.grey};
    }
`;
