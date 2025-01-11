'use client'

import React, { useEffect, useState } from "react"
import ProfilePage from "./ProfilePage"
import { fetchUserByFirebaseId } from "@/api/userApi"
import Cookie from "js-cookie"
import { IUser } from "@/types/schematypes"

const SuperAdminProfile: React.FC = () => {
    const [admin, setAdmin] = useState<IUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    // Fetch Admin Data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const uid = Cookie.get("userUID");
                if (uid) {
                    const userAdmin = await fetchUserByFirebaseId(uid) as IUser
                    setAdmin(userAdmin)
                }
            } catch (error) {
                console.error("Error fetching admin data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAdminData()
    }, [])

    if (loading) return <p>Loading...</p>

    if (!admin) return <p>No admin data found.</p>

    return (
        <ProfilePage
            username={admin.username}
            email={admin.email}
            phoneNumber={admin.phoneNumber}
            role="admin"
        />
    )
}

export default SuperAdminProfile
