/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/authorization/policy/Aggregate.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { FormGroup } from "../../../../shared/@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { HelpItem } from "../../../../shared/keycloak-ui-shared";
import { useParams } from "../../../utils/useParams";
import type { PolicyDetailsParams } from "../../routes/PolicyDetails";
import { DecisionStrategySelect } from "../DecisionStrategySelect";
import { ResourcesPolicySelect } from "../ResourcesPolicySelect";
import { NewPermissionPolicyDetailsParams } from "../../../permissions-configuration/routes/NewPermissionPolicy";

export const Aggregate = () => {
    const { t } = useTranslation();
    const { id } = useParams<PolicyDetailsParams>();
    const { permissionClientId } = useParams<NewPermissionPolicyDetailsParams>();

    return (
        <>
            <FormGroup
                label={t("applyPolicy")}
                fieldId="policies"
                labelIcon={
                    <HelpItem helpText={t("applyPolicyHelp")} fieldLabelId="policies" />
                }
            >
                <ResourcesPolicySelect
                    name="policies"
                    clientId={permissionClientId || id}
                />
            </FormGroup>
            <DecisionStrategySelect helpLabel="policyDecisionStagey" />
        </>
    );
};
