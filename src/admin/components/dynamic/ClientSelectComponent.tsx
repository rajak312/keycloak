/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/dynamic/ClientSelectComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import type { ComponentProps } from "./components";
import { ClientSelect } from "../client/ClientSelect";

export const ClientSelectComponent = (props: ComponentProps) => (
    <ClientSelect {...props} name={props.convertToName(props.name!)} />
);
