import OrderDetailsPage from "@/features/main/orders/template/orderDatails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <OrderDetailsPage params={params} />
}