/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/dynamic/ListComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    HelpItem,
    KeycloakSelect,
    SelectVariant
} from "../../../shared/keycloak-ui-shared";
import { FormGroup, SelectOption } from "../../../shared/@patternfly/react-core";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ComponentProps } from "./components";

export const ListComponent = ({
    name,
    label,
    helpText,
    defaultValue,
    options,
    required,
    isDisabled = false,
    convertToName
}: ComponentProps) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const [open, setOpen] = useState(false);

    return (
        <FormGroup
            label={t(label!)}
            labelIcon={<HelpItem helpText={t(helpText!)} fieldLabelId={`${label}`} />}
            fieldId={name!}
            isRequired={required}
        >
            <Controller
                name={convertToName(name!)}
                data-testid={name}
                defaultValue={defaultValue || options?.[0] || ""}
                control={control}
                render={({ field }) => (
                    <KeycloakSelect
                        toggleId={name}
                        isDisabled={isDisabled}
                        onToggle={toggle => setOpen(toggle)}
                        onSelect={value => {
                            field.onChange(value as string);
                            setOpen(false);
                        }}
                        selections={field.value}
                        variant={SelectVariant.single}
                        aria-label={t(label!)}
                        isOpen={open}
                    >
                        {options?.map(option => (
                            <SelectOption
                                selected={option === field.value}
                                key={option}
                                value={option}
                            >
                                {option}
                            </SelectOption>
                        ))}
                    </KeycloakSelect>
                )}
            />
        </FormGroup>
    );
};
