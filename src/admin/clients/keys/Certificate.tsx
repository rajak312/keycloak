/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/clients/keys/Certificate.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import type CertificateRepresentation from "@keycloak/keycloak-admin-client/lib/defs/certificateRepresentation";
import { FormGroup, TextArea } from "../../../shared/@patternfly/react-core";
import { useId } from "react";
import { useTranslation } from "react-i18next";
import { HelpItem } from "../../../shared/keycloak-ui-shared";

type CertificateProps = Omit<CertificateDisplayProps, "id"> & {
    plain?: boolean;
};

type CertificateDisplayProps = {
    id: string;
    keyInfo?: CertificateRepresentation;
};

const CertificateDisplay = ({ id, keyInfo }: CertificateDisplayProps) => {
    const { t } = useTranslation();
    return (
        <TextArea
            readOnly
            rows={5}
            id={id}
            data-testid="certificate"
            value={keyInfo?.certificate}
            aria-label={t("certificate")}
        />
    );
};

export const Certificate = ({ keyInfo, plain = false }: CertificateProps) => {
    const { t } = useTranslation();
    const id = useId();

    return plain ? (
        <CertificateDisplay id={id} keyInfo={keyInfo} />
    ) : (
        <FormGroup
            label={t("certificate")}
            fieldId={id}
            labelIcon={<HelpItem helpText={t("certificateHelp")} fieldLabelId={id} />}
        >
            <CertificateDisplay id={id} keyInfo={keyInfo} />
        </FormGroup>
    );
};
