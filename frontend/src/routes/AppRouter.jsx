import { createBrowserRouter, RouterProvider } from "react-router-dom";
console.log("React Router Version:", createBrowserRouter);
import { useContext } from "react"; //Naheeda
import AuthContext from "../context/AuthContext"; //Naheeda
import { BookingPage } from "../pages/BookingPage"; //Xiangyu
import HomePage from "../pages/HomePage"; //zahra
import { AdminPage } from "../pages/AdminPage"; //Xiangyu
import { AdminBookingQueryPage } from "../pages/AdminBookingQueryPage"; //Xiangyu
import Gallerie from "../pages/GalleriePage"; //zahra
import AuthPage from "../pages/AuthPage"; //Naheeda
import AccountBookingInfoPage from "../pages/AccountBookingInfoPage"; //Naheeda
import AccountDetails from "../components/User/AccountDetails"; //Naheeda
import BookingDetails from "../components/User/BookingDetails"; //Naheeda
import { ReviewPage } from "../pages/ReviewPage"; // Minas
import { AdminReviewPage } from "../pages/AdminReviewPage"; //Minas
import { ApartmentsList } from "../pages/hausBeschreibung"; //Minas
import { AdminSingleHouseQueryPage } from "../pages/AdminSingleHouseQueryPage"; //Xiangyu
import { AdminBookingTicketPage } from "../pages/AdminBookingTicketPage"; //Xiangyu
import AdminGallery from "../pages/AdminGallery"; //zahra
import AboutUs from "../pages/aboutUsPage";
import { AdminHausBeschreibung } from "../pages/AdminHausBeschreibung";
const userIsLogin = {
  isAuthenticated: true,
  isAdmin: true,
};
const createAuthRouter = (authContext) =>
  createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>,
    },
    {
      path: "/booking",
      element: <BookingPage></BookingPage>,
    },
    // page router, begin
    //zahra
    {
      path: "/gallerie",
      element: <Gallerie></Gallerie>,
    },
    { path: "/auth", element: <AuthPage /> }, //Naheeda
    {
      path: "/account-booking",
      element: <AccountBookingInfoPage />, // Wrapper-Seite
      children: [
        { path: "account", element: <AccountDetails /> },
        { path: "booking", element: <BookingDetails /> },
      ],
    },
    {
      path: "/reviews",
      element: <ReviewPage></ReviewPage>,
    }, //Minas
    {
      path: "/HausBeschreibung",
      element: <ApartmentsList></ApartmentsList>,
    }, //Minas
    {
      path: "/about",
      element: <AboutUs></AboutUs>,
    }, //Minas

    // {

    // page router, end
    {
      path: "/admin",
      element: <AdminPage></AdminPage>,
      children: [
        {
          path: "bookings-manage",
          element: <AdminBookingQueryPage></AdminBookingQueryPage>,
        },
        {
          path: "",
          element: (
            <div className="text-3xl pt-10 pl-4">
              Willkommen im Admin-Dashboard
            </div>
          ),
        },
        //delete this page, Xiangyu
        // {
        //   path: "bookings-manage",
        //   element: <AdminBookingTicket></AdminBookingTicket>,
        // },
        // admin page, begin
        { path: "reviews", element: <AdminReviewPage /> }, //Minas

        { path: "HausBeschreibung", element: <AdminHausBeschreibung /> }, //Minas

        {
          path: "singleHouse-query",
          element: <AdminSingleHouseQueryPage></AdminSingleHouseQueryPage>,
        }, // Xiangyu
        {
          path: "booking-edit",
          element: <AdminBookingTicketPage></AdminBookingTicketPage>,
        }, // Xiangyu
        // Zahra
        {
          path: "gallery",
          element: <AdminGallery />,
        },

        // admin page, end
      ],
    },
  ]);
export function AppRouter() {
  const authContext = useContext(AuthContext);
  // Warten, bis die Benutzerdaten geladen sind
  console.log("Aktueller Benutzer im AuthContext:", authContext.user);
  const router = createAuthRouter(authContext);
  return <RouterProvider router={router} />;
}
