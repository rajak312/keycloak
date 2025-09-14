/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/identity-providers/component/DisplayOrder.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { FormGroup, TextInput } from "../../../shared/@patternfly/react-core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { HelpItem } from "../../../shared/keycloak-ui-shared";

export const DisplayOrder = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <FormGroup
            label={t("displayOrder")}
            labelIcon={
                <HelpItem helpText={t("displayOrderHelp")} fieldLabelId="displayOrder" />
            }
            fieldId="kc-display-order"
        >
            <Controller
                name="config.guiOrder"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextInput
                        id="kc-display-order"
                        type="number"
                        value={field.value}
                        data-testid="displayOrder"
                        min={0}
                        onChange={(_event, value) => {
                            const num = Number(value);
                            field.onChange(value === "" ? value : num < 0 ? 0 : num);
                        }}
                    />
                )}
            />
        </FormGroup>
    );
};
