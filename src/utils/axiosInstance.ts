import axios from 'axios';

// Dynamically set the base URL depending on the environment
const baseURL = typeof window !== "undefined"
  ? ""  // On the client, just use relative paths, Next.js automatically handles this
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // On the server, use the full URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    // Add common headers if needed
    'Content-Type': 'application/json',
    // Add Authorization header if you use JWT or Firebase tokens
    // 'Authorization': `Bearer ${token}`,
  },
});

export default axiosInstance;
