/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/authorization/MoreLabel.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { Label } from "../../../shared/@patternfly/react-core";

type MoreLabelProps = {
    array: unknown[] | undefined;
};

export const MoreLabel = ({ array }: MoreLabelProps) => {
    const { t } = useTranslation();

    if (!array || array.length <= 1) {
        return null;
    }
    return <Label color="blue">{t("more", { count: array.length - 1 })}</Label>;
};
