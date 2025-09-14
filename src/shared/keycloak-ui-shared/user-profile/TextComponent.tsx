/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/user-profile/TextComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { TextInput, TextInputTypes } from "../../@patternfly/react-core";

import { UserProfileFieldProps } from "./UserProfileFields";
import { UserProfileGroup } from "./UserProfileGroup";
import { fieldName, isRequiredAttribute, label } from "./utils";

export const TextComponent = (props: UserProfileFieldProps) => {
    const { form, inputType, attribute } = props;
    const isRequired = isRequiredAttribute(attribute);
    const type = inputType.startsWith("html")
        ? (inputType.substring("html".length + 2) as TextInputTypes)
        : "text";

    return (
        <UserProfileGroup {...props}>
            <TextInput
                id={attribute.name}
                data-testid={attribute.name}
                type={type}
                placeholder={
                    attribute.readOnly
                        ? ""
                        : label(
                              props.t,
                              attribute.annotations?.["inputTypePlaceholder"] as string,
                              "",
                              attribute.annotations?.[
                                  "inputOptionLabelsI18nPrefix"
                              ] as string
                          )
                }
                readOnly={attribute.readOnly}
                isRequired={isRequired}
                {...form.register(fieldName(attribute.name))}
            />
        </UserProfileGroup>
    );
};
