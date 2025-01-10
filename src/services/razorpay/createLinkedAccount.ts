// /* eslint-disable */


// import { razorpayInstance } from "@/config/razorpay";


// interface IBankDetails {
//     accountName: string;
//     ifsc: string;
//     accountNumber: string;
// }

// interface ILinkedAccountResponse {
//     linkedAccount: object; // Replace with Razorpay's linked account type if available
//     bankAccount: object; // Replace with Razorpay's bank account type if available
// }

// /**
//  * Creates a linked account in Razorpay and associates a bank account with it.
//  * @param {any} accountDetails - Minimal details required for creating a linked account.
//  * @param {IBankDetails} bankDetails - Bank details to link to the created account.
//  * @returns {Promise<ILinkedAccountResponse>} - Details of the created linked account and linked bank account.
//  */
// export async function createAndLinkAccount(
//     accountDetails: any,
//     bankDetails: IBankDetails
// ): Promise<ILinkedAccountResponse> {
//     try {
//         // Step 1: Create the linked account with minimal details
//         const linkedAccount = await razorpayInstance.accounts.create(accountDetails);
//         console.log("Linked Account Created:", linkedAccount);

//         // Step 2: Validate linked account creation response
//         if (!linkedAccount || !linkedAccount.id) {
//             throw new Error("Failed to create linked account");
//         }

//         // Step 3: Add the bank account to the linked account
//         const accountId = linkedAccount.id;

//         // const bankAccount = await razorpayInstance.accounts.edit(accountId, {
//         //     bank_accounts: {
//         //         name: bankDetails.accountName,
//         //         ifsc: bankDetails.ifsc,
//         //         account_number: bankDetails.accountNumber,
//         //     },
//         // });
//         // console.log("Bank Account Linked:", bankAccount);

//         // Step 4: Return both linked account and bank account details
//     } catch (error) {
//         console.error("Error creating and linking account:", error.message);
//         throw error;
//     }
// }
