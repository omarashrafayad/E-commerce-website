import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import Image from "next/image";
import { Star } from "lucide-react";
import { ICardProduct } from "@/types/product.types";


interface ProductCardProps {
    product: ICardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all hover:shadow-xl flex flex-col h-full border-zinc-200 dark:border-zinc-800">
            <div className="aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                <Link href={`/product/${product.id}`} className="block h-full w-full">
                    <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                {product.isNew && (
                    <div className="absolute top-3 left-3 pointer-events-none z-10">
                        <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                            New
                        </span>
                    </div>
                )}
                {product.discount && (
                    <div className="absolute top-3 right-3 pointer-events-none z-10">
                        <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                            -{product.discount}%
                        </span>
                    </div>
                )}

                <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 gap-2 z-20 bg-gradient-to-t from-zinc-900/50 to-transparent">
                    <AddToCartButton
                        productId={product.id}
                        className="flex-1 h-9 cursor-pointer font-bold bg-primary text-primary-foreground shadow-sm rounded-lg"
                    />
                    <WishlistButton
                        productId={String(product.id)}
                        className="h-9 w-9 bg-white cursor-pointer text-zinc-900 border-none rounded-lg shrink-0 shadow-sm hover:scale-105"
                    />
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded">
                        <Star className="size-3 fill-current" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px] leading-snug">
                    <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                        {product.name}
                    </Link>
                </h3>

                <div className="flex items-center gap-2">
                    <p className="text-lg font-extrabold text-foreground">${product.price}</p>
                    {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through opacity-60">${product.originalPrice}</p>
                    )}
                </div>

                <div
                    className="md:hidden mt-auto pt-3 flex items-center gap-2 border-t border-border/50 relative z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <AddToCartButton
                        productId={product.id}
                        className="flex-1 h-9 text-[11px] cursor-pointer font-bold bg-primary text-primary-foreground shadow-sm rounded-lg"
                    />
                    <WishlistButton
                        productId={String(product.id)}
                        className="h-9 w-9 bg-zinc-50 dark:bg-zinc-900 cursor-pointer border-zinc-200 dark:border-zinc-800 rounded-lg shrink-0"
                    />
                </div>
            </div>
        </div>
    );
}
