/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/realm-settings/security-defences/Time.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { TimeSelectorControl } from "../../components/time-selector/TimeSelectorControl";

export const Time = ({ name, style }: { name: string; style?: CSSProperties }) => {
    const { t } = useTranslation();
    return (
        <TimeSelectorControl
            name={name}
            style={style}
            label={t(name)}
            labelIcon={t(`${name}Help`)}
            controller={{
                defaultValue: "",
                rules: { required: t("required") }
            }}
        />
    );
};
