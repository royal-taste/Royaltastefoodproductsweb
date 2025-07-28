import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface WeightOption {
  weight: string;
  price: string;
}

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    weightOptions: WeightOption[];
    image: string;
    category: string;
  };
  className?: string;
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: selectedWeight.price,
        weight: selectedWeight.weight,
        image: product.image,
        category: product.category
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleWeightChange = (weightOption: WeightOption) => {
    setSelectedWeight(weightOption);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Weight Selection */}
      {product.weightOptions.length > 1 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Weight:</label>
          <div className="flex gap-2">
            {product.weightOptions.map((option) => (
              <button
                key={option.weight}
                onClick={() => handleWeightChange(option)}
                className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                  selectedWeight.weight === option.weight
                    ? 'border-amber-600 bg-amber-50 text-amber-700 font-medium'
                    : 'border-gray-300 text-gray-600 hover:border-amber-400'
                }`}
              >
                {option.weight} - {option.price}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-3 rounded-lg hover:from-amber-800 hover:to-orange-700 font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
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
            Add to Cart ({quantity}x {selectedWeight.weight})
          </>
        )}
      </button>
    </div>
  );
}
