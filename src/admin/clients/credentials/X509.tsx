/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/credentials/X509.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { TextControl } from "../../../shared/keycloak-ui-shared";
import { DefaultSwitchControl } from "../../components/SwitchControl";
import { convertAttributeNameToForm } from "../../util";
import { FormFields } from "../ClientDetails";

export const X509 = () => {
    const { t } = useTranslation();
    return (
        <>
            <DefaultSwitchControl
                name={convertAttributeNameToForm<FormFields>(
                    "attributes.x509.allow.regex.pattern.comparison"
                )}
                label={t("allowRegexComparison")}
                labelIcon={t("allowRegexComparisonHelp")}
            />
            <TextControl
                name={convertAttributeNameToForm("attributes.x509.subjectdn")}
                label={t("subject")}
                labelIcon={t("subjectHelp")}
                rules={{
                    required: t("required")
                }}
            />
        </>
    );
};
