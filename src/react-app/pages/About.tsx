import { Users, Heart, MapPin, Leaf, Crown } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-amber-700" />
              <span className="text-amber-700 font-medium">Thiruvazhiyode, Palakkad, Kerala</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-amber-700">Royal Taste</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Preserving Kerala's culinary heritage through authentic traditional food products 
              crafted with love from the heart of Palakkad district.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Heritage Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Royal Taste Food Products, a venture of Sree Bhadra Group of Concerns, was born from a deep love for Kerala's rich culinary traditions. 
                Based in the fertile lands of Thiruvazhiyode, Palakkad, we have dedicated ourselves to 
                preserving and sharing the authentic flavors that define Kerala cuisine.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our journey began with a simple mission: to bring the traditional food products of Kerala 
                to modern kitchens while maintaining their original authenticity, nutritional value, and taste. 
                Each product tells a story of our cultural heritage.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                  <div className="text-2xl font-bold text-amber-700">26</div>
                  <div className="text-sm text-gray-600">Traditional Products</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-amber-100">
                  <div className="text-2xl font-bold text-amber-700">4</div>
                  <div className="text-sm text-gray-600">Product Categories</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6 leading-relaxed">
                To preserve and promote Kerala's traditional food culture by providing authentic, 
                high-quality products that connect families to their culinary roots while embracing 
                modern convenience and nutrition standards.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  <span className="text-sm">Made with Love</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  <span className="text-sm">Natural & Pure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Four distinct categories representing the diversity of Kerala's traditional food culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">10</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Puttupodi Collection</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Traditional puttu powders including steamed, ragi, greengram, beetroot, moringa leaves, 
                wheat moringa, navara, tapioca, appam/idiappam, and groundnut varieties.
              </p>
              <div className="text-sm text-amber-700 font-medium">10 Premium Varieties Available</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">12</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Powder Collection</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Natural powders from vegetables, fruits, and spices including carrot, jackfruit, 
                sprouted ragi, corn, banana, moringa, beetroot, and traditional spice powders.
              </p>
              <div className="text-sm text-green-700 font-medium">12 Nutritious Options Available</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Rava Collection</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Coarse-ground semolina from ragi and corn, perfect for preparing healthy 
                upma and traditional Kerala breakfast dishes.
              </p>
              <div className="text-sm text-blue-700 font-medium">2 Healthy Varieties Available</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Ready Mixes</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Convenient instant mixes for popular Kerala dishes including dosa/idli batter 
                and appam/idiappam mix for busy modern lifestyles.
              </p>
              <div className="text-sm text-purple-700 font-medium">2 Convenient Options Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every product we create is guided by our commitment to quality, tradition, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Authentic Heritage</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain traditional Kerala recipes and preparation methods, 
                ensuring every product carries the authentic taste of our ancestors.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Natural Purity</h3>
              <p className="text-gray-600 leading-relaxed">
                Using only natural ingredients without artificial additives, 
                we preserve the nutritional value and authentic flavors of our products.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Community Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We support local farmers and communities in Palakkad, 
                creating sustainable relationships that benefit everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">From the Heart of Kerala</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Located in Thiruvazhiyode, Palakkad district, our facility is situated in one of Kerala's 
                most fertile agricultural regions. This strategic location allows us to source the finest 
                raw materials directly from local farmers.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Palakkad's rich agricultural heritage and favorable climate provide us with access to 
                premium quality rice, millets, spices, and other ingredients essential for our traditional products.
              </p>
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <MapPin className="w-6 h-6 text-amber-700 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Royal Taste Food Products</div>
                  <div className="text-gray-600">
                    SREEBHADRA GROUP OF CONCERNS<br />
                    8/125A, SB COMPLEX, PALAKKAD MAIN ROAD,<br />
                    NEAR SREEKRISHNAPURAM POLICE STATION,<br />
                    THIRUVAZHIYODE PO, Palakkad, Kerala-679514
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <img src="/fssai-seeklogo.png" alt="FSSAI Logo" className="h-4 w-auto" />
                    <span className="text-sm text-amber-700">FSSAI License No: 11325009000514</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.86902120656273!2d76.38942540807135!3d10.89487435219784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d71f2997f245%3A0x1e37e2e9e677ddaf!2sRoyal%20Taste%20Restaurant!5e0!3m2!1sen!2sin!4v1753535659644!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Royal Taste Location"
                ></iframe>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Quality control at every stage of production
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Hygienic processing and packaging standards
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Supporting local farmers and communities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Preserving traditional Kerala food culture
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  Customer satisfaction and trust
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
