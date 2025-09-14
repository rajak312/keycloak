/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/controls/FormLabel.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { FormGroup, FormGroupProps } from "../../@patternfly/react-core";
import { PropsWithChildren, ReactNode } from "react";
import { FieldError, FieldValues, Merge } from "react-hook-form";
import { FormErrorText } from "./FormErrorText";
import { HelpItem } from "./HelpItem";

export type FieldProps<T extends FieldValues = FieldValues> = {
    label?: string;
    name: string;
    labelIcon?: string | ReactNode;
    error?: FieldError | Merge<FieldError, T>;
    isRequired: boolean;
};

type FormLabelProps = FieldProps & Omit<FormGroupProps, "label" | "labelIcon">;

export const FormLabel = ({
    name,
    label,
    labelIcon,
    error,
    children,
    ...rest
}: PropsWithChildren<FormLabelProps>) => (
    <FormGroup
        label={label || name}
        fieldId={name}
        labelIcon={
            labelIcon ? <HelpItem helpText={labelIcon} fieldLabelId={name} /> : undefined
        }
        {...rest}
    >
        {children}
        {error && (
            <FormErrorText data-testid={`${name}-helper`} message={error.message} />
        )}
    </FormGroup>
);
