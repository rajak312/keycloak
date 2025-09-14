/**
 * This file has been claimed for ownership from @keycloakify/keycloak-ui-shared version 260200.0.0.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "shared/keycloak-ui-shared/scroll-form/FormPanel.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { Card, CardBody, CardHeader, CardTitle } from "../../@patternfly/react-core";
import { PropsWithChildren, useId } from "react";
import { FormTitle } from "./FormTitle";

type FormPanelProps = {
    title: string;
    scrollId?: string;
    className?: string;
};

export const FormPanel = ({
    title,
    children,
    scrollId,
    className
}: PropsWithChildren<FormPanelProps>) => {
    const id = useId();

    return (
        <Card id={id} className={className} isFlat>
            <CardHeader className="kc-form-panel__header">
                <CardTitle tabIndex={0}>
                    <FormTitle id={scrollId} title={title} />
                </CardTitle>
            </CardHeader>
            <CardBody className="kc-form-panel__body">{children}</CardBody>
        </Card>
    );
};
