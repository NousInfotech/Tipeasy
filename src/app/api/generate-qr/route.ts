import { NextRequest, NextResponse } from 'next/server';
import { successResponse, errorResponse } from '@/utils/response';
import { updateRestaurant } from '@/database/utils/queries';
import { uploadToCloudinary } from '@/services/cloudinary/uploadImage';
import { generateQRImage } from './utils';
import connectDB from '@/database/connection';

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const restaurantId = searchParams.get("restaurantId");

        if (!restaurantId) {
            return NextResponse.json(
                errorResponse({ message: 'Missing restaurantId', code: 'VALIDATION_ERROR', status: 400 })
            );
        }

        // generate qrImage
        const qrCodeBase64 = await generateQRImage(restaurantId);

        // Upload to Cloudinary
        const qrUrl = await uploadToCloudinary(qrCodeBase64, 'qr', `qr-${restaurantId}`);
        await connectDB();
        const isUpdated = await updateRestaurant(restaurantId, { qrCodeUrl: qrUrl });
        if (!isUpdated) {
            return NextResponse.json(
                errorResponse({ message: 'Failed to update the database', code: 'DB_UPDATE_ERROR', status: 500 })
            );
        }

        // Respond with success
        return NextResponse.json(successResponse('QR code generated successfully', { qrUrl }));
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(errorResponse(error));
    }
}
