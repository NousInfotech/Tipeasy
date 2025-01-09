import cloudinary from "@/config/cloudinary";

/**
 * Deletes an image from Cloudinary using its URL.
 * @param imageUrl - The full URL of the image to be deleted.
 * @returns {Promise<void>} - Resolves when the image is deleted or throws an error.
 */
export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
    try {
        // Extract the public ID from the image URL
        const publicId = extractImageIdFromUrl(imageUrl);

        if (!publicId) {
            throw new Error("Invalid image URL. Unable to extract public ID.");
        }

        // Delete the image from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        // Handle Cloudinary's response
        if (result.result === "ok") {
            console.log(`Image deleted successfully: ${publicId}`);
        } else if (result.result === "not found") {
            console.warn(`Image not found on Cloudinary: ${publicId}`);
        } else {
            throw new Error(`Unexpected result from Cloudinary: ${result.result}`);
        }
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        throw error;
    }
};

/**
 * Extracts the public ID (including folder) from a Cloudinary URL.
 * @param imageUrl - The full Cloudinary image URL.
 * @returns {string | null} - The extracted public ID (including folder) or null if not found.
 */
const extractImageIdFromUrl = (imageUrl: string): string | null => {
    try {
        const urlParts = new URL(imageUrl);
        const path = urlParts.pathname; // Get the path after the domain
        const segments = path.split("/"); // Split the path into parts

        // The file is at the last segment
        const fileWithExtension = segments[segments.length - 1];
        const [imageId] = fileWithExtension.split("."); // Remove file extension

        // The folder is all the segments before the last one
        const folderPath = segments.slice(segments.length - 2, segments.length - 1).join("/");

        // Combine the folder path and imageId to form the public ID
        const publicId = folderPath ? `${folderPath}/${imageId}` : imageId;

        return publicId || null;
    } catch (error) {
        console.error("Error extracting public ID from URL:", error);
        return null;
    }
};

