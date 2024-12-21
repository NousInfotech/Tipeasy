import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response';
import { updateRestaurant } from '@/database/utils/queries';
import { uploadToCloudinary } from '@/services/cloudinary/uploadImage';
import { generateQRImage } from '@/utils/generateQrImage';
import { withDbConnection } from '@/database/utils/withDbConnection'; // Assuming this is your DB connection handler
import { validateRestaurant } from '@/utils/validationUtils';

/**
 * POST API Route handler to generate a QR code for a restaurant and upload it to Cloudinary.
 * 
 * @param {NextRequest} req - The incoming HTTP request object.
 * 
 * @returns {NextResponse} - A response containing the status of the QR code generation and upload.
 */
export const POST = withDbConnection(async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Parse the query params from the request URL
        const { searchParams } = new URL(req.url);
        const restaurantId = searchParams.get("restaurantId") as string;

        await validateRestaurant(restaurantId);

        // Generate QR code image (Base64 format)
        const qrCodeBase64 = await generateQRImage(restaurantId);

        // Upload the QR code to Cloudinary
        const qrUrl = await uploadToCloudinary(qrCodeBase64, 'qr', `qr-${restaurantId}`);

        // Update the restaurant with the new QR code URL
        const isUpdated = await updateRestaurant(restaurantId, { qrCodeUrl: qrUrl });

        if (!isUpdated) {
            return NextResponse.json(
                errorResponse({
                    message: 'Failed to update the database',
                    code: 'DB_UPDATE_ERROR',
                    status: 500,
                })
            );
        }

        // Respond with success
        return NextResponse.json(successResponse('QR code generated successfully', { qrUrl }));
    } catch (error: unknown) {
        console.error('Error processing request:', error);
        return NextResponse.json(errorResponse(error));
    }
});
