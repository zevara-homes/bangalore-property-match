import { useState, useEffect } from "react";

const stories = [
  {
    buyer: {
      name: "Priya Menon",
      story: "Found my dream 3BHK in HSR Layout within 2 weeks!",
      image: "https://i.pravatar.cc/150?img=1",
      property: "3BHK HSR Layout"
    },
    seller: {
      name: "Raj Kumar",
      story: "Sold above market price in just 30 days!",
      image: "https://i.pravatar.cc/150?img=2",
      amount: "₹1.3Cr"
    }
  },
  {
    buyer: {
      name: "Arjun Reddy",
      story: "AI matched me perfectly to Whitefield projects",
      image: "https://i.pravatar.cc/150?img=3",
      property: "4BHK Whitefield"
    },
    seller: {
      name: "Kavya Singh",
      story: "Got 5 serious buyers in the first week",
      image: "https://i.pravatar.cc/150?img=4",
      amount: "₹95L"
    }
  },
  {
    buyer: {
      name: "Rohit Sharma",
      story: "Skipped 50+ property visits with smart matching",
      image: "https://i.pravatar.cc/150?img=5",
      property: "2BHK Sarjapur"
    },
    seller: {
      name: "Anita Patel",
      story: "Closed deal in 3 weeks without any stress",
      image: "https://i.pravatar.cc/150?img=6",
      amount: "₹75L"
    }
  }
];

export const SuccessStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Real Success Stories
          </h2>
          <p className="text-xl text-muted-foreground">
            See how our AI connects buyers and sellers for perfect matches
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentStory * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                      {/* Buyer Card */}
                      <div className="bg-buyer-secondary rounded-2xl p-6 shadow-elegant border border-buyer-primary/20">
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={story.buyer.image} 
                            alt={story.buyer.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold text-buyer-primary">
                              {story.buyer.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">Buyer</p>
                          </div>
                        </div>
                        <p className="text-sm italic mb-3">"{story.buyer.story}"</p>
                        <div className="text-xs text-buyer-accent font-medium">
                          Found: {story.buyer.property}
                        </div>
                      </div>

                      {/* Connection Visual */}
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-ai-gradient flex items-center justify-center shadow-ai">
                            <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse-gentle" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-ai-primary rounded-full text-white text-xs flex items-center justify-center">
                            AI
                          </div>
                          {/* Connection lines */}
                          <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-ai-primary/50"></div>
                          <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-ai-primary/50"></div>
                        </div>
                      </div>

                      {/* Seller Card */}
                      <div className="bg-seller-secondary rounded-2xl p-6 shadow-elegant border border-seller-primary/20">
                        <div className="flex items-center gap-4 mb-4">
                          <img 
                            src={story.seller.image} 
                            alt={story.seller.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold text-seller-primary">
                              {story.seller.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">Seller</p>
                          </div>
                        </div>
                        <p className="text-sm italic mb-3">"{story.seller.story}"</p>
                        <div className="text-xs text-seller-accent font-medium">
                          Sold for: {story.seller.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-200
                  ${index === currentStory 
                    ? 'bg-ai-primary scale-125' 
                    : 'bg-muted hover:bg-muted-foreground/50'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};