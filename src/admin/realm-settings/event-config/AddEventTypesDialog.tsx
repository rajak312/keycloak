/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/realm-settings/event-config/AddEventTypesDialog.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, ModalVariant } from "../../../shared/@patternfly/react-core";

import { EventsTypeTable, EventType } from "./EventsTypeTable";
import { useServerInfo } from "../../context/server-info/ServerInfoProvider";

type AddEventTypesDialogProps = {
    onConfirm: (selected: EventType[]) => void;
    onClose: () => void;
    configured: string[];
};

export const AddEventTypesDialog = ({
    onConfirm,
    onClose,
    configured
}: AddEventTypesDialogProps) => {
    const { t } = useTranslation();
    const { enums } = useServerInfo();

    const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);
    return (
        <Modal
            variant={ModalVariant.medium}
            title={t("addTypes")}
            isOpen={true}
            onClose={onClose}
            actions={[
                <Button
                    data-testid="addEventTypeConfirm"
                    key="confirm"
                    variant="primary"
                    onClick={() => onConfirm(selectedTypes)}
                >
                    {t("add")}
                </Button>,
                <Button
                    data-testid="moveCancel"
                    key="cancel"
                    variant="link"
                    onClick={onClose}
                >
                    {t("cancel")}
                </Button>
            ]}
        >
            <EventsTypeTable
                ariaLabelKey="addTypes"
                onSelect={selected => setSelectedTypes(selected)}
                eventTypes={enums!["eventType"].filter(
                    type => !configured.includes(type)
                )}
            />
        </Modal>
    );
};
