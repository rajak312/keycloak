/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/realm-settings/security-defences/HelpLinkTextInput.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Trans, useTranslation } from "react-i18next";
import { TextControl } from "../../../shared/keycloak-ui-shared";
import { FormattedLink } from "../../components/external-link/FormattedLink";

type HelpLinkTextInputProps = {
    fieldName: string;
    url: string;
};

export const HelpLinkTextInput = ({ fieldName, url }: HelpLinkTextInputProps) => {
    const { t } = useTranslation();
    const name = fieldName.substring(fieldName.indexOf(".") + 1);
    return (
        <TextControl
            name={fieldName}
            label={t(name)}
            labelIcon={
                <Trans i18nKey={`${name}Help`}>
                    Default value prevents pages from being included
                    <FormattedLink href={url} title={t("learnMore")} />
                </Trans>
            }
        />
    );
};
