import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";
import { SocialProvidersNode } from "../../components/login/SocialProviderNode/SocilaProviderNode";
import { PasswordWrapper } from "../../components/login/PasswordWrapper/PasswordWrapper";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes } = props;

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const renderInfoNode = () => (
        <Box id="kc-registration-container">
            <Box id="kc-registration">
                <Typography variant="body2">
                    {msg("noAccount")}{" "}
                    <Link tabIndex={8} href={url.registrationUrl}>
                        {msg("doRegister")}
                    </Link>
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={renderInfoNode()}
            socialProvidersNode={realm.password && (social?.providers?.length || 0) > 0 && <SocialProvidersNode i18n={i18n} social={social} />}
        >
            <Box id="kc-form">
                <Box id="kc-form-wrapper">
                    {realm.password && (
                        <Box
                            component="form"
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <Box id="kc-username-field" mb={2}>
                                    <TextField
                                        fullWidth
                                        tabIndex={2}
                                        id="username"
                                        name="username"
                                        label={
                                            !realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                  ? msg("usernameOrEmail")
                                                  : msg("email")
                                        }
                                        defaultValue={login.username ?? ""}
                                        autoFocus
                                        autoComplete="username"
                                        error={messagesPerField.existsError("username", "password")}
                                        helperText={
                                            messagesPerField.existsError("username", "password")
                                                ? kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                : ""
                                        }
                                    />
                                </Box>
                            )}

                            <Box id="kc-password-field" mb={2}>
                                <PasswordWrapper
                                    i18n={i18n}
                                    passwordInputId="password"
                                    error={messagesPerField.existsError("username", "password")}
                                    helperText={
                                        usernameHidden && messagesPerField.existsError("username", "password")
                                            ? kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            : ""
                                    }
                                />
                            </Box>

                            <Box id="kc-form-options" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                {realm.rememberMe && !usernameHidden && (
                                    <FormControlLabel
                                        control={<Checkbox tabIndex={5} id="rememberMe" name="rememberMe" defaultChecked={!!login.rememberMe} />}
                                        label={msg("rememberMe")}
                                    />
                                )}

                                {realm.resetPasswordAllowed && (
                                    <Link tabIndex={6} href={url.loginResetCredentialsUrl}>
                                        {msg("doForgotPassword")}
                                    </Link>
                                )}
                            </Box>

                            <Box id="kc-form-buttons">
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <Button
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    id="kc-login"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                >
                                    {msgStr("doLogIn")}
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Template>
    );
}
