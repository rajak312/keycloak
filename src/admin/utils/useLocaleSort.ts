/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/utils/useLocaleSort.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useWhoAmI } from "../context/whoami/WhoAmI";

export type ValueMapperFn<T> = (item: T) => string | undefined;

export default function useLocaleSort() {
    const { whoAmI } = useWhoAmI();

    return function localeSort<T>(items: T[], mapperFn: ValueMapperFn<T>): T[] {
        const locale = whoAmI.getLocale();

        return [...items].sort((a, b) => {
            const valA = mapperFn(a);
            const valB = mapperFn(b);

            if (valA === undefined || valB === undefined) {
                return 0;
            }

            return valA.localeCompare(valB, locale);
        });
    };
}

// TODO: This might be built into TypeScript into future.
// See: https://github.com/microsoft/TypeScript/issues/48992
type KeysMatching<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export const mapByKey =
    <T extends { [_ in K]?: string }, K extends KeysMatching<T, string | undefined>>(
        key: K
    ) =>
    (item: T) =>
        item[key];
