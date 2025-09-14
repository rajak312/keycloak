/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/KcContext.ts" --revert
 */

import type { KcContextLike } from "@keycloakify/keycloak-admin-ui";
import type { KcEnvName } from "../kc.gen";

export type KcContext = KcContextLike & {
    themeType: "admin";
    themeName: string;
    properties: Record<KcEnvName, string>;
};
