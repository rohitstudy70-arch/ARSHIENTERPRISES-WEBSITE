const defaultProducts = [
  {
    id: 'agt365n',
    name: 'Arshi AGT365N Pro GPS Tracker',
    category: 'commercial',
    price: '₹2,999',
    originalPrice: '₹3,749',
    discount: '20% OFF',
    bestFor: 'Cars, Commercial Trucks & Fleets',
    specs: ['Remote Engine Cut-Off', '90-Day Playback', '150mAh Battery Backup', 'IP65 Waterproof'],
    popular: true
  },
  {
    id: 'pro365n',
    name: 'Arshi PRO-365N Fleet Master',
    category: 'commercial',
    price: '₹3,499',
    originalPrice: '₹4,499',
    discount: '22% OFF',
    bestFor: 'Heavy Trucks, Dumper & Bus Fleets',
    specs: ['Dual Server Telemetry', 'Diesel Fuel Sensor Ready', 'Over-Voltage Protection', 'Anti-Jammer Guard'],
    popular: false
  },
  {
    id: 'ais140',
    name: 'AIS 140 Govt. Certified GPS',
    category: 'ais140',
    price: '₹5,999',
    originalPrice: '₹7,500',
    discount: 'RTO Certified',
    bestFor: 'Commercial Transport, Taxis & School Vans',
    specs: ['Direct Bihar RTO Passing', 'Panic SOS Emergency Button', 'Dual eSIM Fallback', 'ARAI & CDAC Approved'],
    popular: true
  },
  {
    id: 'magnetic',
    name: 'Portable Wireless Magnetic GPS',
    category: 'magnetic',
    price: '₹3,899',
    originalPrice: '₹4,999',
    discount: 'No Wiring',
    bestFor: 'Assets, Containers & Hidden Tracking',
    specs: ['10,000mAh Battery (30 Days)', 'Strong Industrial Magnet', 'Voice Monitoring Mic', 'Zero Wiring Required'],
    popular: false
  },
  {
    id: 'bike',
    name: 'Micro Bike & Scooty GPS Tracker',
    category: 'personal',
    price: '₹1,999',
    originalPrice: '₹2,699',
    discount: '26% OFF',
    bestFor: 'Bikes, Scooters & Electric 2-Wheelers',
    specs: ['Ultra-Compact Size', 'Zero Battery Drain Mode', 'Towing & Shake Alarm', 'Live Speed Alerts'],
    popular: false
  },
  {
    id: 'tractor',
    name: 'Agri-Track Tractor & Harvester GPS',
    category: 'tractor',
    price: '₹3,299',
    originalPrice: '₹4,199',
    discount: '1-Yr Free SIM',
    bestFor: 'Tractor, JCB & Agriculture Machinery',
    specs: ['Acreage & Bigha Area Calculation', 'Engine Run-Hour Counter', 'Heavy Vibration Proof', 'Battery Cut Siren'],
    popular: false
  }
];

export const getProducts = async (req, res) => {
  res.json({ success: true, count: defaultProducts.length, data: defaultProducts });
};
