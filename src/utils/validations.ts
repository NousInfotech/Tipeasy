import { z } from 'zod';

// Validation for Address
const addressSchema = z.object({
  no: z.string().min(1, "Address number is required"),
  street: z.string().min(1, "Street is required"),
  area: z.string().optional(),
  townCity: z.string().min(1, "Town/City is required"),
  pinCode: z.string().regex(/^\d{5,6}$/, "Invalid pin code format"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().default("India"),
});

// Validation for Dietary Preference
const dietaryPreferenceSchema = z.object({
  type: z.string().min(1, "Dietary type is required"),
  description: z.string().optional(),
});

// Validation for Menu
const menuSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imgSrc: z.string().url("Invalid image URL").optional(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  availability: z.boolean(),
  dietaryPreference: z.string().min(1, "Dietary preference is required"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
});

// Validation for Restaurant
const restaurantSchema = z.object({
  title: z.string().min(1, "Restaurant title is required"),
  googleLocation: z.string().url("Invalid URL format").optional(),
  email: z.string().email("Invalid email format").optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  description: z.string().optional(),
  address: addressSchema,
  profileImage: z.string().url("Invalid image URL").optional(),
  qrStatus: z.enum(["none", "generated", "sent"]),
  qrCodeUrl: z.string().url("Invalid QR code URL").optional(),
});

// Validation for Order
const orderSchema = z.object({
  menuItems: z.array(
    z.object({
      menuId: z.string().min(1, "Menu ID is required"),
      quantity: z.number().int().positive("Quantity must be a positive integer"),
    })
  ),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  tableNo: z.string().min(1, "Table number is required"),
  customerName: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional(),
  totalAmount: z.number().positive("Total amount must be a positive number"),
  dateTime: z.date().optional(),
  status: z.enum(["pending", "ongoing", "served"]),
  notes: z.string().optional(),
});

// Validation for Tipping
const tippingSchema = z.object({
  waiterId: z.string().min(1, "Waiter ID is required"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  tipAmount: z.number().positive("Tip amount must be a positive number"),
  rating: z.number().min(0).max(5, "Rating must be between 1 and 5").optional(),
  experience: z.enum(["very_sad", "sad", "neutral", "happy", "very_happy", "no_experience"]).optional(),
  razorpayPaymentId: z.string().optional(),
  razorpayFundId: z.string().optional(),
  comments: z.string().optional(),
  dateTime: z.date().optional(),
});

// Validation for Waiter
const waiterSchema = z.object({
  name: z.string().min(1, "Waiter name is required"),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email format"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  ratings: z.number().min(0, "Ratings must be a positive number").optional(),
  firebaseId: z.string().min(1, "Firebase ID is required").optional(),
  imgSrc: z.string().url("Invalid image URL").optional(),
  bankDetails: z.object({
    accountNumber: z.string().regex(/^\d{9,18}$/, "Invalid account number").optional(),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code").optional(),
    bankName: z.string().optional(),
    razorpayFundAccountId: z.string().optional()
  }).optional(),
});

// Validation for User
const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  firebaseId: z.string().min(1, "Firebase ID is required"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
  role: z.enum(["admin", "superadmin"]),
});

// Export schemas for validation
export {
  addressSchema,
  dietaryPreferenceSchema,
  menuSchema,
  restaurantSchema,
  orderSchema,
  tippingSchema,
  waiterSchema,
  userSchema,
};
