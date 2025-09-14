/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/user/FederatedUserLink.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import type ComponentRepresentation from "@keycloak/keycloak-admin-client/lib/defs/componentRepresentation";
import type UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { useFetch } from "../../shared/keycloak-ui-shared";
import { Button } from "../../shared/@patternfly/react-core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminClient } from "../admin-client";
import { useAccess } from "../context/access/Access";
import { useRealm } from "../context/realm-context/RealmContext";
import { toCustomUserFederation } from "../user-federation/routes/CustomUserFederation";

type FederatedUserLinkProps = {
    user: UserRepresentation;
};

export const FederatedUserLink = ({ user }: FederatedUserLinkProps) => {
    const { adminClient } = useAdminClient();

    const access = useAccess();
    const { realm } = useRealm();

    const [component, setComponent] = useState<ComponentRepresentation>();

    useFetch(
        () =>
            access.hasAccess("view-realm")
                ? adminClient.components.findOne({
                      id: user.federationLink!
                  })
                : adminClient.userStorageProvider.name({
                      id: user.federationLink!
                  }),
        setComponent,
        []
    );

    if (!component) return null;

    if (!access.hasAccess("view-realm")) return <span>{component.name}</span>;

    return (
        <Button
            variant="link"
            component={props => (
                <Link
                    {...props}
                    to={toCustomUserFederation({
                        id: component.id!,
                        providerId: component.providerId!,
                        realm
                    })}
                />
            )}
        >
            {component.name}
        </Button>
    );
};
