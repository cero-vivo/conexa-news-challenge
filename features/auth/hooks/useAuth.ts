import { Routes } from "@/constants/Routes";
import { AuthGateway } from "@/features/auth/infrastructure/gateways/AuthGateway";
import { AuthPresenter } from "@/features/auth/infrastructure/presenters/AuthPresenter";
import { IAuthScreen } from "@/features/auth/model/presenter/IAuthPresenter";
import {
	clearError,
	loginFailure,
	loginStart,
	loginSuccess,
	logout as logoutAction,
	registerFailure,
	registerStart,
	registerSuccess,
} from "@/features/auth/model/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

export const useAuth = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { user, isAuthenticated, loading, error } = useAppSelector(
		(state) => state.auth
	);

	// Debug log for authentication state
	console.log("🔐 useAuth hook - isAuthenticated:", isAuthenticated, "user:", user?.name || 'null');

	/* Screen callbacks -> actual UI reactions (Redux dispatch) */
	const screenHandler: IAuthScreen = {
		loginSuccess: (usr) => {
			dispatch(loginSuccess(usr));
		},
		loginError: (err) => {
			dispatch(loginFailure(err?.message || "Login error"));
		},
		registerSuccess: (usr) => {
			dispatch(registerSuccess(usr));
		},
		registerError: (err) => {
			dispatch(registerFailure(err?.message || "Register error"));
		},
		anonymousLoginSuccess: (usr) => {
			dispatch(loginSuccess(usr));
		},
		anonymousLoginError: (err) => {
			dispatch(loginFailure(err?.message || "Anonymous login error"));
		},
		logoutSuccess: () => {
			dispatch(logoutAction());
		},
		logoutError: (err) => {
			// we can set error state but optional
			dispatch(loginFailure(err?.message || "Logout error"));
		},
	};

	const presenter = useMemo(() => {
		return AuthPresenter(AuthGateway(), screenHandler);
	}, []);

	const login = useCallback(
		async (email: string, password: string) => {
			dispatch(loginStart());
			return presenter.login(email, password);
		},
		[dispatch, presenter]
	);

	const register = useCallback(
		async (email: string, password: string, name: string) => {
			dispatch(registerStart());
			return presenter.register(email, password, name);
		},
		[dispatch, presenter]
	);

	const loginAnonymous = useCallback(async () => {
		dispatch(loginStart());
		return presenter.loginAnonymous();
	}, [dispatch, presenter]);

	const logout = useCallback(async () => {
		await presenter.logout();
		// redirigir a login
		router.replace(Routes.AUTH);
	}, [presenter, router]);

	const clearAuthError = useCallback(() => {
		dispatch(clearError());
	}, [dispatch]);

	return {
		user,
		isAuthenticated,
		loading,
		error,
		login,
		register,
		loginAnonymous,
		logout,
		clearError: clearAuthError,
	};
}; 