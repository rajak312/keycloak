/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/events/routes.ts" --revert
 */

/* eslint-disable */

// @ts-nocheck

import type { AppRouteObject } from "../routes";
import { EventsRoute, EventsRouteWithTab } from "./routes/Events";

const routes: AppRouteObject[] = [EventsRoute, EventsRouteWithTab];

export default routes;
