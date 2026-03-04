"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Leaf, ShoppingBag } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-16">
            <Card className="shadow-xl max-w-md w-full text-center">
                <CardContent className="pt-12 pb-10 flex flex-col items-center gap-5">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                        <CheckCircle2 size={52} className="text-primary" strokeWidth={1.5} />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight">Order Placed!</h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Thank you for shopping sustainably with Ecoyaan. Your eco-friendly products are on their way 🌱
                        </p>
                    </div>

                    <Badge variant="secondary" className="flex items-center gap-1.5 py-1.5 px-3 text-sm">
                        <Leaf size={13} className="text-primary" />
                        You saved the planet a little today
                    </Badge>

                    <div className="pt-4 w-full space-y-3">
                        <Button asChild className="w-full h-11 font-semibold shadow-md" size="lg">
                            <Link href="/" className="flex items-center gap-2">
                                <ShoppingBag size={16} />
                                Continue Shopping
                            </Link>
                        </Button>
                        <p className="text-xs text-muted-foreground">
                            A confirmation will be sent to your email.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
