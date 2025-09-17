import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { I18n } from "../../../login/i18n";

export function PasswordWrapper(props: {
    i18n: I18n;
    passwordInputId: string;
    error?: boolean;
    helperText?: string;
}) {
    const { i18n, passwordInputId, error, helperText } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <TextField
            fullWidth
            tabIndex={3}
            id={passwordInputId}
            name="password"
            label={msgStr("password")}
            type={isPasswordRevealed ? "text" : "password"}
            autoComplete="current-password"
            error={error}
            helperText={helperText}
            InputProps={{
                endAdornment: (
                    <IconButton
                        aria-label={msgStr(
                            isPasswordRevealed ? "hidePassword" : "showPassword"
                        )}
                        onClick={toggleIsPasswordRevealed}
                        edge="end"
                    >
                        {isPasswordRevealed ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                )
            }}
        />
    );
}
