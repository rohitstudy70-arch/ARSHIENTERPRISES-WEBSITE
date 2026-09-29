const defaultStates = [
  { name: "Bihar", code: "BR", zone: "east", portal: "Bihar Vahan & Mines Portal", vehicles: ["Trucks", "School Buses", "Taxis", "Mining Dumpers", "Tractors"], status: "Approved & Live" },
  { name: "Jharkhand", code: "JH", zone: "east", portal: "Jharkhand Transport VLT Portal", vehicles: ["Coal Trucks", "School Vans", "Taxis", "Commercial Fleets"], status: "Approved & Live" },
  { name: "West Bengal", code: "WB", zone: "east", portal: "WB Transport Vahan VLT", vehicles: ["Kolkata Cabs", "Buses", "Goods Trucks", "Tankers"], status: "Approved & Live" },
  { name: "Odisha", code: "OD", zone: "east", portal: "Odisha Vahan i3MS Mining Portal", vehicles: ["Mining Dumpers", "School Buses", "Interstate Trucks"], status: "Approved & Live" },
  { name: "Uttar Pradesh", code: "UP", zone: "north", portal: "UP RTO Vahan 4.0 Portal", vehicles: ["Commercial Trucks", "Taxis", "School Buses", "Tankers"], status: "Approved & Live" },
  { name: "Delhi NCR", code: "DL", zone: "north", portal: "Delhi Transport Dept. VLT", vehicles: ["All Taxis", "School Buses", "Commercial Fleets", "EV Cabs"], status: "Approved & Live" },
  { name: "Haryana", code: "HR", zone: "north", portal: "Haryana Sarathi / Vahan VLT", vehicles: ["Commercial Cabs", "School Buses", "Heavy Goods"], status: "Approved & Live" },
  { name: "Punjab", code: "PB", zone: "north", portal: "Punjab Transport Department", vehicles: ["Agriculture Transport", "School Vans", "Highway Trucks"], status: "Approved & Live" },
  { name: "Rajasthan", code: "RJ", zone: "north", portal: "Rajasthan Vahan Mines Portal", vehicles: ["Mining Trucks", "Tourist Cabs", "School Buses"], status: "Approved & Live" },
  { name: "Himachal Pradesh", code: "HP", zone: "north", portal: "HP Transport Hill Safety VLT", vehicles: ["Tourist Buses", "Taxis", "Goods Carriers"], status: "Approved & Live" },
  { name: "Uttarakhand", code: "UK", zone: "north", portal: "Char Dham Yatra & UK RTO VLT", vehicles: ["Yatra Buses", "Taxis", "Commercial Trucks"], status: "Approved & Live" },
  { name: "Jammu & Kashmir", code: "JK", zone: "north", portal: "J&K Transport Command Center", vehicles: ["Tourist Cabs", "Interstate Cargo", "Buses"], status: "Approved & Live" },
  { name: "Maharashtra", code: "MH", zone: "west", portal: "Maha Vahan VLT ERSS 112", vehicles: ["Mumbai Taxis", "School Buses", "Heavy Fleets", "Hazardous Tankers"], status: "Approved & Live" },
  { name: "Gujarat", code: "GJ", zone: "west", portal: "Gujarat Transport Vahan VLT", vehicles: ["Industrial Trucks", "Chemical Tankers", "School Buses"], status: "Approved & Live" },
  { name: "Goa", code: "GA", zone: "west", portal: "Goa RTO Tourist Safety VLT", vehicles: ["Rental Cabs", "Tourist Taxis", "Interstate Buses"], status: "Approved & Live" },
  { name: "Madhya Pradesh", code: "MP", zone: "central", portal: "MP Transport Vahan & Mines", vehicles: ["Mining Dumpers", "School Buses", "Freight Carriers"], status: "Approved & Live" },
  { name: "Chhattisgarh", code: "CG", zone: "central", portal: "CG Khanij & VLT Command", vehicles: ["Coal Dumpers", "Iron Ore Trucks", "School Vans"], status: "Approved & Live" },
  { name: "Karnataka", code: "KA", zone: "south", portal: "Karnataka Vahan Suraksha Portal", vehicles: ["Bengaluru Taxis", "School Buses", "Factory Cabs", "Trucks"], status: "Approved & Live" },
  { name: "Tamil Nadu", code: "TN", zone: "south", portal: "TN Transport Vahan VLT", vehicles: ["Omni Buses", "School Fleets", "Goods Transport"], status: "Approved & Live" },
  { name: "Telangana", code: "TS", zone: "south", portal: "Telangana RTA Live VLT", vehicles: ["Hyderabad Cabs", "School Buses", "Cargo Fleets"], status: "Approved & Live" },
  { name: "Andhra Pradesh", code: "AP", zone: "south", portal: "AP Transport Vahan Portal", vehicles: ["Port Trucks", "Aquaculture Cargo", "Taxis", "Buses"], status: "Approved & Live" },
  { name: "Kerala", code: "KL", zone: "south", portal: "Suraksha-Mitra Kerala VLT", vehicles: ["KSRTC Buses", "School Fleets", "Tourist Cabs", "Trucks"], status: "Approved & Live" },
  { name: "Assam", code: "AS", zone: "northeast", portal: "Assam Transport VLT System", vehicles: ["Tea Estate Trucks", "Buses", "Commercial Cabs"], status: "Approved & Live" },
  { name: "Meghalaya", code: "ML", zone: "northeast", portal: "Meghalaya RTO VLT", vehicles: ["Coal & Limestone Trucks", "Tourist Cabs"], status: "Approved & Live" },
  { name: "Tripura", code: "TR", zone: "northeast", portal: "Tripura Vahan VLT Portal", vehicles: ["Interstate Goods", "Passenger Vehicles"], status: "Approved & Live" },
  { name: "Sikkim", code: "SK", zone: "northeast", portal: "Sikkim Transport Hill VLT", vehicles: ["Tourist Cabs", "Mountain Freight"], status: "Approved & Live" },
  { name: "Nagaland", code: "NL", zone: "northeast", portal: "Nagaland Transport Portal", vehicles: ["Highway Trucks", "Passenger Cabs"], status: "Approved & Live" },
  { name: "Manipur", code: "MN", zone: "northeast", portal: "Manipur Vahan VLT Portal", vehicles: ["Interstate Cargo", "Commercial Taxis"], status: "Approved & Live" },
  { name: "Arunachal Pradesh", code: "AR", zone: "northeast", portal: "Arunachal Transport VLT", vehicles: ["Border Freight", "Commercial Fleets"], status: "Approved & Live" },
  { name: "Mizoram", code: "MZ", zone: "northeast", portal: "Mizoram RTO VLT System", vehicles: ["Goods Vehicles", "Commercial Taxis"], status: "Approved & Live" }
];

export const getStates = async (req, res) => {
  const { zone, search } = req.query;
  let result = [...defaultStates];

  if (zone && zone !== 'all') {
    result = result.filter(s => s.zone.toLowerCase() === zone.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.code.toLowerCase().includes(q) || 
      s.portal.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: result.length, data: result });
};
