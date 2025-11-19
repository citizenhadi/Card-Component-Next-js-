"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Heart,
  Star,
  StarHalf,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";

export default function Card({
  product,
  onAddToCart = () => {},
  onToggleWishlist = (t) => {
    !t;
  },
}) {
  const [qty, setQty] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? null);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-sm w-full rounded-2xl shadow-sm border p-4 bg-white">
        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
          <ImageIcon className="w-12 h-12 opacity-40" />
        </div>
      </div>
    );
  }

  const priceDisplay = (p) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: product.currency ?? "USD",
    }).format(p);

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(0, q - 1));

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      qty,
      color: selectedColor,
      size: selectedSize,
    });
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    onToggleWishlist(product.id);
  };

  const fullStars = Math.floor(product.rating || 0);
  const hasHalf = (product.rating || 0) - fullStars >= 0.5;

  return (
    <div className="max-w-xs w-full bg-white rounded-2xl shadow-lg border overflow-hidden">
      <div className="relative w-full aspect-[4/5] bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-contain p-4"
            priority
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-300">
            <ImageIcon className="w-16 h-16" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          {product.isOnSale && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 ring-1 ring-red-100">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              New
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          aria-pressed={wishlisted}
          className={`absolute top-3 right-3 p-2 rounded-full shadow transition-colors duration-200 ${
            wishlisted ? "bg-red-600 text-white" : "bg-white/80 text-gray-500"
          }`}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
      {/* ========================== */}

      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={i} className="w-4 h-4" />
              ))}
              {hasHalf && <StarHalf className="w-4 h-4" />}
              {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map(
                (_, i) => (
                  <Star key={`e-${i}`} className="w-4 h-4 opacity-30" />
                )
              )}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews ?? 0})
            </span>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium">
              {priceDisplay(product.price)}
            </div>
            {product.compareAt && (
              <div className="text-xs text-gray-400 line-through">
                {priceDisplay(product.compareAt)}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border p-1">
            <button onClick={dec} className="p-1 px-2 rounded">
              <Minus className="w-4 h-4" />
            </button>
            <div className="px-3 text-sm font-medium">{qty}</div>
            <button onClick={inc} className="p-1 px-2 rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700"
          >
            <ShoppingCart className="w-4 h-4" /> Add to cart
          </button>
        </div>

        <div className="pt-2 border-t text-xs text-gray-500 flex justify-between">
          <span>Free returns • 30 days</span>
          <span>{product.inStock ? "In stock" : "Out of stock"}</span>
        </div>
      </div>
    </div>
  );
}
