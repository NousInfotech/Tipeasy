import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { updateRestaurant } from "@/database/utils/queries";
import { uploadToCloudinary } from "@/services/cloudinary/uploadImage";
import { generateQRImage } from "@/utils/generateQrImage";
import { withDbConnection } from "@/database/utils/withDbConnection";
import { validateRestaurant } from "@/utils/validationUtils";

/**
 * POST API Route handler to generate a QR code for a restaurant and upload it to Cloudinary.
 *
 * @param {NextRequest} req - The incoming HTTP request object.
 *
 * @returns {Promise<Response>} - A response containing the status of the QR code generation and upload.
 */
export const POST = withDbConnection(async (req: NextRequest): Promise<Response> => {
  try {
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("restaurantId") as string;

    await validateRestaurant(restaurantId);

    const qrCodeBase64 = await generateQRImage(restaurantId);
    const qrUrl = await uploadToCloudinary(qrCodeBase64, "qr", `qr-${restaurantId}`);

    const isUpdated = await updateRestaurant(restaurantId, { qrCodeUrl: qrUrl });

    if (!isUpdated) {
      return new Response(
        JSON.stringify(
          errorResponse({
            message: "Failed to update the database",
            code: "DB_UPDATE_ERROR",
            status: 500,
          })
        ),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(successResponse("QR code generated successfully", { qrUrl })),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify(errorResponse(error)),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

