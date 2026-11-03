export const CONTACT = {
  phone: "+1 (559) 213-2902",
  phoneHref: "tel:+15592132902",
  email: "info@globaltropicalcargo.com",
  hours: "Mon–Fri, 8:00am–6:00pm",
  hq: "Arizona, USA",
};

export interface Service {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  icon: IconName;
}

export type IconName =
  | "ship"
  | "plane"
  | "truck"
  | "doc"
  | "warehouse"
  | "chain"
  | "shield"
  | "pin"
  | "user"
  | "globe";

export const SERVICES: Service[] = [
  {
    id: "ocean",
    title: "Ocean Freight",
    blurb: "FCL and LCL sea shipping on the world's major trade lanes.",
    points: ["Full & less-than-container loads", "Container tracking", "Customs clearance support"],
    icon: "ship",
  },
  {
    id: "air",
    title: "Air Freight",
    blurb: "Time-critical cargo that has to be there yesterday.",
    points: ["Next-flight-out options", "Charter services", "Consolidated airfreight"],
    icon: "plane",
  },
  {
    id: "road",
    title: "Road Transport",
    blurb: "Trucking across the US and beyond with live visibility.",
    points: ["FTL & LTL", "Live GPS", "Temperature-controlled"],
    icon: "truck",
  },
  {
    id: "customs",
    title: "Customs Clearance",
    blurb: "Brokerage and paperwork handled by people who do it daily.",
    points: ["Documentation", "Duties & permits", "Regulatory compliance"],
    icon: "doc",
  },
  {
    id: "warehouse",
    title: "Warehousing & Storage",
    blurb: "Secure space with inventory control and last-mile delivery.",
    points: ["Climate-controlled", "Pick-and-pack", "Last-mile delivery"],
    icon: "warehouse",
  },
  {
    id: "scm",
    title: "Supply Chain Management",
    blurb: "End-to-end visibility from procurement to the final doorstep.",
    points: ["Planning & optimization", "Vendor coordination", "Unified reporting"],
    icon: "chain",
  },
];

export const STATS = [
  { value: 12000, suffix: "+", label: "Shipments delivered" },
  { value: 85, suffix: "+", label: "Countries served" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 3000, suffix: "+", label: "Business clients" },
];

export const WHY = [
  {
    icon: "shield" as IconName,
    title: "Cargo Insurance & Safety",
    text: "Every shipment is insured against loss, damage and theft, and moved by trained handlers.",
  },
  {
    icon: "pin" as IconName,
    title: "Real-Time GPS Tracking",
    text: "A 24/7 online portal with milestone alerts from dispatch right through to delivery.",
  },
  {
    icon: "user" as IconName,
    title: "Dedicated Account Manager",
    text: "One logistics expert you can reach by phone, email or WhatsApp.",
  },
  {
    icon: "globe" as IconName,
    title: "Global Partner Network",
    text: "More than 200 vetted agents covering the lanes that matter to you.",
  },
];

export const STEPS = [
  { title: "Get a Quote", text: "Send shipment details online or call our Arizona office." },
  { title: "Book & Handover", text: "Confirm the booking, then hand over cargo for collection or depot drop-off." },
  { title: "Track in Real Time", text: "Follow every leg with your unique tracking number." },
  { title: "Delivered Safely", text: "Receive confirmation and full delivery documentation." },
];

export const REGIONS = [
  { name: "USA & Canada", x: 22, y: 36, size: 14 },
  { name: "Latin America", x: 30, y: 68, size: 11 },
  { name: "Europe", x: 50, y: 29, size: 11 },
  { name: "Africa", x: 52, y: 56, size: 10 },
  { name: "Middle East", x: 61, y: 42, size: 9 },
  { name: "Asia Pacific", x: 78, y: 46, size: 13 },
];

export const TESTIMONIALS = [
  {
    quote:
      "Real-time tracking and a team that actually picks up the phone. Cross-border shipping finally feels predictable.",
    name: "Michael R. Carson",
    place: "Arizona",
  },
  {
    quote:
      "We move time-sensitive medical equipment with them. In four years they've never made us explain why it matters.",
    name: "Jennifer L. Walsh",
    place: "Chicago",
  },
  {
    quote:
      "Competitive rates and customs handled without drama on our ocean imports from Asia.",
    name: "David T. Nguyen",
    place: "Los Angeles",
  },
];

export const PARTNERS = ["CargoLink", "AirBridge", "FreightHub", "TradePost", "OceanX", "SupplyNet"];

