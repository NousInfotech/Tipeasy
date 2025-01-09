import { deleteImageFromCloudinary } from "@/services/cloudinary/deleteImage";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Parse the request body
        const body = await req.json();
        const { cloudinaryImageURL } = body;

        if (!cloudinaryImageURL) {
            return NextResponse.json(errorResponse("cloudinaryImageURL is required"), { status: 400 });
        }

        // Delete the image
        await deleteImageFromCloudinary(cloudinaryImageURL);

        // Return success response
        return NextResponse.json(successResponse("Image deleted successfully"));
    } catch (error: unknown) {
        // Handle errors
        return NextResponse.json(errorResponse(error), { status: 500 });
    }
};
