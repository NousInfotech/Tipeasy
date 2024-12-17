import QRCode from 'qrcode';

/**
 * Generates a Base64 QR code for the given restaurant ID.
 * @param {string} restaurantId - The restaurant's unique identifier.
 * @returns {Promise<string>} - A promise resolving to the QR code in Base64 format.
 * @throws {Error} - If the QR code generation fails.
 */
export const generateQRImage = async (restaurantId: string): Promise<string> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (!baseURL) {
      throw new Error('Base URL is not defined in environment variables.');
    }

    // Construct the restaurant-specific URL
    const restaurantURL = `${baseURL}/restaurant/${restaurantId}`;

    // Generate the QR code as a Base64 string
    const qrCodeBase64 = await QRCode.toDataURL(restaurantURL);

    return qrCodeBase64;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};
