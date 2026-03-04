"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, User, Mail, Phone, Home, Navigation, ArrowLeft } from "lucide-react";
import Link from "next/link";

const addressSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    pinCode: z
        .string()
        .min(6, "PIN code must be at least 6 digits")
        .regex(/^\d+$/, "PIN code must contain only numbers"),
    city: z.string().min(2, "City name must be at least 2 characters"),
    state: z.string().min(2, "State name must be at least 2 characters"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const FIELDS: {
    name: keyof AddressFormValues;
    label: string;
    icon: React.ElementType;
    type: string;
    placeholder: string;
}[] = [
        { name: "fullName", label: "Full Name", icon: User, type: "text", placeholder: "Jane Doe" },
        { name: "email", label: "Email Address", icon: Mail, type: "email", placeholder: "jane@example.com" },
        { name: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "9876543210" },
        { name: "pinCode", label: "PIN Code", icon: Navigation, type: "text", placeholder: "110001" },
        { name: "city", label: "City", icon: Home, type: "text", placeholder: "New Delhi" },
        { name: "state", label: "State", icon: MapPin, type: "text", placeholder: "Delhi" },
    ];

export default function AddressForm() {
    const router = useRouter();
    const { setAddress, address: saved, cartItems } = useCart();

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: saved?.fullName ?? "",
            email: saved?.email ?? "",
            phone: saved?.phone ?? "",
            pinCode: saved?.pinCode ?? "",
            city: saved?.city ?? "",
            state: saved?.state ?? "",
        },
    });

    React.useEffect(() => {
        if (cartItems.length === 0) router.push("/");
    }, [cartItems, router]);

    const onSubmit = (values: AddressFormValues) => {
        setAddress(values);
        router.push("/checkout/payment");
    };

    if (cartItems.length === 0) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-muted-foreground">
                    <Link href="/" className="flex items-center gap-1">
                        <ArrowLeft size={15} /> Back to Cart
                    </Link>
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={20} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Shipping Details</h1>
                </div>
            </div>

            <Card className="shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium text-muted-foreground">
                        Enter your delivery address
                    </CardTitle>
                </CardHeader>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {FIELDS.map(({ name, label, icon: Icon, type, placeholder }) => (
                                    <FormField
                                        key={name}
                                        control={form.control}
                                        name={name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{label}</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Icon
                                                            size={16}
                                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                                        />
                                                        <Input
                                                            type={type}
                                                            placeholder={placeholder}
                                                            className="pl-9"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </CardContent>

                        <Separator />

                        <CardFooter className="pt-5 pb-6 flex justify-end">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full sm:w-auto text-base font-semibold px-8 shadow-md"
                                disabled={form.formState.isSubmitting}
                            >
                                Continue to Payment
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
