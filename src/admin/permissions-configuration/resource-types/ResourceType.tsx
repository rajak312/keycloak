/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/permissions-configuration/resource-types/ResourceType.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { FormGroup, Radio } from "../../../shared/@patternfly/react-core";
import { HelpItem } from "../../../shared/keycloak-ui-shared";
import { useFormContext } from "react-hook-form";
import { useState, type JSX } from "react";
import { GroupSelect } from "./GroupSelect";
import { UserSelect } from "../../components/users/UserSelect";
import { RoleSelect } from "./RoleSelect";
import { ClientSelectComponent } from "./ClientSelectComponent";

type ResourceTypeProps = {
    withEnforceAccessTo?: boolean;
    resourceType: string;
};

export const COMPONENTS: {
    [index: string]: (props: any) => JSX.Element;
} = {
    users: UserSelect,
    clients: ClientSelectComponent,
    groups: GroupSelect,
    roles: RoleSelect
} as const;

export const isValidComponentType = (value: string) => value in COMPONENTS;

export const ResourceType = ({
    resourceType,
    withEnforceAccessTo = true
}: ResourceTypeProps) => {
    const { t } = useTranslation();
    const form = useFormContext();
    const resourceIds: string[] = form.getValues("resources");
    const normalizedResourceType = resourceType.toLowerCase();

    const [isSpecificResources, setIsSpecificResources] = useState(
        resourceIds?.some(id => id !== resourceType) || !withEnforceAccessTo
    );

    function getComponentType() {
        if (isValidComponentType(normalizedResourceType)) {
            return COMPONENTS[normalizedResourceType];
        }
        return null;
    }

    const ComponentType = getComponentType();

    return (
        <>
            {withEnforceAccessTo && (
                <FormGroup
                    label={t("enforceAccessTo")}
                    labelIcon={
                        <HelpItem
                            helpText={t("enforceAccessToHelpText")}
                            fieldLabelId="enforce-access-to"
                        />
                    }
                    fieldId="EnforceAccessTo"
                    hasNoPaddingTop
                    isRequired
                >
                    <Radio
                        id="allResources"
                        data-testid="allResources"
                        isChecked={!isSpecificResources}
                        name="EnforceAccessTo"
                        label={t(`allResourceType`, { resourceType })}
                        onChange={() => {
                            setIsSpecificResources(false);
                            form.setValue("resources", []);
                        }}
                        className="pf-v5-u-mb-md"
                    />
                    <Radio
                        id="specificResources"
                        data-testid="specificResources"
                        isChecked={isSpecificResources}
                        name="EnforceAccessTo"
                        label={t(`specificResourceType`, { resourceType })}
                        onChange={() => {
                            setIsSpecificResources(true);
                            form.setValue("resources", []);
                        }}
                        className="pf-v5-u-mb-md"
                    />
                </FormGroup>
            )}
            {isSpecificResources && ComponentType && (
                <ComponentType
                    name={withEnforceAccessTo ? "resources" : "resource"}
                    label={`${normalizedResourceType}Resources`}
                    helpText={t("resourceTypeHelpText", {
                        resourceType: normalizedResourceType
                    })}
                    defaultValue={[]}
                    variant="typeaheadMulti"
                />
            )}
        </>
    );
};
