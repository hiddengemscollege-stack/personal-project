export interface College {
    id: number;
    name: string;
    city: string;
    state: string;
    badge: string;
    courses: string[];
    startingFees: string;
    feesValue: number; // Added for easier filtering
    hostelAvailable: boolean;
    placementAssistance: boolean;
}

export const COLLEGES: College[] = [
    {
        id: 1,
        name: "Shree Samarth Institute of Technology",
        city: "Nashik",
        state: "Maharashtra",
        badge: "Hidden Gem",
        courses: ["B.Tech CSE", "B.Tech Mech", "MBA"],
        startingFees: "₹45,000/year",
        feesValue: 45000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 2,
        name: "St. Anthony's College of Engineering",
        city: "Nellore",
        state: "Andhra Pradesh",
        badge: "Seats Available",
        courses: ["B.Tech ECE", "B.Tech Civil", "BBA"],
        startingFees: "₹52,000/year",
        feesValue: 52000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 3,
        name: "Green Valley College of Commerce",
        city: "Indore",
        state: "Madhya Pradesh",
        badge: "New",
        courses: ["B.Com", "BCA", "BA Economics"],
        startingFees: "₹35,000/year",
        feesValue: 35000,
        hostelAvailable: false,
        placementAssistance: true
    },
    {
        id: 4,
        name: "Bright Future Institute of Management",
        city: "Nagpur",
        state: "Maharashtra",
        badge: "Seats Available",
        courses: ["MBA", "BBA", "B.Com"],
        startingFees: "₹48,000/year",
        feesValue: 48000,
        hostelAvailable: true,
        placementAssistance: false
    },
    {
        id: 5,
        name: "Sunrise College of Engineering & Technology",
        city: "Vijayawada",
        state: "Andhra Pradesh",
        badge: "Hidden Gem",
        courses: ["B.Tech CSE", "B.Tech IT", "MCA"],
        startingFees: "₹42,000/year",
        feesValue: 42000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 6,
        name: "Royal Institute of Science & Commerce",
        city: "Bhopal",
        state: "Madhya Pradesh",
        badge: "New",
        courses: ["B.Sc", "B.Com", "BCA"],
        startingFees: "₹38,000/year",
        feesValue: 38000,
        hostelAvailable: false,
        placementAssistance: false
    },
    {
        id: 7,
        name: "Pune Institute of Computer Studies",
        city: "Pune",
        state: "Maharashtra",
        badge: "Top Rated",
        courses: ["BCA", "MCA", "B.Sc CS"],
        startingFees: "₹60,000/year",
        feesValue: 60000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 8,
        name: "Bangalore Management Academy",
        city: "Bangalore",
        state: "Karnataka",
        badge: "Best Value",
        courses: ["MBA", "BBA"],
        startingFees: "₹1,20,000/year",
        feesValue: 120000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 9,
        name: "Chennai Institute of Technology & Design",
        city: "Chennai",
        state: "Tamil Nadu",
        badge: "Popular",
        courses: ["B.Tech CSE", "B.Des"],
        startingFees: "₹85,000/year",
        feesValue: 85000,
        hostelAvailable: true,
        placementAssistance: true
    },
    {
        id: 10,
        name: "Jaipur National College",
        city: "Jaipur",
        state: "Rajasthan",
        badge: "Historic",
        courses: ["BA", "MA", "B.Com"],
        startingFees: "₹25,000/year",
        feesValue: 25000,
        hostelAvailable: true,
        placementAssistance: false
    }
];
