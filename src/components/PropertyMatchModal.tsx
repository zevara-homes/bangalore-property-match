import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'buy' | 'sell';
}

const dummyProperties = [
  {
    id: 1,
    title: "3 BHK Premium Apartment",
    location: "Whitefield",
    price: "₹1.2 Cr",
    match: 92,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "2 BHK Modern Villa",
    location: "HSR Layout",
    price: "₹85 L",
    match: 89,
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "4 BHK Luxury Penthouse",
    location: "Koramangala",
    price: "₹2.1 Cr",
    match: 85,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "3 BHK Smart Home",
    location: "Electronic City",
    price: "₹95 L",
    match: 88,
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "2 BHK Garden View",
    location: "Sarjapur",
    price: "₹75 L",
    match: 83,
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "3 BHK Tech Hub Apartment",
    location: "Marathahalli",
    price: "₹1.1 Cr",
    match: 90,
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop&crop=center"
  }
];

const dummyBuyers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profession: "IT Professional",
    budget: "₹1.5 Cr",
    looking: "3 BHK in Tech Parks",
    timeline: "Immediate"
  },
  {
    id: 2,
    name: "Priya Sharma",
    profession: "Investment Banker",
    budget: "₹1.2 Cr",
    looking: "2-3 BHK Near Airport",
    timeline: "1-2 months"
  },
  {
    id: 3,
    name: "Arjun Reddy",
    profession: "Startup Founder",
    budget: "₹2.0 Cr",
    looking: "Luxury 4 BHK",
    timeline: "3 months"
  },
  {
    id: 4,
    name: "Meera Nair",
    profession: "Medical Professional",
    budget: "₹90 L",
    looking: "2 BHK Ready to Move",
    timeline: "Immediate"
  }
];

export const PropertyMatchModal = ({ isOpen, onClose, mode }: PropertyMatchModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate success
    alert(`Thank you ${leadFormData.name}! We'll contact you within 24 hours.`);
    setShowLeadForm(false);
    setLeadFormData({ name: '', phone: '', email: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-auto shadow-elegant">
        {/* Header */}
        <div className={`
          p-6 border-b border-border flex justify-between items-center
          ${mode === 'buy' ? 'bg-buyer-secondary' : 'bg-seller-secondary'}
        `}>
          <div>
            <h2 className={`
              text-2xl font-bold
              ${mode === 'buy' ? 'text-buyer-primary' : 'text-seller-primary'}
            `}>
              {mode === 'buy' ? 'Perfect Property Matches' : 'Interested Buyers'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'buy' 
                ? 'AI-curated properties matching your preferences' 
                : 'Active buyers looking for properties like yours'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`
                  w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4
                  ${mode === 'buy' ? 'bg-buyer-gradient' : 'bg-seller-gradient'}
                `}>
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-semibold">
                  {mode === 'buy' ? 'Finding perfect matches...' : 'Finding interested buyers...'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-border rounded-lg p-4">
                    <Skeleton className="w-full h-40 mb-4" />
                    <Skeleton className="w-3/4 h-4 mb-2" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                ))}
              </div>
            </div>
          ) : showLeadForm ? (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Let's Connect!</h3>
                <p className="text-muted-foreground">
                  Share your details and we'll get you connected
                </p>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={leadFormData.name}
                  onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={leadFormData.phone}
                  onChange={(e) => setLeadFormData({...leadFormData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={leadFormData.email}
                  onChange={(e) => setLeadFormData({...leadFormData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className={`
                      flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-colors
                      ${mode === 'buy' ? 'bg-buyer-primary hover:bg-buyer-accent' : 'bg-seller-primary hover:bg-seller-accent'}
                    `}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : mode === 'buy' ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg">
                  <span className="font-semibold text-buyer-primary">6 properties</span> match your preferences
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyProperties.map((property) => (
                  <div key={property.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{property.title}</h3>
                        <span className={`
                          text-xs px-2 py-1 rounded-full
                          ${property.match >= 90 ? 'bg-buyer-secondary text-buyer-primary' : 'bg-muted text-muted-foreground'}
                        `}>
                          {property.match}% match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-buyer-primary">{property.price}</span>
                        <span className="text-xs text-muted-foreground">{property.status}</span>
                      </div>
                      <button
                        onClick={() => setShowLeadForm(true)}
                        className="w-full bg-buyer-primary text-white py-2 rounded-lg hover:bg-buyer-accent transition-colors"
                      >
                        Schedule Visit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button className="text-buyer-primary hover:text-buyer-accent font-semibold">
                  Refine Search Criteria
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-seller-secondary rounded-lg p-6 border border-seller-primary/20">
                <h3 className="text-xl font-semibold text-seller-primary mb-2">
                  Your Property Estimate
                </h3>
                <div className="text-3xl font-bold text-seller-primary mb-2">
                  ₹1.35 - 1.45 Cr
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on recent sales in your area
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  <span className="text-seller-primary">23 Active Buyers</span> for Your Property Type
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dummyBuyers.map((buyer) => (
                    <div key={buyer.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{buyer.name}</h4>
                          <p className="text-sm text-muted-foreground">{buyer.profession}</p>
                        </div>
                        <span className="text-xs bg-seller-secondary text-seller-primary px-2 py-1 rounded-full">
                          {buyer.timeline}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Budget:</span> {buyer.budget}</p>
                        <p><span className="font-medium">Looking for:</span> {buyer.looking}</p>
                      </div>
                      <button
                        onClick={() => setShowLeadForm(true)}
                        className="w-full mt-3 bg-seller-primary text-white py-2 rounded-lg hover:bg-seller-accent transition-colors"
                      >
                        Connect with Buyer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};