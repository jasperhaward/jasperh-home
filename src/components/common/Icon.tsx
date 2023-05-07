import { createElement } from "preact";
import {
    library,
    IconPrefix,
    IconName,
    icon as factory,
    dom,
} from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faLinkedin,
    faGithub,
    faSteam,
} from "@fortawesome/free-brands-svg-icons";

library.add({
    faEnvelope,
    faLinkedin,
    faGithub,
    faSteam,
});

console.log(dom.css());

export interface IconProps {
    icon: [IconPrefix, IconName];
}

export function Icon(props: IconProps) {
    const [prefix, iconName] = props.icon;

    const icon = factory({ prefix, iconName });

    if (icon) {
        const [element] = icon.abstract;
        const children = element.children?.map(child =>
            createElement(child.tag, child.attributes)
        );

        return createElement(element.tag, element.attributes, children);
    } else {
        throw new Error(`Icon '${iconName}' not found in library.`);
    }
}
