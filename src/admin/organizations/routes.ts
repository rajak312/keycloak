/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/organizations/routes.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import type { AppRouteObject } from "../routes";
import { AddOrganizationRoute } from "./routes/AddOrganization";
import { EditOrganizationRoute } from "./routes/EditOrganization";
import { OrganizationsRoute } from "./routes/Organizations";

const routes: AppRouteObject[] = [
    OrganizationsRoute,
    AddOrganizationRoute,
    EditOrganizationRoute
];

export default routes;
