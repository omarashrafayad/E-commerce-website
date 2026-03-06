import ProductDetails from "@/features/main/shop/template/productDetails";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    return <ProductDetails params={params} />
}