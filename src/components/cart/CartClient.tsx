"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ChevronRight, ShieldCheck, Truck, Leaf } from "lucide-react";

export default function CartClient({ initialData }: { initialData: any }) {
    const { cartItems, shippingFee, grandTotal, subTotal, setCartData } = useCart();

    useEffect(() => {
        if (cartItems.length === 0) {
            setCartData(initialData.cartItems, initialData.shipping_fee, initialData.discount_applied);
        }
    }, [initialData, setCartData, cartItems.length]);

    const displayItems = cartItems.length > 0 ? cartItems : initialData.cartItems;
    const displaySubTotal = cartItems.length > 0
        ? subTotal
        : initialData.cartItems.reduce((acc: number, item: any) => acc + item.product_price * item.quantity, 0);
    const displayShipping = cartItems.length > 0 ? shippingFee : initialData.shipping_fee;
    const displayGrandTotal = cartItems.length > 0 ? grandTotal : displaySubTotal + displayShipping;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingBag size={20} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                <div className="flex-1">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Leaf size={16} className="text-primary" />
                                Review Items
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-6 pb-0">
                            <div className="divide-y divide-border">
                                {displayItems.map((item: any) => (
                                    <div key={item.product_id} className="py-5 first:pt-0 flex flex-col sm:flex-row gap-4 sm:gap-5">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.product_name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 96px, 112px"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <p className="font-semibold text-base">{item.product_name}</p>
                                                <Badge variant="secondary" className="mt-1.5 text-xs">Eco-friendly</Badge>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <Badge variant="outline" className="font-medium">Qty: {item.quantity}</Badge>
                                                <span className="font-bold text-lg text-primary">₹{item.product_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="bg-muted/50 mt-4 rounded-b-xl border-t px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck size={15} className="text-primary" />
                            Standard delivery in 3–5 business days.
                        </CardFooter>
                    </Card>
                </div>

                <div className="w-full lg:w-[22rem] flex-shrink-0">
                    <Card className="shadow-sm sticky top-24">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">₹{displaySubTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping fee</span>
                                <span className="font-medium">₹{displayShipping}</span>
                            </div>

                            <Separator className="my-2" />

                            <div className="flex justify-between items-baseline">
                                <span className="text-base font-bold">Grand Total</span>
                                <span className="text-2xl font-extrabold text-primary">₹{displayGrandTotal}</span>
                            </div>
                            <p className="text-xs text-muted-foreground text-right">Inclusive of all taxes</p>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3 pt-2">
                            <Button asChild className="w-full h-12 text-base font-semibold shadow-md" size="lg">
                                <Link href="/checkout/address" className="flex items-center gap-2 group">
                                    Proceed to Checkout
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>

                            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck size={13} className="text-primary" />
                                100% Secure Payment Guarantee
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
