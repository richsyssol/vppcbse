import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import AdmissionForm from "./Pages/Admission/AdmissionForm";

import Teachers from "./Pages/Aboutus/Teachers";
import ManagementCommittee from "./Pages/Aboutus/ManagementCommittee";
import Faculty from "./Pages/Aboutus/Faculty";
import Infrastructure from "./Pages/Aboutus/Infrastructure";
//import AboutUs from "./Pages/Aboutus/Aboutus/Aboutus";
import Preprimary from "./Pages/Aboutus/Academics/Preprimary";
// import Primary from "./Pages/Aboutus/Academics/Primary";
// import Secondary from "./Pages/Aboutus/Academics/Secondary";
import PrimarySection from "./Pages/Aboutus/Academics/Primary/PrimarySection";
import SecondarySection from "./Pages/Aboutus/Academics/SecondarySection/SecondarySection";

import AboutUs from "./Pages/Aboutus/About/AboutUs";
import FacultyPage from "./Pages/Aboutus/About/FacultyPage";
import AdmissionGuidelines from "./Pages/Admission/AdmissionGuidelines";
import AdmissionProcess from "./Pages/Admission/AdmissionProcess";
import AdmissionEnquiryForm from "./Pages/Admission/AdmissionEnquiryForm";
import FeeStructure from "./Pages/Admission/FeeStructure";
import MiddleSection from "./Pages/Aboutus/Academics/Middle/MiddleSection";
import Result from "./Pages/Aboutus/Academics/Result/Result";
import CurriculumSection from "./Pages/Infocorner/CurriculumSection";
import StudentCouncilSection from "./Pages/Infocorner/StudentCouncilSection";
import Academiccalendar from "./Pages/Calendar/Academiccalendar";
import Classwisestrength from "./Pages/Calendar/Classwisestrength";
import Timetable from "./Pages/Calendar/Timetable";
import Images from "./Pages/Gallery/Images";
import Videos from "./Pages/Gallery/Videos";
import NationalInternational from "./Pages/Sportsandgames/NationalInternational";
import SportsVideos from "./Pages/Sportsandgames/SportsVideos";
import SportsImages from "./Pages/Sportsandgames/SportsImages";
import ContactUs from "./Pages/Contactus/ContactUs";
import SocialConnect from "./Pages/SocialConnect/SocialConnect";
import Blog from "./Pages/Blog/Blog";
import Disclosure from "./Pages/Home/Disclosure";
import Cocurricular from "./Pages/Cocurricular/Cocurricular";
import Cbseaffiliation from "./Pages/Infocorner/Cbseaffiliation";
import Booklist from "./Pages/Infocorner/Booklist";
import Reports from "./Pages/Infocorner/Reports";
import AffiliationCertificate from "./Pages/Infocorner/AffiliationCertificate";
import Circulars from "./Pages/Infocorner/Circulars";
import VppsStudentJourneydetails from "./Pages/Home/VppsStudentJourneydetails";
import JobRegistration from "./Pages/Jobvacancy/JobRegistration";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="disclosure" element={<Disclosure />} />
        <Route path="student-journey" element={<VppsStudentJourneydetails />} />

        <Route path="about/about" element={<AboutUs />} />
        <Route path="about/infrastructure" element={<Infrastructure />} />
        <Route path="about/faculty" element={<FacultyPage />} />
        <Route
          path="about/management-committee"
          element={<ManagementCommittee />}
        />
        <Route path="about/teachers" element={<Teachers />} />

        <Route path="admission" element={<AdmissionForm />} />
        <Route path="admissions/guidelines" element={<AdmissionGuidelines />} />
        <Route path="admissions/procedure" element={<AdmissionProcess />} />
        <Route path="admissions/enquiry" element={<AdmissionEnquiryForm />} />
        <Route path="admissions/admission" element={<AdmissionForm />} />

        <Route path="academics/pre-primary" element={<Preprimary />} />
        <Route path="academics/middle" element={<MiddleSection />} />

        <Route path="academics/primary" element={<PrimarySection />} />
        <Route path="academics/secondary" element={<SecondarySection />} />
        <Route path="academics/result" element={<Result />} />
        <Route path="info-corner/curriculum" element={<CurriculumSection />} />
        <Route
          path="info-corner/students-council"
          element={<StudentCouncilSection />}
        />
        <Route
          path="info-corner/cbse-affiliation"
          element={<Cbseaffiliation />}
        />
        <Route
          path="/info-corner/affiliation-certificate"
          element={<AffiliationCertificate />}
        />
        <Route path="info-corner/circulars" element={<Circulars />} />
        <Route path="info-corner/book-list" element={<Booklist />} />
        <Route path="info-corner/reports" element={<Reports />} />
        <Route
          path="/calendar/academic-calendar"
          element={<Academiccalendar />}
        />
        <Route
          path="calendar/class-wise-strength"
          element={<Classwisestrength />}
        />
        <Route path="calendar/table-table" element={<Timetable />} />
        <Route path="gallery/images" element={<Images />} />
        <Route path="gallery/videos" element={<Videos />} />
        <Route path="sports/photos" element={<SportsImages />} />
        <Route path="sports/videos" element={<SportsVideos />} />

        <Route
          path="sports/national-international-participants"
          element={<NationalInternational />}
        />

        <Route path="co-curricular" element={<Cocurricular />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="social-connect" element={<SocialConnect />} />
        <Route path="vacancy" element={<JobRegistration />} />

      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
