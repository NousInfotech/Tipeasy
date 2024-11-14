// src/app/restaurants/[restaurantId]/menu/page.tsx
import React from "react";
import { mockMenuItems } from "@/Mockdata/RestaurantData";
import { GetStaticProps, GetStaticPaths } from "next";
import { MenuItem } from "@/types";
import HeaderwithBackButton from "@/components/HeaderwithBackButton/HeaderwithBackButton";
import SearchBar from "@/components/SearchBar/SearchBar";

interface MenuProps {
  menuItems: MenuItem[];
  restaurantId: string;
}

const Menu: React.FC<MenuProps> = ({ menuItems, restaurantId }) => {
  return (
    // <section>
    //   <h2 className="text-xl font-bold text-center mb-6">Menu</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    //     {mockMenuItems.length > 0 ? (
    //       mockMenuItems.map((item) => (
    //         <div key={item.menuItemId} className="border p-4 rounded-lg">
    //           <img
    //             src={item.image}
    //             alt={item.name}
    //             className="w-full h-32 object-cover rounded-md mb-4"
    //           />
    //           <h3 className="text-lg font-semibold">{item.name}</h3>
    //           <p className="text-sm text-gray-500">{item.description}</p>
    //           <p className="text-lg font-bold mt-2">${item.price}</p>
    //           <p
    //             className={`mt-2 text-sm ${item.availability ? "text-green-500" : "text-red-500"
    //               }`}
    //           >
    //             {item.availability ? "Available" : "Not Available"}
    //           </p>
    //         </div>
    //       ))
    //     ) : (
    //       <p className="text-center text-gray-500">No menu items available.</p>
    //     )}
    //   </div>
    // </section>
    <section>
      <HeaderwithBackButton heading="menu items" />
      <SearchBar/>
    </section>
  );
};


export default Menu;
