/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/admin-client.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import KeycloakAdminClient from "@keycloak/keycloak-admin-client";
import { createNamedContext, useRequiredContext } from "../shared/keycloak-ui-shared";
import type Keycloak from "keycloak-js";
import type { Environment } from "./environment";

export type AdminClientProps = {
    keycloak: Keycloak;
    adminClient: KeycloakAdminClient;
};

export const AdminClientContext = createNamedContext<AdminClientProps | undefined>(
    "AdminClientContext",
    undefined
);

export const useAdminClient = () => useRequiredContext(AdminClientContext);

export async function initAdminClient(keycloak: Keycloak, environment: Environment) {
    const adminClient = new KeycloakAdminClient();

    adminClient.setConfig({ realmName: environment.realm });
    adminClient.baseUrl = environment.adminBaseUrl;
    adminClient.registerTokenProvider({
        async getAccessToken() {
            try {
                await keycloak.updateToken(5);
            } catch {
                await keycloak.login();
            }

            return keycloak.token;
        }
    });

    return adminClient;
}
