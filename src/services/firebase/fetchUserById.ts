import { request } from "@/utils/request"; // Assuming request is correctly imported


interface RoleResponse {
    data: string
}

export const fetchRoleByFirebaseId = async (firebaseId: string): Promise<string> => {
    const url = `/api/users/role?firebaseId=${firebaseId}`;  // The API endpoint to fetch role

    try {
        // Make the GET request using your custom request method
        const response = await request(url, 'GET') as RoleResponse;

        return response.data; // Assuming data is the role or the desired response data

    } catch (error) {
        console.error("Error fetching role by Firebase ID:", error);
        throw new Error("Failed to fetch role");
    }
};
