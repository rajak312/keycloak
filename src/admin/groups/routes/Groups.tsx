/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/groups/routes/Groups.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { lazy } from "react";
import { generatePath, type Path } from "react-router-dom";
import type { AppRouteObject } from "../../routes";

export type GroupsParams = { realm: string; id?: string; lazy?: string };

const GroupsSection = lazy(() => import("../GroupsSection"));

export const GroupsRoute: AppRouteObject = {
    path: "/:realm/groups/*",
    element: <GroupsSection />,
    handle: {
        access: "query-groups"
    }
};

export const GroupsWithIdRoute: AppRouteObject = {
    ...GroupsRoute,
    path: "/:realm/groups/:id"
};

export const toGroups = (params: GroupsParams): Partial<Path> => {
    const path = params.id ? GroupsWithIdRoute.path : GroupsRoute.path;

    return {
        pathname: generatePath(path, params)
    };
};
