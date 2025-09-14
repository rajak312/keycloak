/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/context/auth/admin-ui-endpoint.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import KeycloakAdminClient, { fetchWithError } from "@keycloak/keycloak-admin-client";
import { getAuthorizationHeaders } from "../../utils/getAuthorizationHeaders";
import { joinPath } from "../../utils/joinPath";
import { UiRealmInfo } from "./uiRealmInfo";

export async function fetchAdminUI<T>(
    adminClient: KeycloakAdminClient,
    endpoint: string,
    query?: Record<string, string>
): Promise<T> {
    const accessToken = await adminClient.getAccessToken();
    const baseUrl = adminClient.baseUrl;

    const response = await fetchWithError(
        joinPath(
            baseUrl,
            "admin/realms",
            encodeURIComponent(adminClient.realmName),
            endpoint
        ) + (query ? "?" + new URLSearchParams(query) : ""),
        {
            method: "GET",
            headers: getAuthorizationHeaders(accessToken)
        }
    );

    return await response.json();
}

export async function fetchRealmInfo(
    adminClient: KeycloakAdminClient
): Promise<UiRealmInfo> {
    return fetchAdminUI(adminClient, `ui-ext/info`);
}
