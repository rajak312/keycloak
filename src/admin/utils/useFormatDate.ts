/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/utils/useFormatDate.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useWhoAmI } from "../context/whoami/WhoAmI";

export const FORMAT_DATE_AND_TIME: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
    timeStyle: "short"
};

export default function useFormatDate() {
    const { whoAmI } = useWhoAmI();
    const locale = whoAmI.getLocale();

    return function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
        return date.toLocaleString(locale, options);
    };
}
