import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
  };
  className?: string;
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-3 rounded-lg hover:from-amber-800 hover:to-orange-700 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${className} ${
        isAdded ? 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' : ''
      }`}
    >
      {isAdded ? (
        <>
          <Check className="w-4 h-4" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </>
      )}
    </button>
  );
}
