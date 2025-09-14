/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/authentication/BuildInLabel.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Label } from "../../shared/@patternfly/react-core";
import { CheckCircleIcon } from "../../shared/@patternfly/react-icons";
import { useTranslation } from "react-i18next";

import style from "./build-in-label.module.css";

export const BuildInLabel = () => {
    const { t } = useTranslation();

    return (
        <Label icon={<CheckCircleIcon className={style.icon} />}>{t("buildIn")}</Label>
    );
};
