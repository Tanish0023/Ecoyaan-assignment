import CartClient from "@/components/cart/CartClient";
import { fetchCartData } from "@/actions/cart";

export default async function CartPage() {
  const initialData = await fetchCartData();

  return (
    <div className="min-h-[calc(100vh-16rem)] bg-stone-50">
      <CartClient initialData={initialData} />
    </div>
  );
}
