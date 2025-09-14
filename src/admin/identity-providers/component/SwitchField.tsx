/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/identity-providers/component/SwitchField.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Switch } from "../../../shared/@patternfly/react-core";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FieldProps, FormGroupField } from "./FormGroupField";

type FieldType = "boolean" | "string";

type SwitchFieldProps = FieldProps & {
    fieldType?: FieldType;
    defaultValue?: string | boolean;
};

export const SwitchField = ({
    label,
    field,
    fieldType = "string",
    isReadOnly = false,
    defaultValue
}: SwitchFieldProps) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    return (
        <FormGroupField label={label}>
            <Controller
                name={field}
                defaultValue={
                    defaultValue ? defaultValue : fieldType === "string" ? "false" : false
                }
                control={control}
                render={({ field }) => (
                    <Switch
                        id={label}
                        label={t("on")}
                        labelOff={t("off")}
                        isChecked={
                            fieldType === "string"
                                ? field.value === "true"
                                : (field.value as boolean)
                        }
                        onChange={(_event, value) =>
                            field.onChange(fieldType === "string" ? "" + value : value)
                        }
                        isDisabled={isReadOnly}
                        aria-label={label}
                    />
                )}
            />
        </FormGroupField>
    );
};
