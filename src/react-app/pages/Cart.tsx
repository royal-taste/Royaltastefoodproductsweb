import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../contexts/CartContext';
import WhatsAppButton from '../components/WhatsAppButton';

// Add dynamic image resolver
const imageModules = import.meta.glob('../../product-images/*.{jpg,JPG,jpeg,png}', { eager: true, as: 'url' });
function getImageUrl(filename: string): string {
  const entry = Object.entries(imageModules).find(([path]) => path.toLowerCase().endsWith(`/${filename.toLowerCase()}`));
  if (!entry) {
    console.warn('Image not found:', filename, imageModules);
    return '/placeholder.jpg';
  }
  return entry[1] as string;
}

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();

  const formatOrderMessage = () => {
    if (items.length === 0) return "";

    let message = "Hello! I would like to place an order for the following items from Royal Taste Food Products:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Category: ${item.category}\n`;
      message += `   Price: ${item.price} x ${item.quantity} = ₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(0)}\n\n`;
    });

    message += `Total Items: ${getTotalItems()}\n`;
    message += `Total Amount: ₹${getTotalPrice().toFixed(0)}\n\n`;
    message += "Please provide me with details about availability, delivery options, and payment methods. Thank you!";

    return message;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start shopping to add some delicious Kerala traditional products to your cart.
          </p>
          <Link 
            to="/products"
            className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-8 py-4 rounded-lg font-medium hover:from-amber-800 hover:to-orange-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Link 
            to="/products"
            className="text-amber-700 hover:text-amber-800 font-medium flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                <div className="flex items-center gap-4">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                    <div className="text-2xl font-bold text-amber-700">{item.price}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-gray-600 hover:text-amber-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-gray-600 hover:text-amber-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-xl font-bold text-gray-800">
                    ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium text-gray-800">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-amber-700">₹{getTotalPrice().toFixed(0)}</span>
                </div>
              </div>

              {/* Order Button */}
              <WhatsAppButton
                message={formatOrderMessage()}
                className="w-full bg-gradient-to-r from-amber-700 to-orange-600 text-white py-4 rounded-lg hover:from-amber-800 hover:to-orange-700 font-medium transition-all duration-300 justify-center text-lg mb-4"
              >
                Order via WhatsApp
              </WhatsAppButton>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full border-2 border-red-200 text-red-600 py-3 rounded-lg hover:bg-red-50 font-medium transition-all duration-300"
              >
                Clear Cart
              </button>

              {/* Order Info */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Order Information:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    Direct WhatsApp ordering
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    Fresh products from Palakkad
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                    Secure delivery options
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
