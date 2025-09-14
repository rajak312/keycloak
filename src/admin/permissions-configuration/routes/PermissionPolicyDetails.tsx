/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/permissions-configuration/routes/PermissionPolicyDetails.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { lazy } from "react";
import type { Path } from "react-router-dom";
import { generateEncodedPath } from "../../utils/generateEncodedPath";
import type { AppRouteObject } from "../../routes";

export type PermissionPolicyDetailsParams = {
    realm: string;
    permissionClientId: string;
    policyId: string;
    policyType: string;
};

const PermissionPolicyDetails = lazy(
    () => import("../../clients/authorization/policy/PolicyDetails")
);

export const PermissionPolicyDetailsRoute: AppRouteObject = {
    path: "/:realm/permissions/:permissionClientId/policies/:policyId/:policyType",
    element: <PermissionPolicyDetails />,
    breadcrumb: t => t("policyDetails"),
    handle: {
        access: accessChecker =>
            accessChecker.hasAny(
                "manage-clients",
                "view-authorization",
                "manage-authorization"
            )
    }
};

export const toPermissionPolicyDetails = (
    params: PermissionPolicyDetailsParams
): Partial<Path> => ({
    pathname: generateEncodedPath(PermissionPolicyDetailsRoute.path, params)
});
