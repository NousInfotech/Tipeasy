'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useUserRole = () => {
    const [role, setRole] = useState<string | null>(null);
    const [uid, setUid] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from cookies
        const userRole = Cookies.get('userRole');
        const userUID = Cookies.get('userUID');
        const authToken = Cookies.get('authToken');

        setRole(userRole || null);
        setUid(userUID || null);
        setToken(authToken || null);
    }, []);

    return { role, uid, token };
};
