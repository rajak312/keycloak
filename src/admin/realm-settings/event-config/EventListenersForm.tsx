/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/realm-settings/event-config/EventListenersForm.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { ActionGroup, Button } from "../../../shared/@patternfly/react-core";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    KeycloakSpinner,
    useFetch,
    SelectControl,
    SelectVariant
} from "../../../shared/keycloak-ui-shared";
import { useState } from "react";
import { fetchAdminUI } from "../../context/auth/admin-ui-endpoint";
import { useAdminClient } from "../../admin-client";

type EventListenerRepresentation = {
    id: string;
};

type EventListenersFormProps = {
    form: UseFormReturn;
    reset: () => void;
};

export const EventListenersForm = ({ form, reset }: EventListenersFormProps) => {
    const { t } = useTranslation();

    const [eventListeners, setEventListeners] = useState<EventListenerRepresentation[]>();

    const { adminClient } = useAdminClient();

    useFetch(
        () =>
            fetchAdminUI<EventListenerRepresentation[]>(
                adminClient,
                "ui-ext/available-event-listeners"
            ),
        setEventListeners,
        []
    );

    if (!eventListeners) {
        return <KeycloakSpinner />;
    }

    return (
        <FormProvider {...form}>
            <SelectControl
                name="eventsListeners"
                label={t("eventListeners")}
                labelIcon={t("eventListenersHelpTextHelp")}
                controller={{
                    defaultValue: ""
                }}
                className="kc_eventListeners_select"
                chipGroupProps={{
                    numChips: 3,
                    expandedText: t("hide"),
                    collapsedText: t("showRemaining")
                }}
                variant={SelectVariant.typeaheadMulti}
                options={eventListeners.map(value => value.id)}
            />
            <ActionGroup>
                <Button
                    variant="primary"
                    type="submit"
                    data-testid={"saveEventListenerBtn"}
                >
                    {t("save")}
                </Button>
                <Button
                    variant="link"
                    data-testid={"revertEventListenerBtn"}
                    onClick={reset}
                >
                    {t("revert")}
                </Button>
            </ActionGroup>
        </FormProvider>
    );
};
