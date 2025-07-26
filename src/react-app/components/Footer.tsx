import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';
import RoyalTasteLogo from '/ROYAL LOGO ONLY.svg';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={RoyalTasteLogo} alt="Royal Taste Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Authentic Kerala traditional food products from Thiruvazhiyode, Palakkad. 
              Bringing you the finest quality traditional flavors with modern convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-amber-400 transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                SREEBHADRA GROUP OF CONCERNS<br />
                8/125A, SB COMPLEX, PALAKKAD MAIN ROAD,<br />
                NEAR SREEKRISHNAPURAM POLICE STATION,<br />
                THIRUVAZHIYODE PO, Palakkad, Kerala-679514
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@royaltastefoods.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Royal Taste Food Products. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            SREEBHADRA GROUP OF CONCERNS<br />
            8/125A, SB COMPLEX, PALAKKAD MAIN ROAD,<br />
            NEAR SREEKRISHNAPURAM POLICE STATION,<br />
            THIRUVAZHIYODE PO, Palakkad, Kerala-679514
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <img src="/fssai-seeklogo.png" alt="FSSAI Logo" className="h-6 w-auto" />
            <p className="text-gray-400 text-sm">
              FSSAI License No: 11325009000514
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
