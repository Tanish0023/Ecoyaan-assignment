"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItemType = {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
};

export type AddressType = {
    fullName: string;
    email: string;
    phone: string;
    pinCode: string;
    city: string;
    state: string;
};

interface CartContextType {
    cartItems: CartItemType[];
    shippingFee: number;
    discountApplied: number;
    address: AddressType | null;
    setCartData: (items: CartItemType[], shipping: number, discount: number) => void;
    setAddress: (address: AddressType) => void;
    subTotal: number;
    grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [discountApplied, setDiscountApplied] = useState<number>(0);
    const [address, setAddress] = useState<AddressType | null>(null);

    const subTotal = cartItems.reduce((acc, item) => acc + item.product_price * item.quantity, 0);
    const grandTotal = subTotal + shippingFee - discountApplied;

    const setCartData = (items: CartItemType[], shipping: number, discount: number) => {
        setCartItems(items);
        setShippingFee(shipping);
        setDiscountApplied(discount);
    };

    return (
        <CartContext.Provider value={{
            cartItems, shippingFee, discountApplied, address, setCartData, setAddress, subTotal, grandTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
