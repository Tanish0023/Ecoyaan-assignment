"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck, ArrowLeft, ShieldCheck, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentScreen() {
    const router = useRouter();
    const { cartItems, address, subTotal, shippingFee, grandTotal } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    React.useEffect(() => {
        if (cartItems.length === 0 || !address) router.push("/");
    }, [cartItems, address, router]);

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push("/checkout/success");
    };

    if (cartItems.length === 0 || !address) return null;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-muted-foreground">
                    <Link href="/checkout/address" className="flex items-center gap-1">
                        <ArrowLeft size={15} /> Back to Address
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CreditCard size={20} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Review & Pay</h1>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                <div className="flex-1 space-y-5">
                    <Card className="shadow-sm gap-2">
                        <CardHeader className="pb-3 flex items-center space-y-0">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Truck size={16} className="text-muted-foreground" />
                                Shipping to
                            </CardTitle>
                            <Button variant="link" size="sm" asChild className="text-primary p-0 h-auto">
                                <Link href="/checkout/address">Edit</Link>
                            </Button>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-4 space-y-1">
                            <p className="font-semibold">{address!.fullName}</p>
                            <p className="text-sm text-muted-foreground">{address!.email} · {address!.phone}</p>
                            <p className="text-sm text-muted-foreground">
                                {address!.city}, {address!.state} – {address!.pinCode}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-base font-semibold">Order Items</CardTitle>
                            <Button variant="link" size="sm" asChild className="text-primary p-0 h-auto">
                                <Link href="/">Edit</Link>
                            </Button>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-4 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product_id} className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border">
                                        <Image src={item.image} alt={item.product_name} fill className="object-cover" sizes="64px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm leading-snug truncate">{item.product_name}</p>
                                        <Badge variant="secondary" className="mt-1 text-xs">Qty: {item.quantity}</Badge>
                                    </div>
                                    <p className="font-semibold text-sm flex-shrink-0">₹{item.product_price * item.quantity}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full lg:w-[22rem] flex-shrink-0">
                    <Card className="shadow-sm sticky top-24">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold">Payment Summary</CardTitle>
                        </CardHeader>
                        <Separator />

                        <CardContent className="pt-5 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">₹{subTotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping fee</span>
                                <span className="font-medium">₹{shippingFee}</span>
                            </div>
                            <Separator className="!my-4" />
                            <div className="flex justify-between items-baseline">
                                <span className="font-bold text-base">Total to Pay</span>
                                <span className="text-2xl font-extrabold text-primary">₹{grandTotal}</span>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
                            <Button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full h-12 text-base font-semibold shadow-md"
                                size="lg"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin mr-2" />
                                        Processing…
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={18} className="mr-2" />
                                        Pay Securely Now
                                    </>
                                )}
                            </Button>

                            <div className="flex items-start gap-2 p-3 bg-muted/60 rounded-lg border border-border text-xs text-muted-foreground leading-relaxed">
                                <Info size={14} className="flex-shrink-0 mt-0.5" />
                                This is a simulated checkout. No real payment will be processed.
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
