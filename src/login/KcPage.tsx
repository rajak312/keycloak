import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { AppThemeProvider } from "../providers/AppThemeProvider";
const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));
const Login = lazy(() => import("./pages/Login"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            <AppThemeProvider>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </AppThemeProvider>
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
