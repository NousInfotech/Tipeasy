// utils/fetchApi.ts

const getBaseUrl = () => {
    // Dynamically set the base URL depending on the environment
    return typeof window !== "undefined"
        ? ""  // On the client, just use relative paths
        : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // On the server, use the full URL
};

const defaultHeaders = {
    'Content-Type': 'application/json',
    'api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    // Add Authorization header if you use JWT or Firebase tokens
    // 'Authorization': `Bearer ${token}`,
};

const fetchApiInstance = async (url: string, options: RequestInit = {}) => {
    const baseUrl = getBaseUrl();
    const headers = { ...defaultHeaders, ...options.headers };

    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers: headers,
    });

    // Check for successful response
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Request failed');
    }

    // Parse the JSON response
    return response.json();
};

export default fetchApiInstance;
