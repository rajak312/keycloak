/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/realm-settings/themes/ImageUpload.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { KeycloakSpinner } from "../../../shared/keycloak-ui-shared";
import { FileUpload } from "../../../shared/@patternfly/react-core";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type ImageUploadProps = {
    name: string;
    onChange?: (file: string) => void;
};

export const ImageUpload = ({ name, onChange }: ImageUploadProps) => {
    const [dataUri, setDataUri] = useState("");
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);

    const { control } = useFormContext();

    const fileToDataUri = (file: File) =>
        new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.onload = event => {
                resolve(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        });

    if (file) {
        fileToDataUri(file).then(dataUri => {
            setDataUri(dataUri);
            onChange?.(dataUri);
        });
    }

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <>
                    {isLoading && <KeycloakSpinner />}
                    {dataUri && <img src={dataUri} width={200} height={200} />}
                    <FileUpload
                        id={name}
                        type="dataURL"
                        filename={file?.name}
                        dropzoneProps={{
                            accept: {
                                "image/*": [
                                    ".png",
                                    ".gif",
                                    ".jpeg",
                                    ".jpg",
                                    ".svg",
                                    ".webp"
                                ]
                            }
                        }}
                        onFileInputChange={(_, file) => setFile(file)}
                        onReadStarted={() => setIsLoading(true)}
                        onReadFinished={(_, file) => {
                            setFile(file);
                            field.onChange(file);
                            setIsLoading(false);
                        }}
                        onClearClick={() => {
                            setFile(undefined);
                            field.onChange(undefined);
                            setDataUri("");
                        }}
                    />
                </>
            )}
        />
    );
};
