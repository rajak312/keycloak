/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/authentication/routes/Authentication.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { lazy } from "react";
import type { Path } from "react-router-dom";
import { generateEncodedPath } from "../../utils/generateEncodedPath";
import type { AppRouteObject } from "../../routes";

export type AuthenticationTab = "flows" | "required-actions" | "policies";

export type AuthenticationParams = { realm: string; tab?: AuthenticationTab };

const AuthenticationSection = lazy(() => import("../AuthenticationSection"));

export const AuthenticationRoute: AppRouteObject = {
    path: "/:realm/authentication",
    element: <AuthenticationSection />,
    breadcrumb: t => t("authentication"),
    handle: {
        access: ["view-realm", "view-identity-providers", "view-clients"]
    }
};

export const AuthenticationRouteWithTab: AppRouteObject = {
    ...AuthenticationRoute,
    path: "/:realm/authentication/:tab"
};

export const toAuthentication = (params: AuthenticationParams): Partial<Path> => {
    const path = params.tab ? AuthenticationRouteWithTab.path : AuthenticationRoute.path;

    return {
        pathname: generateEncodedPath(path, params)
    };
};
