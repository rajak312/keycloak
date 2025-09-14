/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/advanced/ApplicationUrls.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { TextControl } from "../../../shared/keycloak-ui-shared";

type ApplicationUrlsProps = {
    isDisabled?: boolean;
};

export const ApplicationUrls = (props: ApplicationUrlsProps) => {
    const { t } = useTranslation();

    return (
        <>
            <TextControl
                name="attributes.logoUri"
                label={t("logoUrl")}
                labelIcon={t("logoUrlHelp")}
                type="url"
                {...props}
            />
            <TextControl
                name="attributes.policyUri"
                label={t("policyUrl")}
                labelIcon={t("policyUrlHelp")}
                type="url"
                {...props}
            />
            <TextControl
                name="attributes.tosUri"
                label={t("termsOfServiceUrl")}
                labelIcon={t("termsOfServiceUrlHelp")}
                type="url"
                {...props}
            />
        </>
    );
};
