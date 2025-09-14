/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/permissions-configuration/routes/PermissionsConfiguration.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { lazy } from "react";
import type { Path } from "react-router-dom";
import { generateEncodedPath } from "../../utils/generateEncodedPath";
import type { AppRouteObject } from "../../routes";

export type PermissionsConfigurationParams = { realm: string };

const PermissionsConfigurationSection = lazy(
    () => import("../PermissionsConfigurationSection")
);

export const PermissionsConfigurationRoute: AppRouteObject = {
    path: "/:realm/permissions",
    element: <PermissionsConfigurationSection />,
    breadcrumb: t => t("titlePermissions"),
    handle: {
        access: ["view-realm", "view-clients", "view-users"]
    }
};

export const toPermissionsConfiguration = (
    params: PermissionsConfigurationParams
): Partial<Path> => ({
    pathname: generateEncodedPath(PermissionsConfigurationRoute.path, params)
});
