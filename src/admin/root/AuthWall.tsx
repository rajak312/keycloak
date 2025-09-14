/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/root/AuthWall.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { AccessType } from "@keycloak/keycloak-admin-client/lib/defs/whoAmIRepresentation";
import { useMatches } from "react-router-dom";

import { ForbiddenSection } from "../ForbiddenSection";
import { useAccess } from "../context/access/Access";
import { useWhoAmI } from "../context/whoami/WhoAmI";
import { KeycloakSpinner } from "../../shared/keycloak-ui-shared";

function hasProp<K extends PropertyKey>(
    data: object,
    prop: K
): data is Record<K, unknown> {
    return prop in data;
}

export const AuthWall = ({ children }: any) => {
    const matches = useMatches();
    const { hasAccess } = useAccess();
    const { whoAmI } = useWhoAmI();

    const permissionNeeded = matches.flatMap(({ handle }) => {
        if (typeof handle !== "object" || handle === null || !hasProp(handle, "access")) {
            return [];
        }

        if (Array.isArray(handle.access)) {
            return handle.access as AccessType[];
        }

        return [handle.access] as AccessType[];
    });

    if (whoAmI.isEmpty()) {
        return <KeycloakSpinner />;
    }

    if (!hasAccess(...permissionNeeded)) {
        return <ForbiddenSection permissionNeeded={permissionNeeded} />;
    }

    return children;
};
