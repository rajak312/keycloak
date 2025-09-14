/**
 * This file has been claimed for ownership from @keycloakify/keycloak-admin-ui version 260200.0.3.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "admin/components/key-value-form/KeySelect.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import { KeycloakSelect } from "../../../shared/keycloak-ui-shared";
import {
    Grid,
    GridItem,
    SelectOption,
    TextInput
} from "../../../shared/@patternfly/react-core";
import { useState } from "react";
import { UseControllerProps, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useToggle from "../../utils/useToggle";
import { DefaultValue } from "./KeyValueInput";

type KeySelectProp = UseControllerProps & {
    selectItems: DefaultValue[];
};

export const KeySelect = ({ selectItems, ...rest }: KeySelectProp) => {
    const { t } = useTranslation();
    const [open, toggle] = useToggle();
    const { field } = useController(rest);
    const [custom, setCustom] = useState(
        !selectItems.map(({ key }) => key).includes(field.value)
    );

    return (
        <Grid>
            <GridItem lg={custom ? 2 : 12}>
                <KeycloakSelect
                    onToggle={() => toggle()}
                    isOpen={open}
                    onSelect={value => {
                        if (value) {
                            setCustom(false);
                        }
                        field.onChange(value);
                        toggle();
                    }}
                    selections={!custom ? [field.value] : ""}
                >
                    {[
                        <SelectOption key="custom" onClick={() => setCustom(true)}>
                            {t("customAttribute")}
                        </SelectOption>,
                        ...selectItems.map(item => (
                            <SelectOption key={item.key} value={item.key}>
                                {item.label}
                            </SelectOption>
                        ))
                    ]}
                </KeycloakSelect>
            </GridItem>
            {custom && (
                <GridItem lg={10}>
                    <TextInput
                        id="customValue"
                        data-testid={rest.name}
                        placeholder={t("keyPlaceholder")}
                        value={field.value}
                        onChange={field.onChange}
                        autoFocus
                    />
                </GridItem>
            )}
        </Grid>
    );
};
