import { validateResponse } from "@/types/schematypes";
import { checkResponse } from "@/utils/checkResponse";
import { post } from "@/utils/request";

interface razorpayOrder {
    id: string
}

export const createOrder = async (amount: number, notes: object) => {
    const url = '/api/tippings/createOrder'
    const response = await post(url, { amount, notes }) as validateResponse;
    const order = checkResponse(response) as razorpayOrder;
    return order.id;
}

