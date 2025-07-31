import { Star, Eye, Quote } from 'lucide-react';
import { useState } from 'react';
import AddToCartButton from '../components/AddToCartButton';
import QuickViewModal from '../components/QuickViewModal';
import WhatsAppButton from '../components/WhatsAppButton';

const products = [
  // Puttupodi Collection - Different rates for 500g and 1kg
  {
    id: 1,
    name: "Steamed Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹55" },
      { weight: "1kg", price: "₹100" }
    ],
    rating: 4.2,
    image: "STEAMED PUTTU POWDER.jpg",
    description: "Traditional Kerala steamed puttu powder made from finest rice."
  },
  {
    id: 2,
    name: "Ragi Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹95" },
      { weight: "1kg", price: "₹180" }
    ],
    rating: 4.5,
    image: "RAGI PUTTU POWDER.jpg",
    description: "Nutritious finger millet puttu powder, rich in calcium and iron."
  },
  {
    id: 3,
    name: "Greengram Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹90" },
      { weight: "1kg", price: "₹170" }
    ],
    rating: 4.3,
    image: "GREENGRAM PUTTU POWDER.jpg",
    description: "High-protein green gram puttu powder for healthy breakfast."
  },
  {
    id: 4,
    name: "Beetroot Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹110" },
      { weight: "1kg", price: "₹220" }
    ],
    rating: 4.1,
    image: "BEETROOT PUTTU POWDER.jpg",
    description: "Natural beetroot-infused puttu powder with vibrant color and taste."
  },
  {
    id: 5,
    name: "Muringa Leaves Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹110" },
      { weight: "1kg", price: "₹220" }
    ],
    rating: 4.4,
    image: "MORINGA LEAVES PUTTU POWDER.jpg",
    description: "Superfood moringa leaves mixed puttu powder, packed with nutrients."
  },
  {
    id: 6,
    name: "Wheat Muringa Leaves Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹105" },
      { weight: "1kg", price: "₹200" }
    ],
    rating: 4.2,
    image: "WHEAT MORINGA PUTTU POWDER.jpg",
    description: "Wholesome wheat and moringa combination for nutritious puttu."
  },
  {
    id: 7,
    name: "Navara Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹150" },
      { weight: "1kg", price: "₹290" }
    ],
    rating: 4.6,
    image: "NAVARA PUTTU POWDER.jpg",
    description: "Premium Navara rice puttu powder, an ancient Kerala medicinal rice."
  },
  {
    id: 8,
    name: "Tapioca Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹110" },
      { weight: "1kg", price: "₹220" }
    ],
    rating: 4.0,
    image: "TAPIOCA PUTTU POWDER.jpg",
    description: "Traditional tapioca puttu powder, a Kerala breakfast staple."
  },
  {
    id: 9,
    name: "Appam/Idiappam Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹45" },
      { weight: "1kg", price: "₹85" }
    ],
    rating: 4.3,
    image: "APPAM.jpg",
    description: "Specially processed rice flour for making soft appam and idiappam."
  },
  {
    id: 10,
    name: "Groundnut Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹120" },
      { weight: "1kg", price: "₹230" }
    ],
    rating: 4.2,
    image: "GROUND NUT PUTTU POWDER.jpg",
    description: "Protein-rich groundnut puttu powder with authentic Kerala taste."
  },
  {
    id: 11,
    name: "Carrot Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹110" },
      { weight: "1kg", price: "₹220" }
    ],
    rating: 4.1,
    image: "CARROT PUTTU POWDER.jpg",
    description: "Nutritious carrot-infused puttu powder with natural sweetness and vibrant color."
  },
  {
    id: 12,
    name: "Jackfruit Puttupodi",
    category: "Puttupodi",
    weightOptions: [
      { weight: "500g", price: "₹110" },
      { weight: "1kg", price: "₹220" }
    ],
    rating: 4.4,
    image: "JACKFRUIT PUTTU POWDER.jpg",
    description: "Traditional jackfruit puttu powder with natural sweetness and rich flavor."
  },

  // Powder Collection - Coming Soon
  {
    id: 13,
    name: "Carrot Rice Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹95" }
    ],
    rating: 4.8,
    image: "carrot rice powder.jpg",
    description: "Nutritious carrot-infused rice powder for baby food and health drinks.",
    status: "coming-soon"
  },
  {
    id: 14,
    name: "Jack Fruit Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹140" }
    ],
    rating: 4.9,
    image: "JACKFRUIT PUTTU POWDER.jpg",
    description: "Natural jackfruit powder, rich in vitamins and minerals.",
    status: "coming-soon"
  },
  {
    id: 15,
    name: "Sprouted Ragi Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹110" }
    ],
    rating: 4.8,
    image: "sprouted ragi powder.jpg",
    description: "Sprouted finger millet powder with enhanced nutritional value.",
    status: "coming-soon"
  },
  {
    id: 16,
    name: "Corn Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹85" }
    ],
    rating: 4.7,
    image: "corn powder.jpg",
    description: "Fine corn powder perfect for making traditional dishes.",
    status: "coming-soon"
  },
  {
    id: 17,
    name: "Banana Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹130" }
    ],
    rating: 4.9,
    image: "banana powder.jpg",
    description: "Natural banana powder, excellent for baby food and health drinks.",
    status: "coming-soon"
  },
  {
    id: 18,
    name: "Muringa Leaves Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹180" }
    ],
    rating: 4.9,
    image: "muringa leaves powder.jpg",
    description: "Pure moringa leaves powder, nature's multivitamin.",
    status: "coming-soon"
  },
  {
    id: 19,
    name: "Carrot Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹120" }
    ],
    rating: 4.8,
    image: "CARROT PUTTU POWDER.jpg",
    description: "Pure carrot powder rich in beta-carotene and vitamins.",
    status: "coming-soon"
  },
  {
    id: 20,
    name: "Beetroot Powder",
    category: "Powders",
    weightOptions: [
      { weight: "250g", price: "₹115" }
    ],
    rating: 4.7,
    image: "BEETROOT PUTTU POWDER.jpg",
    description: "Natural beetroot powder for coloring and nutrition.",
    status: "coming-soon"
  },
  {
    id: 21,
    name: "Chilli Powder",
    category: "Spices",
    weightOptions: [
      { weight: "250g", price: "₹60" }
    ],
    rating: 4.2,
    image: "CHILLI.jpg",
    description: "Authentic Kerala red chilli powder with perfect heat and flavor."
  },
  {
    id: 22,
    name: "Green Chilli Powder",
    category: "Spices",
    weightOptions: [
      { weight: "200g", price: "₹70" }
    ],
    rating: 4.1,
    image: "GREEN CHILLI.jpg",
    description: "Fresh green chilli powder for authentic Kerala cuisine."
  },
  {
    id: 23,
    name: "Turmeric Powder",
    category: "Spices",
    weightOptions: [
      { weight: "250g", price: "₹50" }
    ],
    rating: 4.3,
    image: "TURMERIC.jpg",
    description: "Pure Kerala turmeric powder with natural curcumin."
  },
  {
    id: 24,
    name: "Coriander Powder",
    category: "Spices",
    weightOptions: [
      { weight: "250g", price: "₹45" }
    ],
    rating: 4.2,
    image: "CORIANDER.jpg",
    description: "Freshly ground coriander powder with aromatic fragrance."
  },

  // Rava Collection - Coming Soon
  {
    id: 25,
    name: "Ragi Rava",
    category: "Rava",
    weightOptions: [
      { weight: "500g", price: "₹75" }
    ],
    rating: 4.0,
    image: "ragi rava.jpg",
    description: "Coarse finger millet rava for upma and traditional breakfast dishes.",
    status: "coming-soon"
  },
  {
    id: 26,
    name: "Corn Rava",
    category: "Rava",
    weightOptions: [
      { weight: "500g", price: "₹70" }
    ],
    rating: 4.0,
    image: "corn rava.jpg",
    description: "Coarse corn rava perfect for upma and Kerala breakfast items.",
    status: "coming-soon"
  },

  // Ready Mixes Collection - Single rate
  {
    id: 27,
    name: "Dosa/Idli Batter",
    category: "Ready Mixes",
    weightOptions: [
      { weight: "1kg", price: "₹45" }
    ],
    rating: 4.4,
    image: "DOSA.jpg",
    description: "Ready-to-use fermented batter for soft dosas and fluffy idlis."
  },
  {
    id: 28,
    name: "Appam/Idiappam Mix",
    category: "Ready Mixes",
    weightOptions: [
      { weight: "500g", price: "₹55" }
    ],
    rating: 4.3,
    image: "APPAM.jpg",
    description: "Instant mix for preparing authentic Kerala appam and idiappam."
  }
];

