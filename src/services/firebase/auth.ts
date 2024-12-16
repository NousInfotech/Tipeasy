// src/services/firebase/auth.ts
'use server'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '@/config/firebase-client';
import { request } from '@/utils/request'
import { FirebaseUser, FirebaseResponse } from '@/types';

// Define the return type explicitly to include `token`
interface LoginResponse {
    uid: string;
    email: string | null;
    token: string;
}

// Function to register a new user with role assignment
export async function registerUser(email: string, password: string): Promise<unknown> {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const userId = userCredential.user.uid;

        return userId;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// Function to log in a user
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

        // Extract only the necessary properties
        const { uid } = userCredential.user;

        // Retrieve the token 
        const token = await userCredential.user.getIdToken();

        return { uid, email, token };

    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function handleFirebaseResponse(token: string): Promise<FirebaseUser> {
    const response = await request(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
        'POST',
        { idToken: token }
    );

    const fbresponse = response as FirebaseResponse;

    if (fbresponse.users.length === 0) {
        throw new Error('No users found for the provided token');
    }

    return fbresponse.users[0]; // Return the first user
}

