import React from 'react';
import { getRestaurants } from '@/api/restaurantApi'; // Adjust import as necessary
import { IRestaurant } from '@/types/schematypes';
import Link from 'next/link';

const Page = async () => {
  const restaurants = await getRestaurants() as IRestaurant[]; // Fetch data at runtime

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Restaurant List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => (
          <div key={restaurant._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Image */}
            <img
              src={restaurant.profileImage}
              alt={restaurant.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              {/* Restaurant Title */}
              <h2 className="text-xl font-semibold text-gray-800">{restaurant.title}</h2>

              {/* Restaurant Description */}
              <p className="text-gray-600 mt-2">{restaurant.description}</p>

              {/* Restaurant Info */}
              <div className="mt-4">
                <a
                  href={restaurant.googleLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View Location on Google Maps
                </a>
                <div className="mt-2">
                  <span className="text-gray-500 text-sm">Email: </span>
                  <span className="text-gray-700 text-sm">{restaurant.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Phone: </span>
                  <span className="text-gray-700 text-sm">{restaurant.phoneNumber}</span>
                </div>
              </div>

              {/* QR Code and Status */}
              <div className="mt-4 flex items-center space-x-2">
                <a href={restaurant.qrCodeUrl} target="_blank" rel="noopener noreferrer">
                  <img src={restaurant.qrCodeUrl} alt="QR Code" className="w-12 h-12" />
                </a>
                <span
                  className={`text-sm ${restaurant.qrStatus === 'sent' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {restaurant.qrStatus === 'sent' ? 'QR Sent' : 'QR Not Sent'}
                </span>
              </div>

              {/* Navigation Link */}
              <div className="mt-4">
                <Link href={`/restaurant/${restaurant._id}`}>
                  <p className="text-blue-500 text-sm">View Restaurant Details</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
