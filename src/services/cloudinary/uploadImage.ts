import cloudinary from '@/config/cloudinary.ts'

/**
 * Uploads a base64 image to Cloudinary.
 * @param {string} base64Image - The image in base64 format.
 * @param {string} folderName - The name of the folder on Cloudinary.
 * @param {string} imageName - The desired public ID of the image.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
export async function uploadToCloudinary(base64Image: string, folderName: string, imageName: string): Promise<string> {
    try {
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: folderName,
            public_id: imageName,
            overwrite: true,
            resource_type: 'image',
        });

        return uploadResult.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
        console.error('Cloudinary upload failed:', error);
        throw new Error('Failed to upload image to Cloudinary.');
    }
}
