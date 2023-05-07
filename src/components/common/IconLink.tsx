import { Icon, IconProps } from "@components";
import * as S from "./IconLink.styles";

export interface IconLinkProps extends IconProps {
    href: string;
}

export function IconLink({ icon, href }: IconLinkProps) {
    return (
        <S.IconLink target="_blank" rel="noreferrer nofollow" href={href}>
            <Icon icon={icon} />
        </S.IconLink>
    );
}
