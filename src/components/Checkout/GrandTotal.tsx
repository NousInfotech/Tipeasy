import { MenuItem } from "@/types";

interface GrandTotalProps {
    items: {
        item: MenuItem;
        quantity: number; // Changed `Number` to `number` for correct type casing
    }[];
    className?: string; // Make `className` optional
}

const GrandTotal = ({ items, className }: GrandTotalProps) => {
    const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

    return (
        <div className={`mt-4 text-sm font-semibold flex flex-row justify-between items-center ${className ?? ''}`}>
            <h1>Grand Total:</h1>
            <h1>₹{total.toFixed(2)}</h1>
        </div>
    );
};

export default GrandTotal;
