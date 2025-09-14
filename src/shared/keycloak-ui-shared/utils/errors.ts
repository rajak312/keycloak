/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/utils/errors.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { NetworkError } from "@keycloak/keycloak-admin-client";

const ERROR_FIELDS = ["error", "errorMessage"];
const ERROR_DESCRIPTION_FIELD = "error_description";

export function getErrorMessage(error: unknown) {
    if (typeof error === "string") {
        return error;
    }

    if (error instanceof NetworkError) {
        return getNetworkErrorMessage(error.responseData);
    }

    if (error instanceof Error) {
        return error.message;
    }

    throw new Error("Unable to determine error message.");
}

export function getErrorDescription(error: unknown) {
    if (!(error instanceof NetworkError)) {
        return;
    }

    const data = error.responseData;

    return getNetworkErrorDescription(data);
}

export function getNetworkErrorDescription(data: unknown) {
    if (
        typeof data === "object" &&
        data !== null &&
        ERROR_DESCRIPTION_FIELD in data &&
        typeof data[ERROR_DESCRIPTION_FIELD] === "string"
    ) {
        return data[ERROR_DESCRIPTION_FIELD];
    }
}

export function getNetworkErrorMessage(data: unknown) {
    if (typeof data !== "object" || data === null) {
        return;
    }

    for (const key of ERROR_FIELDS) {
        const value = (data as Record<string, unknown>)[key];

        if (typeof value === "string") {
            return value;
        }
    }
}