// Customer Testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Menon",
    location: "Kochi, Kerala",
    rating: 4,
    product: "Steamed Puttupodi",
    comment: "Good quality puttu powder. My kids like it and it's easy to prepare. The texture is nice - not too dry. Would buy again.",
    date: "1 week ago"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    rating: 5,
    product: "Ragi Puttupodi",
    comment: "Really like this ragi puttu powder. Good for health and tastes nice. My morning breakfast feels complete with this traditional touch.",
    date: "2 weeks ago"
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    location: "Thiruvazhiyode, Palakkad",
    rating: 4,
    product: "Beetroot Puttupodi",
    comment: "The beetroot puttu is healthy and colorful. My grandchildren like the pink color and eat their breakfast without complaining.",
    date: "1 week ago"
  },
  {
    id: 4,
    name: "Dr. Suresh Nair",
    location: "Chennai, Tamil Nadu",
    rating: 4,
    product: "Muringa Leaves Puttupodi",
    comment: "As a doctor, I know moringa is nutritious. This puttu powder has good taste and health benefits. My family enjoys it.",
    date: "3 weeks ago"
  },
  {
    id: 5,
    name: "Anjali Thomas",
    location: "Mumbai, Maharashtra",
    rating: 5,
    product: "Navara Puttupodi",
    comment: "The Navara puttu tastes really good. It's like having Kerala tradition in every bite. Quality is good and worth the price.",
    date: "4 days ago"
  },
  {
    id: 6,
    name: "Krishna Iyer",
    location: "Hyderabad, Telangana",
    rating: 4,
    product: "Dosa/Idli Batter",
    comment: "The dosa batter is well fermented and ready to use. My dosas turn out crispy. Saves time in the morning.",
    date: "2 weeks ago"
  },
  {
    id: 7,
    name: "Meera Pillai",
    location: "Pune, Maharashtra",
    rating: 4,
    product: "Chilli Powder",
    comment: "Good Kerala chilli powder with nice heat level. Has that traditional flavor that makes curries taste authentic.",
    date: "1 week ago"
  },
  {
    id: 8,
    name: "Vijay Menon",
    location: "Delhi, NCR",
    rating: 4,
    product: "Turmeric Powder",
    comment: "Pure turmeric powder. Good color and aroma like Kerala turmeric. Works well for cooking and health drinks.",
    date: "5 days ago"
  },
  {
    id: 9,
    name: "Sunita Rao",
    location: "Ahmedabad, Gujarat",
    rating: 4,
    product: "Greengram Puttupodi",
    comment: "High protein puttu that keeps me full. Good for my fitness routine. Tastes nice and is easy to digest.",
    date: "1 week ago"
  },
  {
    id: 10,
    name: "Gopalakrishnan",
    location: "Coimbatore, Tamil Nadu",
    rating: 4,
    product: "Coriander Powder",
    comment: "Fresh coriander powder. Makes dishes smell and taste good. Quality is consistent when I order.",
    date: "3 days ago"
  }
];

