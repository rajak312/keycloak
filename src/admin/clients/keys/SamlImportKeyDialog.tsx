/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/keys/SamlImportKeyDialog.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useAlerts } from "../../../shared/keycloak-ui-shared";
import { AlertVariant } from "../../../shared/@patternfly/react-core";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAdminClient } from "../../admin-client";
import { ConfirmDialogModal } from "../../components/confirm-dialog/ConfirmDialog";
import { KeyForm } from "./GenerateKeyDialog";
import type { KeyTypes } from "./SamlKeys";
import { SamlKeysDialogForm, submitForm } from "./SamlKeysDialog";

type SamlImportKeyDialogProps = {
    id: string;
    attr: KeyTypes;
    onClose: () => void;
};

export const SamlImportKeyDialog = ({ id, attr, onClose }: SamlImportKeyDialogProps) => {
    const { adminClient } = useAdminClient();

    const { t } = useTranslation();
    const form = useForm<SamlKeysDialogForm>();
    const { handleSubmit } = form;

    const { addAlert, addError } = useAlerts();

    const submit = (form: SamlKeysDialogForm) => {
        submitForm(adminClient, form, id, attr, error => {
            if (error) {
                addError("importError", error);
            } else {
                addAlert(t("importSuccess"), AlertVariant.success);
            }
        });
    };

    return (
        <ConfirmDialogModal
            open={true}
            toggleDialog={onClose}
            continueButtonLabel="import"
            titleKey="importKey"
            onConfirm={() => {
                handleSubmit(submit)();
                onClose();
            }}
        >
            <FormProvider {...form}>
                <KeyForm useFile hasPem />
            </FormProvider>
        </ConfirmDialogModal>
    );
};
