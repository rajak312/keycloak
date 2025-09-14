/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/authentication/components/FlowHeader.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { DataListDragButton } from "../../../shared/@patternfly/react-core";
import { Th, Tr } from "../../../shared/@patternfly/react-table";
import { useTranslation } from "react-i18next";

import "./flow-header.css";

export const FlowHeader = () => {
    const { t } = useTranslation();
    return (
        <Tr aria-labelledby="headerName" id="header">
            <Th>
                <DataListDragButton
                    className="keycloak__authentication__header-drag-button"
                    aria-label={t("disabled")}
                />
                <Th screenReaderText={t("expandRow")} />
            </Th>
            <Th>{t("steps")}</Th>
            <Th>{t("requirement")}</Th>
            <Th screenReaderText={t("config")}></Th>
            <Th screenReaderText={t("config")}></Th>
            <Th screenReaderText={t("config")}></Th>
            <Th screenReaderText={t("config")}></Th>
        </Tr>
    );
};
