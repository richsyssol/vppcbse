// constant/Admission/admissionProcessData.js
export const admissionProcessData = {
  title: "Admission Process",
  subtitle: "Simple Step-by-Step Journey",
  description:
    "Your choice of your child's educational institution is one of the most important decisions of your life. We understand that finding the right school assures you of your child's development and future. Our simple step-by-step process helps us to learn about each other and set expectations to prepare your child for a better tomorrow.",
  welcomeMessage: "You are welcome.",

  // Horizontal Procedure Steps
  horizontalSteps: [
    {
      id: 1,
      title: "Apply Through\nEnquiry Form",
      icon: "file-text",
      description: "Start your journey by filling our online enquiry form",
    },
    {
      id: 2,
      title: "Connect With\nAdmin Office",
      icon: "headphones",
      description: "Get personalized guidance from our admin team",
    },
    {
      id: 3,
      title: "School Visit",
      icon: "school",
      description: "Experience our campus and facilities firsthand",
    },
    {
      id: 4,
      title: "Application\nInvite",
      icon: "mail",
      description: "Receive formal application invitation",
    },
    {
      id: 5,
      title: "Parents Child\nInteraction",
      icon: "message-circle-question",
      description: "Assessment and interaction session",
    },
    {
      id: 6,
      title: "Admission\nDecision",
      icon: "check-circle",
      description: "Final admission confirmation",
    },
  ],

  // Age Criteria
  ageCriteria: {
    title: "Minimum Age Criteria for Admission",
    academicYear: "2026-2027",
    admissionStatus: "OPEN",
    classes: [
      {
        id: 1,
        className: "Nursery",
        age: "3 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 2,
        className: "Junior KG",
        age: "4 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 3,
        className: "Senior KG",
        age: "5 Years",
        //asOfDate: "as of 31st March 2026",
      },
      {
        id: 4,
        className: "Grade 1",
        age: "6 Years",
        //asOfDate: "as of 31st March 2026",
      },
    ],
  },

  // Admission Open Banner
  admissionOpen: {
    academicYear: "2026-2027",
    status: "OPEN",
    buttonText: "Admission Open for Academic Year 2026-27",
    notificationText:
      "Admissions are now open for the academic year 2026-2027. Limited seats available. Apply now to secure your child's future.",
    applyLink: "/admissions/admission",
    enquiryLink: "/admissions/admission",
  },

  // Detailed Steps (if needed for vertical view)
  steps: [
    {
      id: 1,
      stepNumber: "Step 01",
      title: "Inquiry & Information Gathering",
      icon: "phone",
      description:
        "Begin by gathering information about our school through our website, prospectus, or by visiting the campus. Attend our open house sessions to understand our philosophy and facilities.",
      details: [
        "Visit our website for detailed information",
        "Download the prospectus",
        "Schedule a campus tour",
        "Attend open house sessions",
      ],
    },
    {
      id: 2,
      stepNumber: "Step 02",
      title: "Registration & Application",
      icon: "user-check",
      description:
        "Complete the registration form available at the school office or online portal. Submit the required documents along with the registration fee.",
      details: [
        "Fill out the registration form",
        "Submit required documents",
        "Pay registration fee",
        "Receive application number",
      ],
    },
  ],

  contactInfo: {
    title: "Admission Office Information",
    items: [
      {
        icon: "phone",
        title: "Contact Number",
        value: "+91-XXXXXXXXXX",
        subtext: "Available Mon-Fri, 8:30 AM - 12:00 PM",
      },
      {
        icon: "mail",
        title: "Email Address",
        value: "admissions@schoolname.edu",
        subtext: "Response within 24-48 hours",
      },
    ],
  },

  importantNote: {
    title: "Important Information",
    content:
      "All admissions are subject to seat availability and compliance with CBSE guidelines. Parents are advised to verify all information with the school admission office. The school reserves the right to make changes to the admission process as per regulatory requirements.",
  },
};
