import { Wifi, Home, Bus, FlaskConical, BookOpen, Briefcase, Coffee, Activity, Award, LucideIcon } from 'lucide-react';

export interface CollegeDetailData {
    id: number;
    name: string;
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
        icon: LucideIcon;
        name: string;
        available: boolean;
    }[];
    placements: {
        percentage: string;
        averagePackage: string;
        highestPackage: string;
        companies: string[];
    };
}

export const COLLEGE_DETAILS: Record<number, CollegeDetailData> = {
    1: {
        id: 1,
        name: "Shree Samarth Institute of Technology",
        city: "Nashik",
        state: "Maharashtra",
        tagline: "Building careers through quality education since 2012",
        overview: "Shree Samarth Institute of Technology is a private engineering college affiliated with Savitribai Phule Pune University. We focus on providing affordable, quality technical education with a strong emphasis on practical learning and industry exposure. Our small class sizes ensure individual attention to every student.",
        highlights: [
            "AICTE Approved",
            "Affiliated to SPPU",
            "98% Pass Rate",
            "Placement Cell Active",
        ],
        courses: [
            { name: "B.Tech Computer Science", duration: "4 Years", fees: "₹45,000/year", seats: "60" },
            { name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: "₹42,000/year", seats: "60" },
            { name: "B.Tech Electronics & Communication", duration: "4 Years", fees: "₹43,000/year", seats: "30" },
            { name: "MBA", duration: "2 Years", fees: "₹55,000/year", seats: "30" },
        ],
        facilities: [
            { icon: Home, name: "Hostel", available: true },
            { icon: Wifi, name: "WiFi Campus", available: true },
            { icon: Bus, name: "Transport", available: true },
            { icon: FlaskConical, name: "Modern Labs", available: true },
            { icon: BookOpen, name: "Library", available: true },
            { icon: Briefcase, name: "Placement Cell", available: true },
        ],
        placements: {
            percentage: "65%",
            averagePackage: "₹2.8 LPA",
            highestPackage: "₹12 LPA",
            companies: ["TCS", "Infosys", "Wipro", "Tech Mahindra", "Capgemini", "Local Industries"],
        }
    },
    2: {
        id: 2,
        name: "St. Anthony's College of Engineering",
        city: "Nellore",
        state: "Andhra Pradesh",
        tagline: "Excellence in Engineering Education",
        overview: "St. Anthony's College of Engineering is dedicated to creating future leaders in technology. With a sprawling campus and state-of-the-art infrastructure, we offer a conducive environment for learning and innovation.",
        highlights: [
            "NAAC Accredited",
            "JNTU Affiliated",
            "Industry Partnerships",
            "Innovation Hub",
        ],
        courses: [
            { name: "B.Tech ECE", duration: "4 Years", fees: "₹52,000/year", seats: "120" },
            { name: "B.Tech Civil Engineering", duration: "4 Years", fees: "₹50,000/year", seats: "60" },
            { name: "BBA", duration: "3 Years", fees: "₹30,000/year", seats: "60" },
        ],
        facilities: [
            { icon: Home, name: "Hostel", available: true },
            { icon: Wifi, name: "High-Speed WiFi", available: true },
            { icon: Activity, name: "Sports Complex", available: true },
            { icon: FlaskConical, name: "Robotics Lab", available: true },
            { icon: BookOpen, name: "Digital Library", available: true },
            { icon: Coffee, name: "Cafeteria", available: true },
        ],
        placements: {
            percentage: "72%",
            averagePackage: "₹3.5 LPA",
            highestPackage: "₹15 LPA",
            companies: ["HCL", "Cognizant", "Accenture", "Mindtree", "Zoho"],
        }
    },
    3: {
        id: 3,
        name: "Green Valley College of Commerce",
        city: "Indore",
        state: "Madhya Pradesh",
        tagline: "Nurturing Business Minds",
        overview: "Green Valley College of Commerce offers premier education in commerce and management. Our curriculum is designed to bridge the gap between academic knowledge and practical industry requirements.",
        highlights: [
            "Best Commerce College 2023",
            "Experienced Faculty",
            "Central Location",
            "Skill Development Programs",
        ],
        courses: [
            { name: "B.Com (Hons)", duration: "3 Years", fees: "₹35,000/year", seats: "120" },
            { name: "BCA", duration: "3 Years", fees: "₹40,000/year", seats: "60" },
            { name: "BA Economics", duration: "3 Years", fees: "₹25,000/year", seats: "60" },
        ],
        facilities: [
            { icon: Home, name: "Hostel", available: false },
            { icon: Wifi, name: "WiFi Campus", available: true },
            { icon: Bus, name: "Transport", available: true },
            { icon: BookOpen, name: "Library", available: true },
            { icon: Award, name: "Auditorium", available: true },
            { icon: Briefcase, name: "Internship Cell", available: true },
        ],
        placements: {
            percentage: "60%",
            averagePackage: "₹2.5 LPA",
            highestPackage: "₹8 LPA",
            companies: ["ICICI Bank", "HDFC Bank", "Deloitte", "KPMG (Support)", "Local Firms"],
        }
    }
};