const categories = ["All", "Puttupodi", "Spices", "Ready Mixes", "Powders", "Rava"];

// Add dynamic image resolver
const imageModules = import.meta.glob('../../product-images/*.{jpg,JPG,jpeg,png}', { eager: true, as: 'url' });
function getImageUrl(filename: string): string {
  const entry = Object.entries(imageModules).find(([path]) => path.toLowerCase().endsWith(`/${filename.toLowerCase()}`));
  if (!entry) {
    // Return a fallback image instead of logging
    return '/placeholder.jpg';
  }
  return entry[1] as string;
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleQuickView = (product: typeof products[0]) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-amber-700">Traditional Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover our carefully crafted collection of authentic Kerala food products, 
            made with traditional recipes from Thiruvazhiyode, Palakkad. Currently featuring 15 available products with more coming soon!
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 shadow-sm border-2 font-medium ${
                  selectedCategory === category
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-white text-gray-700 hover:bg-amber-700 hover:text-white border-amber-200 hover:border-amber-700'
                }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-75">
                    ({products.filter(p => p.category === category && !(p as any).status).length} available
                    {products.filter(p => p.category === category && (p as any).status === "coming-soon").length > 0 && 
                      `, ${products.filter(p => p.category === category && (p as any).status === "coming-soon").length} coming soon`
                    })
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-amber-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleQuickView(product)}
                      className="bg-white text-gray-800 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      Quick View
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  {/* Coming Soon Badge */}
                  {(product as any).status === "coming-soon" && (
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-700">
                        {product.weightOptions[0].price}
                      </div>
                      {product.weightOptions.length > 1 && (
                        <div className="text-sm text-gray-500">
                          {product.weightOptions.length} weight options
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {(product as any).status === "coming-soon" ? (
                    <button 
                      disabled
                      className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-medium cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <AddToCartButton 
                      product={product}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* FSSAI Certification Trust Indicator */}
          <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/fssai-seeklogo.png" alt="FSSAI Logo" className="h-8 w-auto" />
              <h3 className="text-xl font-bold text-gray-800">FSSAI Certified Products</h3>
            </div>
            <p className="text-gray-600 mb-4">
              All our traditional Kerala food products are manufactured under FSSAI License No: 11325009000514, 
              ensuring the highest standards of food safety and quality.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-amber-700 font-medium">
              <span>✓</span>
              <span>Quality Assured</span>
              <span>•</span>
              <span>✓</span>
              <span>Safety Certified</span>
              <span>•</span>
              <span>✓</span>
              <span>Traditional Authenticity</span>
            </div>
          </div>

          {/* Customer Testimonials Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What Our <span className="text-amber-700">Customers Say</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real feedback from customers across India who love our traditional Kerala products
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 border border-amber-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-amber-200 mb-2" />
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs">{testimonial.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-700 font-medium text-xs">{testimonial.product}</p>
                        <p className="text-gray-400 text-xs">{testimonial.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial Summary */}
            <div className="mt-12 text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">45+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">4.2★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">85%</div>
                  <div className="text-sm text-gray-600">Recommend Us</div>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                In just 2 months since we started, our customers have shown great appreciation for our authentic Kerala products. 
                We're excited to grow and continue serving traditional tastes to more families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct ? { ...quickViewProduct, image: getImageUrl(quickViewProduct.image) } : null}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-700 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-6 opacity-90">
            Place your order for authentic Kerala traditional products by calling us directly.
          </p>
          <div className="mb-8">
            <div className="text-2xl font-bold mb-2">📞 93880 51003</div>
            <p className="text-lg opacity-90">Call us to place your order</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:9388051003"
              className="bg-white text-amber-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              📞 Call Now
            </a>
            <WhatsAppButton
              message="Hello! I'm interested in ordering Kerala food products from Royal Taste Food Products. Can you help me with the order process?"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              💬 WhatsApp
            </WhatsAppButton>
          </div>
          <p className="text-sm mt-6 opacity-75">
            We also offer custom blends and products based on traditional Kerala recipes. Contact us for special orders.
          </p>
        </div>
      </section>
    </div>
  );
}
