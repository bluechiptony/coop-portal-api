import { Router } from "express";
import { login, getAccountTypes, createAuthenticationProfile, activateAccount, recoverAccount, resendActivationRequest, resetPassword } from "../handlers/authentication/authentication-adapter";

const AuthenticationRoutes = Router();

AuthenticationRoutes.post("/login", login);
AuthenticationRoutes.get("/account-types", getAccountTypes);
AuthenticationRoutes.post("/create/account", createAuthenticationProfile);
AuthenticationRoutes.post("/forgot-password", recoverAccount);
AuthenticationRoutes.post("/reset-password", resetPassword);
AuthenticationRoutes.post("/activate-account", activateAccount);
AuthenticationRoutes.post("/resend-activation", resendActivationRequest);

export default AuthenticationRoutes;
