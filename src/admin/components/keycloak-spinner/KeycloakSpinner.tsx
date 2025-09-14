/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/keycloak-spinner/KeycloakSpinner.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Bullseye, Spinner } from "../../../shared/@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const KeycloakSpinner = () => {
    const { t } = useTranslation();

    return (
        <Bullseye>
            <Spinner aria-label={t("spinnerLoading")} />
        </Bullseye>
    );
};
