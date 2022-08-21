import React, { useState, useEffect, useContext, createContext } from "react";

import firebase from "@/lib/firebase";
import { createUser } from "@/lib/db";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const auth = useAuthProvider();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	return useContext(AuthContext);
}

function useAuthProvider() {
	const [ user, setUser ] = useState(null);

	const handleUser = (rawUser) => {
		if (rawUser) {
			const user = formatUser(rawUser);
			const { token, ...userWithoutToken } = user;

			createUser(user.uid, userWithoutToken)
			setUser(user);
			Cookies.set('fast-feedback-auth', true, {
				expires: 1
			});
			return user;
		} else {
			setUser(false);
			Cookies.remove('fast-feedback-auth');
			return false;
		}
	}

	const signinWithGitHub = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => handleUser(response.user));
	}

	const signinWithGoogle = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => handleUser(response.user));
	}

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => handleUser(false));
	}

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
		return () => unsubscribe();
	}, []);

	return {
		user,
		signinWithGitHub,
		signinWithGoogle,
		signout
	};
}

const formatUser = (user) => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		token: user.ya,
		provider: user.providerData[ 0 ].providerId,
		photoUrl: user.photoURL
	};
};