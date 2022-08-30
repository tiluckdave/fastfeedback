import React, { useState, useEffect, useContext, createContext } from "react";
import Router from 'next/router';

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
	const [ loading, setLoading ] = useState(true);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = user;

			createUser(user.uid, userWithoutToken)
			setUser(user);
			Cookies.set('fast-feedback-auth', true, {
				expires: 1
			});

			setLoading(false);
			return user;
		} else {

			setUser(false);
			Cookies.remove('fast-feedback-auth');

			setLoading(false);
			return false;
		}
	}

	const signinWithGitHub = (redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GithubAuthProvider())
			.then((response) => {
				handleUser(response.user);

				if (redirect) {
					Router.push(redirect);
				}
			});
	}

	const signinWithGoogle = (redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then((response) => {
				handleUser(response.user);

				if (redirect) {
					Router.push(redirect);
				}
			});
	}

	const signout = () => {
		Router.push('/');
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
		loading,
		signinWithGitHub,
		signinWithGoogle,
		signout
	};
}

const getStripeRole = async () => {
	await firebase.auth().currentUser.getIdToken(true);
	const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

	return decodedToken.claims.stripeRole || 'free';
};

const formatUser = async (user) => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		token: user.ya,
		provider: user.providerData[ 0 ].providerId,
		photoUrl: user.photoURL,
		stripeRole: await getStripeRole()
	};
};