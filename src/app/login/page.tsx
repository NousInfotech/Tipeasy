"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser } from '@/services/firebase/auth';
import Cookie from 'js-cookie';
import { getAdminIdByEmail } from '@/api/userApi';
import { IUser } from '@/types/schematypes';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roleError = searchParams.get('roleerror') || '';

    useEffect(() => {
        if (roleError === 'role_mismatch') {
            toast.error("Role Mismatch");
            router.push('/login')
        }
    }, [roleError]);


    const [formemail, setFormEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'superadmin'>('admin');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser(formemail, password);
            const { token, uid, email } = response;

            Cookie.set('authToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
            Cookie.set('userUID', uid, { expires: 7, secure: true, sameSite: 'Strict' });
            Cookie.set('userRole', role, { expires: 7, secure: true, sameSite: 'Strict' });

            if (role === 'admin') {
                const admin = await getAdminIdByEmail(email as string) as IUser;
                const { restaurantId } = admin;

                Cookie.set('restaurantId', restaurantId, { expires: 7, secure: true, sameSite: 'Strict' });
                router.push(`/dashboard/admin/${restaurantId}`);
            } else if (role === 'superadmin') {
                router.push('/dashboard/superadmin');
            } else {
                setError('Unknown role. Contact support.');
            }
        } catch (err) {
            console.error('Login error:', err);
            toast.error("Authentication Error: " + err);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formemail">
                        Email
                    </label>
                    <input
                        id="formemail"
                        type="email"
                        value={formemail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <div className="flex space-x-4">
                        {['admin', 'superadmin'].map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value={option}
                                    checked={role === option}
                                    onChange={() => setRole(option as 'admin' | 'superadmin')}
                                    className="mr-2"
                                />
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

// Wrap in Suspense
const LoginPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
    </Suspense>
);

export default LoginPage;
