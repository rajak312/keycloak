/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/error/ErrorRenderer.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { NetworkError } from "@keycloak/keycloak-admin-client";
import { type FallbackProps } from "../../../shared/keycloak-ui-shared";
import {
    Alert,
    AlertActionCloseButton,
    AlertActionLink,
    AlertVariant,
    PageSection
} from "../../../shared/@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const ErrorRenderer = ({ error }: FallbackProps) => {
    const { t } = useTranslation();

    const reset = () => {
        window.location.href = window.location.origin + window.location.pathname;
    };

    let message;
    if (error instanceof NetworkError && error.response.status === 403) {
        message = t("forbiddenAdminConsole");
    } else {
        message = error.message;
    }
    return (
        <PageSection>
            <Alert
                isInline
                variant={AlertVariant.danger}
                title={message}
                actionClose={
                    <AlertActionCloseButton title={error.message} onClose={reset} />
                }
                actionLinks={
                    <AlertActionLink onClick={() => (location.href = "/")}>
                        {t("home")}
                    </AlertActionLink>
                }
            ></Alert>
        </PageSection>
    );
};
