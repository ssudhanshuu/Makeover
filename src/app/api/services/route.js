import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

// Initial seed data from original hardcoded services list
const initialServices = {
  Makeup: [
    { name: "Traditional Bridal Makeup", price: 8000, desc: "Classic Indian bridal look with premium Kryolan & MAC products" },
    { name: "Creative Bridal Makeup", price: 12000, desc: "Contemporary HD glam with contouring, cut-crease & custom palette" },
    { name: "Airbrush Bridal Makeup", price: 15000, desc: "Ultra-smooth high-definition airbrush for flawless all-day finish" },
    { name: "Party Makeup", price: 2500, desc: "Stunning smokey or glitter makeup for parties & functions" },
    { name: "Engagement Makeup", price: 5000, desc: "Soft romantic glam with dewy skin & natural lip tones" },
    { name: "Reception Makeup", price: 6000, desc: "Bold & glamorous evening look with dramatic eyes" },
    { name: "Mehndi Makeup", price: 3000, desc: "Fresh & vibrant daytime look with floral tones" },
    { name: "Cocktail / Sangeet Makeup", price: 4500, desc: "Sparkly, trendy look perfect for dance nights" },
    { name: "Pre-Wedding Shoot Makeup", price: 5000, desc: "Camera-ready makeup for outdoor & studio photoshoots" },
    { name: "Hair Styling (Bridal)", price: 2000, desc: "Elaborate bridal bun, braids, or open curls with accessories" },
    { name: "Hair Styling (Party)", price: 800, desc: "Elegant updo, beach waves, or sleek straight style" },
    { name: "Saree Draping", price: 500, desc: "Professional draping in Bengali, Gujarati, Nivi & more styles" },
  ],
  "Skin Care": [
    { name: "Gold Facial", price: 1500, desc: "24K gold-infused treatment for instant radiance & anti-aging" },
    { name: "Diamond Facial", price: 2000, desc: "Diamond dust exfoliation for deep glow & skin tightening" },
    { name: "Fruit Facial", price: 600, desc: "Natural fruit extracts for hydration & freshness" },
    { name: "De-Tan Facial", price: 800, desc: "Deep de-tanning with papaya & vitamin C serums" },
    { name: "Anti-Acne Facial", price: 1200, desc: "Salicylic acid treatment for breakout-prone skin" },
    { name: "Cleanup (Basic)", price: 400, desc: "Steam, exfoliation & blackhead extraction" },
    { name: "Cleanup (Advanced)", price: 700, desc: "Deep pore cleansing with serum & LED therapy" },
    { name: "Bleach (Face)", price: 300, desc: "Oxylife/VLCC bleach for instant skin brightening" },
    { name: "Bleach (Full Body)", price: 1000, desc: "Full body bleach with soothing aloe aftercare" },
    { name: "Threading (Full Face)", price: 150, desc: "Eyebrow shaping, upper lip, chin & forehead" },
    { name: "Waxing (Full Arms)", price: 300, desc: "Rica/chocolate wax for smooth, bump-free arms" },
    { name: "Waxing (Full Legs)", price: 400, desc: "Gentle hot wax for silky legs with moisturizer" },
    { name: "Waxing (Full Body)", price: 1500, desc: "Complete body wax including underarms & bikini line" },
    { name: "Body Polishing", price: 2500, desc: "Full body scrub, tan removal & deep moisturizing wrap" },
  ],
  "Hair Care": [
    { name: "Hair Spa (Basic)", price: 800, desc: "Deep conditioning treatment for dry & damaged hair" },
    { name: "Hair Spa (Premium)", price: 1500, desc: "Keratin-infused spa with hot oil & steam therapy" },
    { name: "Keratin Treatment", price: 5000, desc: "Brazilian keratin smoothing for frizz-free straight hair" },
    { name: "Hair Straightening", price: 4000, desc: "Professional rebonding for permanent straight hair" },
    { name: "Hair Smoothening", price: 4500, desc: "Cysteine/protein based semi-permanent smoothening" },
    { name: "Hair Color (Global)", price: 2000, desc: "Full head single-shade color with L'Oréal/Matrix products" },
    { name: "Hair Highlights", price: 3000, desc: "Chunky or babylights highlights in fashion shades" },
    { name: "Balayage / Ombre", price: 4000, desc: "Hand-painted gradient color for a natural sun-kissed effect" },
    { name: "Hair Cut (Women)", price: 300, desc: "Precision cut, layering, or U/V shape trim" },
    { name: "Hair Trim & Blow Dry", price: 500, desc: "Light trim with professional blow dry & setting" },
    { name: "Dandruff Treatment", price: 1200, desc: "Scalp detox treatment with anti-fungal serums" },
  ],
  "Nail Art": [
    { name: "Gel Nail Extensions", price: 1500, desc: "Durable gel overlay with custom shape & length" },
    { name: "Acrylic Nail Extensions", price: 2000, desc: "Strong acrylic sculpted nails in any length" },
    { name: "Nail Art (Basic)", price: 500, desc: "Glitter, French tip, or simple stamping designs" },
    { name: "Nail Art (Advanced)", price: 1000, desc: "3D flowers, chrome, marble, or ombre effects" },
    { name: "Manicure (Classic)", price: 400, desc: "Cuticle care, filing, buffing & polish application" },
    { name: "Manicure (Luxury)", price: 800, desc: "Paraffin dip, scrub, massage & gel polish finish" },
    { name: "Pedicure (Classic)", price: 500, desc: "Foot soak, scrub, nail shaping & regular polish" },
    { name: "Pedicure (Spa)", price: 1000, desc: "Crystal soak, dead skin removal, mask & gel polish" },
    { name: "Nail Repair & Removal", price: 300, desc: "Safe gel/acrylic removal or broken nail fix" },
  ],
  "Lehenga Rental": [
    { name: "Bridal Lehenga (Heavy)", price: 5000, unit: "/day", desc: "Premium heavy embroidered bridal lehengas in red, maroon & gold" },
    { name: "Bridal Lehenga (Light)", price: 3000, unit: "/day", desc: "Lightweight pastel bridal lehengas for intimate ceremonies" },
    { name: "Party Lehenga", price: 1500, unit: "/day", desc: "Trendy sequence & mirror work lehengas for sangeet & parties" },
    { name: "Mehndi / Haldi Outfit", price: 1000, unit: "/day", desc: "Floral printed or yellow-themed outfits for day ceremonies" },
    { name: "Dupatta / Chunni (Bridal)", price: 500, unit: "/day", desc: "Heavy embellished net dupatta with border work" },
  ],
  "Jewelry Rental": [
    { name: "Bridal Jewelry Full Set", price: 3500, unit: "/day", desc: "Complete set: necklace, earrings, maang tikka, nath & bangles" },
    { name: "Bridal Jewelry (Kundan)", price: 4000, unit: "/day", desc: "Premium kundan polki full bridal set with matha patti" },
    { name: "Engagement Jewelry Set", price: 2000, unit: "/day", desc: "Elegant necklace, earrings & bracelet for ring ceremonies" },
    { name: "Party Jewelry Set", price: 1000, unit: "/day", desc: "Lightweight matching necklace & statement earrings" },
    { name: "Flower Jewelry (Haldi/Mehndi)", price: 800, unit: "/day", desc: "Artificial flower jewelry set for haldi & mehndi functions" },
    { name: "Kamarband / Waist Belt", price: 500, unit: "/day", desc: "Decorative bridal waist chain in gold or kundan" },
  ],
};

export async function GET() {
  try {
    await dbConnect();
    
    // Check if services are already in the database
    let services = await Service.find({}).sort({ createdAt: -1 });
    
    // Seed if empty
    if (services.length === 0) {
      console.log("No services found in MongoDB. Database seeding in progress...");
      const seedData = [];
      for (const [category, list] of Object.entries(initialServices)) {
        for (const item of list) {
          seedData.push({
            name: item.name,
            price: item.price,
            desc: item.desc,
            unit: item.unit || "",
            category: category,
          });
        }
      }
      
      // Bulk insert
      await Service.insertMany(seedData);
      
      // Re-fetch seeded data
      services = await Service.find({}).sort({ createdAt: -1 });
      console.log(`Seeded ${services.length} default services.`);
    }
    
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("GET Services API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const { name, category, price, unit, desc } = body;
    
    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, category, and price are required." },
        { status: 400 }
      );
    }
    
    // Create new service
    const newService = await Service.create({
      name,
      category,
      price: Number(price),
      unit: unit || "",
      desc: desc || "",
    });
    
    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("POST Services API Error:", error);
    
    // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A service with this name already exists." },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
