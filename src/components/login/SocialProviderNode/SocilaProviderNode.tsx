import { Box, Button, Typography } from "@mui/material";
import { KcContext } from "keycloakify/login/KcContext";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { I18n } from "../../../login/i18n";

export interface SocialProvidersProps {
    i18n: I18n;
    social: KcContext.Login["social"];
}

export function SocialProvidersNode({ i18n, social }: SocialProvidersProps) {
    const { msg } = i18n;

    return (
        <Box id="kc-social-providers" mt={3}>
            <Typography variant="h6" align="center" gutterBottom>
                {msg("identity-provider-login-label")}
            </Typography>
            <Box
                id="kc-social-account-list"
                sx={{
                    display: "grid",
                    gap: 1,
                    gridTemplateColumns:
                        (social?.providers?.length || 0) > 3
                            ? "repeat(auto-fill, minmax(120px, 1fr))"
                            : "1fr"
                }}
            >
                {social?.providers?.map((...[p]) => (
                    <Button
                        id={`social-${p.alias}`}
                        variant="outlined"
                        href={p.loginUrl}
                        startIcon={
                            p.iconClasses ? (
                                <i className={p.iconClasses} aria-hidden="true" />
                            ) : undefined
                        }
                        fullWidth
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(p.displayName)
                            }}
                        />
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
