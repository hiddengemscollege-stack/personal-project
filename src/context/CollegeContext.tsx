import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MapPin, GraduationCap, Users, Building2, Globe, Award, BookOpen, Wifi, Coffee, Home, Activity } from 'lucide-react';

// Define types (moved from CollegeDetail to here for sharing)
export interface CollegeData {
    id: number;
    name: string;
    location: string;
    city: string;
    state: string;
    tagline: string;
    overview: string;
    highlights: string[];
    courses: {
        name: string;
        duration: string;
        fees: string;
        seats: string;
    }[];
    facilities: {
        name: string;
        icon: any;
        available: boolean;
    }[];
    placements: {
        percentage: string;
        averagePackage: string;
        highestPackage: string;
        companies: string[];
    };
}

interface CollegeContextType {
    collegeData: CollegeData;
    updateCollegeData: (newData: Partial<CollegeData>) => void;
}

const initialCollegeData: CollegeData = {
    id: 1,
    name: "Shree Samarth Institute of Pharmacy",
    location: "Dhamori, Maharashtra",
    city: "Dhamori",
    state: "Maharashtra",
    tagline: "Empowering Future Pharmacists with Excellence & Innovation",
    overview: "Shree Samarth Institute of Pharmacy is a premier institution dedicated to pharmaceutical education. With state-of-the-art laboratories and experienced faculty, we focus on holistic development, ensuring our students are industry-ready. Our campus provides a serene environment conducive to learning and research.",
    highlights: [
        "PCI Approved & MSBTE Affiliated",
        "100% Placement Assistance",
        "Modern Laboratories",
        "Digital Library",
        "Expert Faculty",
        "Industry Visits"
    ],
    courses: [
        { name: "D. Pharmacy", duration: "2 Years", fees: "₹65,000/year", seats: "60" },
        { name: "B. Pharmacy", duration: "4 Years", fees: "₹85,000/year", seats: "100" },
    ],
    facilities: [
        { name: "Wi-Fi Campus", icon: Wifi, available: true },
        { name: "Modern Labs", icon: Activity, available: true },
        { name: "Library", icon: BookOpen, available: true },
        { name: "Cafeteria", icon: Coffee, available: true },
        { name: "Hostel", icon: Home, available: true },
        { name: "Sports", icon: Award, available: true },
    ],
    placements: {
        percentage: "65%",
        averagePackage: "₹2.8 LPA",
        highestPackage: "12 LPA",
        companies: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Capgemini", "Local Industries"],
    }
};

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export function CollegeProvider({ children }: { children: ReactNode }) {
    const [collegeData, setCollegeData] = useState<CollegeData>(initialCollegeData);

    const updateCollegeData = (newData: Partial<CollegeData>) => {
        setCollegeData(prev => ({ ...prev, ...newData }));
    };

    return (
        <CollegeContext.Provider value={{ collegeData, updateCollegeData }}>
            {children}
        </CollegeContext.Provider>
    );
}

export function useCollege() {
    const context = useContext(CollegeContext);
    if (context === undefined) {
        throw new Error('useCollege must be used within a CollegeProvider');
    }
    return context;
}
