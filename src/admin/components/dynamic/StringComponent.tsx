/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/dynamic/StringComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { TextControl } from "../../../shared/keycloak-ui-shared";
import { useTranslation } from "react-i18next";
import type { ComponentProps } from "./components";

export const StringComponent = ({
    name,
    label,
    helpText,
    convertToName,
    ...props
}: ComponentProps) => {
    const { t } = useTranslation();

    return (
        <TextControl
            name={convertToName(name!)}
            label={t(label!)}
            labelIcon={t(helpText!)}
            data-testid={name}
            {...props}
        />
    );
};