export const TICKER = [
  "Real-time tracking in 50+ countries",
  "Your trusted freight partner",
  "Air · Sea · Road freight",
  "Express delivery available",
];

export const INDUSTRIES = [
  { name: "Medical & Life Sciences", note: "Time-critical, temperature-aware handling and full chain-of-custody." },
  { name: "Retail & E-commerce", note: "Seasonal peaks, consolidation and last-mile delivery." },
  { name: "Automotive & Industrial", note: "Heavy, oversized and just-in-time parts programs." },
  { name: "Food & Agriculture", note: "Reefer capacity and customs documentation for perishables." },
  { name: "Technology & Electronics", note: "High-value, insured, secure-handling shipments." },
  { name: "Energy & Construction", note: "Project cargo, permits and multi-leg road/sea moves." },
];

export interface Incoterm {
  code: string;
  name: string;
  modes: "Any mode" | "Sea only";
  risk: string;
  summary: string;
}

export const INCOTERMS: Incoterm[] = [
  { code: "EXW", name: "Ex Works", modes: "Any mode", risk: "Seller's premises", summary: "Buyer arranges and pays almost everything, from pickup onward." },
  { code: "FCA", name: "Free Carrier", modes: "Any mode", risk: "Handed to buyer's carrier", summary: "Seller clears for export and delivers to the carrier the buyer names." },
  { code: "CPT", name: "Carriage Paid To", modes: "Any mode", risk: "Handed to first carrier", summary: "Seller pays freight to destination; risk passes at first handover." },
  { code: "CIP", name: "Carriage & Insurance Paid", modes: "Any mode", risk: "Handed to first carrier", summary: "Like CPT, plus the seller buys broad cargo insurance." },
  { code: "DAP", name: "Delivered at Place", modes: "Any mode", risk: "Named destination", summary: "Seller delivers ready for unloading; buyer handles import clearance." },
  { code: "DPU", name: "Delivered at Place Unloaded", modes: "Any mode", risk: "Unloaded at destination", summary: "Seller also unloads at the named place." },
  { code: "DDP", name: "Delivered Duty Paid", modes: "Any mode", risk: "Named destination", summary: "Seller carries nearly all cost and risk, including import duties." },
  { code: "FAS", name: "Free Alongside Ship", modes: "Sea only", risk: "Alongside the vessel", summary: "Seller delivers cargo to the quay beside the ship." },
  { code: "FOB", name: "Free on Board", modes: "Sea only", risk: "On board the vessel", summary: "Seller loads the goods on the vessel; buyer takes over from there." },
  { code: "CFR", name: "Cost & Freight", modes: "Sea only", risk: "On board the vessel", summary: "Seller pays sea freight; risk passes once loaded." },
  { code: "CIF", name: "Cost, Insurance & Freight", modes: "Sea only", risk: "On board the vessel", summary: "CFR plus minimum cargo insurance bought by the seller." },
];

export const CONTAINERS = [
  { type: "20' Standard", length: "5.9 m", width: "2.35 m", height: "2.39 m", volume: "≈ 33 m³", payload: "≈ 28,000 kg" },
  { type: "40' Standard", length: "12.0 m", width: "2.35 m", height: "2.39 m", volume: "≈ 67 m³", payload: "≈ 26,700 kg" },
  { type: "40' High Cube", length: "12.0 m", width: "2.35 m", height: "2.69 m", volume: "≈ 76 m³", payload: "≈ 26,500 kg" },
];

export const FAQ = [
  {
    q: "How is air freight priced?",
    a: "Air freight is charged on the greater of actual weight and volumetric weight. Bulky, light cargo is billed on volume — use the volumetric calculator above to check before you book.",
  },
  {
    q: "What is the difference between FCL and LCL?",
    a: "FCL (full container load) gives you a whole container to yourself. LCL (less than container load) shares space with other shippers' goods, which suits smaller volumes but adds consolidation handling time.",
  },
  {
    q: "Do you handle customs clearance?",
    a: "Yes. Our brokerage team prepares documentation, classifies goods, calculates duties and permits, and keeps the shipment compliant on both ends of the lane.",
  },
  {
    q: "Is my cargo insured?",
    a: "Shipments can be insured against loss, damage and theft. Your account manager will recommend cover based on cargo value and route.",
  },
  {
    q: "How do I track my shipment?",
    a: "Enter your reference number in the tracker on the home page. You'll also receive milestone alerts from dispatch through delivery.",
  },
  {
    q: "How fast will I get a quote?",
    a: "Send your details through the quote form or call our Arizona office. Most requests are answered within one business day.",
  },
];
