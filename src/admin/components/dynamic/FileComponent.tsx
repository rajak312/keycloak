/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/dynamic/FileComponent.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { HelpItem } from "../../../shared/keycloak-ui-shared";
import { FileUpload, FormGroup } from "../../../shared/@patternfly/react-core";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ComponentProps } from "./components";

export const FileComponent = ({
    name,
    label,
    helpText,
    defaultValue,
    required,
    isDisabled = false,
    convertToName
}: ComponentProps) => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const [filename, setFilename] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <FormGroup
            label={t(label!)}
            labelIcon={<HelpItem helpText={t(helpText!)} fieldLabelId={`${label}`} />}
            fieldId={name!}
            isRequired={required}
        >
            <Controller
                name={convertToName(name!)}
                control={control}
                defaultValue={defaultValue || ""}
                render={({ field }) => (
                    <FileUpload
                        id={name!}
                        value={field.value}
                        type="text"
                        filename={filename}
                        isDisabled={isDisabled}
                        onFileInputChange={(_, file) => setFilename(file.name)}
                        onReadStarted={() => setIsLoading(true)}
                        onReadFinished={() => setIsLoading(false)}
                        onClearClick={() => {
                            field.onChange("");
                            setFilename("");
                        }}
                        isLoading={isLoading}
                        allowEditingUploadedText={false}
                        onTextChange={value => {
                            field.onChange(value);
                        }}
                        onDataChange={(_, value) => {
                            field.onChange(value);
                        }}
                    />
                )}
            />
        </FormGroup>
    );
};
