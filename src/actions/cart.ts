"use server";

export async function fetchCartData() {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
        cartItems: [
            {
                product_id: 101,
                product_name: "Bamboo Toothbrush (Pack of 4)",
                product_price: 299,
                quantity: 2,
                image: "https://media.istockphoto.com/id/1198407865/photo/close-up-of-organic-bamboo-toothbrushes-in-the-bathroom.jpg?s=612x612&w=0&k=20&c=VRP2CZFwEZXqOKacMhVLt3oS_JAtzAeUdJYcDxTDZ78=",
            },
            {
                product_id: 102,
                product_name: "Reusable Cotton Produce Bags",
                product_price: 450,
                quantity: 1,
                image: "https://media.istockphoto.com/id/2168160054/photo/cotton-tote-bag-canvas-eco-friendly-shopping-bag-mockup.jpg?s=612x612&w=0&k=20&c=Wy_gSSFVkIT6R4iwLajP7Gbf2YVhAeQamA_o9dw5dKw=",
            },
        ],
        shipping_fee: 50,
        discount_applied: 0,
    };
}
