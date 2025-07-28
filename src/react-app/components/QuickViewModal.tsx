import { X, Star } from 'lucide-react';
import { useEffect } from 'react';
import AddToCartButton from './AddToCartButton';

interface WeightOption {
  weight: string;
  price: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  weightOptions: WeightOption[];
  rating: number;
  image: string;
  description: string;
}

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image || '/placeholder.jpg'} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-4 left-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="mb-8">
                <div className="text-2xl font-bold text-amber-700 mb-2">
                  Starting from {product.weightOptions[0].price}
                </div>
                {product.weightOptions.length > 1 && (
                  <div className="text-sm text-gray-600">
                    Available in {product.weightOptions.length} different weights
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <AddToCartButton 
                product={product}
                className="text-lg py-4"
              />
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Product Highlights:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    Traditional Kerala recipe
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    100% natural ingredients
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    From Thiruvazhiyode, Palakkad
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    Freshly processed & packed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
