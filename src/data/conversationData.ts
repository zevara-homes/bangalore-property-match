export const conversationData = {
  general: {
    "best area to invest": {
      response: `Based on current market analysis, here are the top investment areas in Bangalore:

**1. Sarjapur Road** 📈
• Expected appreciation: 18-22% over 2 years
• Average price: ₹5,500-6,500 per sqft
• Key advantage: IT corridor expansion

**2. Electronic City Phase 2** 🏗️
• Expected appreciation: 15-18% over 2 years  
• Average price: ₹4,000-5,000 per sqft
• Key advantage: Metro connectivity by 2026

**3. Hennur Road** 💰
• Expected appreciation: 20-25% over 2 years
• Average price: ₹4,500-5,500 per sqft
• Key advantage: Currently undervalued`,
      
      sources: ["Market Analysis 2024", "Builder Reports", "Government Data"],
      followUps: [
        "Show properties in Sarjapur Road",
        "Compare these areas in detail",
        "What about North Bangalore?"
      ]
    },
    
    "2 bhk under 80 lakhs": {
      response: `I found several options for 2 BHK under ₹80 lakhs. Here are the best matches:

**Available Areas within Budget:**
• Electronic City: 45-50 properties (₹65-78L range)
• Hennur: 30-35 properties (₹68-80L range)  
• Sarjapur Road: 20-25 properties (₹72-80L range)
• Hoskote: 60+ properties (₹45-70L range)

**My Recommendation:** Consider Electronic City for best value - good connectivity and upcoming metro will boost prices.`,
      
      action: {
        text: "View All Properties",
        link: "/properties?type=2bhk&maxBudget=80"
      },
      sources: ["Property Database", "Price Analysis"],
      followUps: [
        "Which area has best amenities?",
        "Show only ready-to-move properties",
        "Compare builders in these areas"
      ]
    },

    "3 bhk": {
      response: `Here's what I found for 3 BHK properties in Bangalore:

**Popular Areas for 3 BHK:**
• Whitefield: ₹1.2-2.5 Cr (Premium IT location)
• HSR Layout: ₹1.5-3 Cr (Central location)
• Electronic City: ₹80L-1.5 Cr (Value for money)
• Sarjapur: ₹90L-1.8 Cr (Emerging area)

**Current Market Trends:**
• Average size: 1,200-1,800 sqft
• Best ROI: Sarjapur and Electronic City
• Ready-to-move: 40% premium over under-construction`,

      sources: ["Property Listings", "Market Trends"],
      followUps: [
        "Show 3 BHK under ₹1.5 Cr",
        "Best 3 BHK for families with kids",
        "Compare Whitefield vs HSR Layout"
      ]
    },

    "prestige": {
      response: `Prestige Group is one of Bangalore's top developers. Here's my analysis:

**Prestige Builder Profile:**
• Rating: 4.5/5 (Excellent track record)
• Projects delivered: 250+ completed
• Delivery timeline: 95% on-time delivery
• Quality: Premium finishes, good amenities

**Current Active Projects:**
• Prestige Falcon City (Kanakapura Road): ₹1.2-2.8 Cr
• Prestige Jindal City (Tumkur Road): ₹80L-1.5 Cr
• Prestige Shantiniketan (Whitefield): ₹2-4 Cr

**Investment Perspective:** Prestige properties typically hold value well and have good resale demand.`,

      sources: ["Builder Analysis", "Project Reviews", "Market Data"],
      followUps: [
        "Compare Prestige vs Sobha",
        "Show all Prestige projects",
        "Prestige resale value analysis"
      ]
    },

    "property prices drop": {
      response: `Based on current market indicators, here's my price prediction analysis:

**Short-term Outlook (6-12 months):**
• Prices likely to remain stable with 5-8% growth
• No major correction expected
• Demand remains strong in IT corridors

**Factors Supporting Stability:**
• Continued IT sector growth
• Infrastructure development (Metro Phase 3)
• Limited land availability in prime areas

**Risk Factors:**
• Interest rate changes
• Economic slowdown
• Oversupply in certain micro-markets

**My Recommendation:** Current market offers good buying opportunities. Waiting may not yield significant savings but could mean higher prices.`,

      sources: ["Economic Analysis", "RBI Reports", "Market Trends"],
      followUps: [
        "Best time to buy in next 6 months",
        "Which areas might see price drops",
        "Impact of interest rates on prices"
      ]
    }
  },

  contextual: {
    market: {
      response: `Here's today's Bangalore real estate market snapshot:

**Market Indicators** 📊
• Overall trend: Stable growth (↑ 12% YoY)
• Hot areas: Whitefield, Sarjapur, Hebbal
• Average price/sqft: ₹6,200 (↑ 8% from last year)

**Latest Updates** 🔔
• New Metro line approved for Whitefield-KR Puram
• IT companies expanding in North Bangalore  
• Rental yields strong at 3.5-4.5% annually

**Top Performing Segments:**
• 2-3 BHK apartments: High demand
• Ready-to-move properties: 15% premium
• Gated communities: Premium growing

What specific market information would you like to explore?`,
      
      sources: ["Market Reports", "Government Data", "Builder Analytics"],
      followUps: [
        "Show area-wise price trends",
        "Best areas for rental income",
        "Impact of new infrastructure"
      ]
    },

    verify: {
      response: `I can help you verify any property deal. Here's what I check:

**Verification Checklist** ✓
**1. Legal Documents**
• Title deed verification
• Encumbrance certificate  
• Approved building plan
• RERA registration

**2. Builder Reputation**
• Past project delivery record
• Financial stability
• Customer reviews & complaints

**3. Property Valuation**
• Market rate comparison
• Future appreciation potential
• Hidden costs analysis

**4. Physical Inspection**
• Construction quality
• Amenities as promised
• Possession timeline

Would you like to verify a specific property, or learn more about any of these areas?`,
      
      sources: ["Legal Database", "RERA Records", "Builder Analysis"],
      followUps: [
        "Verify a specific property",
        "Common red flags to watch",
        "Document checklist for buyers"
      ]
    }
  },

  fallback: {
    response: `I'd be happy to help you with that! As your AI real estate assistant, I can provide insights on:

**Property Search & Analysis**
• Find properties matching your criteria
• Compare different areas and builders
• Market price analysis

**Investment Guidance** 
• Best areas for ROI
• Market trends and predictions
• Rental yield analysis

**Deal Verification**
• Legal document checks
• Builder reputation analysis
• Fair price evaluation

Could you please be more specific about what you'd like to know? For example:
• "Show me 2 BHK under ₹80 lakhs"
• "Which area is best for investment?"
• "Is Prestige Falcon City worth buying?"`,

    followUps: [
      "Best investment areas in Bangalore",
      "How to verify property documents",
      "Current market trends"
    ]
  }
};