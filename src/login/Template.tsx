import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

import { Box, Typography, Button, Paper, Alert, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

import loginSideImage from "../assets/banner.jpg";
import logo from "../admin/assets/favicon.svg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        children
    } = props;

    const { msg, msgStr } = i18n;
    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({ qualifiedName: "html", className: "" });
    useSetClassName({ qualifiedName: "body", className: bodyClassName ?? "" });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
    if (!isReadyToRender) return null;

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                overflow: "hidden"
            }}
        >
            {/* Left Image */}
            <Box
                sx={{
                    flex: 1,
                    display: { xs: "none", sm: "block" },
                    overflow: "hidden"
                }}
            >
                <Box
                    component="img"
                    src={loginSideImage}
                    alt="Auth illustration"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
            </Box>

            {/* Right Form Section */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 3,
                    height: "100%",
                    overflowY: "auto"
                }}
            >
                <Paper elevation={0} sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
                    {/* Logo */}
                    <Box component="img" src={logo} alt="Company Logo" sx={{ display: "block", mb: 2, width: 192, height: "auto" }} />

                    {/* Small description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Welcome back! Please log in to access your account.
                    </Typography>

                    {/* Page Title or Username */}
                    {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        <Typography variant="h5" component="h1" gutterBottom>
                            {headerNode}
                        </Typography>
                    ) : (
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="subtitle1">{auth.attemptedUsername}</Typography>
                            <IconButton href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")} size="small">
                                <RestartAltIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    {/* Required fields note */}
                    {displayRequiredFields && (
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
                            * {msg("requiredFields")}
                        </Typography>
                    )}

                    {/* Messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <Alert
                            severity={message.type === "error" ? "error" : message.type}
                            sx={{ mb: 2 }}
                            iconMapping={{
                                success: <CheckCircleIcon fontSize="inherit" />,
                                error: <ErrorIcon fontSize="inherit" />,
                                warning: <WarningIcon fontSize="inherit" />,
                                info: <InfoIcon fontSize="inherit" />
                            }}
                        >
                            <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                        </Alert>
                    )}

                    {/* Children (forms from Keycloakify) */}
                    {children}

                    {/* Try another way link */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <Button
                                variant="text"
                                size="small"
                                sx={{ mt: 2 }}
                                onClick={() => {
                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                    return false;
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </Button>
                        </form>
                    )}

                    {/* Social Providers */}
                    {socialProvidersNode}

                    {/* Info Section */}
                    {displayInfo && (
                        <Typography
                            sx={{
                                mt: 1
                            }}
                        >
                            {infoNode}
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    );
}
