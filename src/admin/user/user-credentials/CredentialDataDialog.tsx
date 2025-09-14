/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/user/user-credentials/CredentialDataDialog.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useTranslation } from "react-i18next";
import { Modal, ModalVariant } from "../../../shared/@patternfly/react-core";
import {
    Table,
    TableVariant,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "../../../shared/@patternfly/react-table";

type CredentialDataDialogProps = {
    credentialData: [string, string][];
    onClose: () => void;
};

export const CredentialDataDialog = ({
    credentialData,
    onClose
}: CredentialDataDialogProps) => {
    const { t } = useTranslation();
    return (
        <Modal
            variant={ModalVariant.medium}
            title={t("passwordDataTitle")}
            data-testid="passwordDataDialog"
            isOpen
            onClose={onClose}
        >
            <Table
                aria-label={t("passwordDataTitle")}
                data-testid="password-data-dialog"
                variant={TableVariant.compact}
            >
                <Thead>
                    <Tr>
                        <Th>{t("showPasswordDataName")}</Th>
                        <Th>{t("showPasswordDataValue")}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {credentialData.map((cred, index) => {
                        return (
                            <Tr key={index}>
                                <Td>{cred[0]}</Td>
                                <Td>{cred[1]}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Modal>
    );
};
