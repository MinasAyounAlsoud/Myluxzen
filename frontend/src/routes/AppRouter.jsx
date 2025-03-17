import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
console.log("React Router Version:", createBrowserRouter);
import { useContext } from "react"; //Naheeda
import AuthContext from "../context/AuthContext"; //Naheeda
import { BookingPage } from "../pages/BookingPage";
import HomePage from "../pages/HomePage";
import { AdminPage } from "../pages/AdminPage";
import { AdminBookingQueryPage } from "../pages/AdminBookingQueryPage";
import Gallerie from "../pages/GalleriePage";
import AuthPage from "../pages/AuthPage"; //Naheeda
import AccountBookingInfoPage from "../pages/AccountBookingInfoPage"; //Naheeda
import AccountDetails from "../components/User/AccountDetails"; //Naheeda
import BookingDetails from "../components/User/BookingDetails"; //Naheeda
import { ReviewPage } from "../pages/ReviewPage"; // Minas
import { AdminReviewPage } from "../pages/AdminReviewPage"; //Minas
import { ApartmentsList } from "../pages/hausBeschreibung"; //Minas

const userIsLogin = {
  isAuthenticated: true,
  isAdmin: true,
};
const protectedLoader = async ({ context }) => {
  const user = context.auth?.user; // ✅ AuthContext aus dem `context` abrufen

  if (!user || !user.isAuthenticated || !user.isAdmin) {
    return redirect("/"); // Falls kein User oder Admin → Zur Startseite
  }

  return null;
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

        // admin page, end
      ],
      loader: async () => {
        const user = userIsLogin;
        if (user === null || !user.isAuthenticated || !user.isAdmin) {
          return redirect("/");
        }
        return null;
      },
    },
  ]);
export function AppRouter() {
  const authContext = useContext(AuthContext); // ✅ useContext nur hier, nicht in `protectedLoader`
  if (!authContext) return null; // Falls `authContext` nicht existiert, verhindere Fehler
  const router = createAuthRouter(authContext);
  return <RouterProvider router={router} />;
}

/*
import { createBrowserRouter, RouterProvider,Navigate, Route, redirect } from 'react-router-dom';
import { useContext } from "react";  //Naheeda
import AuthContext from "../context/AuthContext";  //Naheeda
import { BookingPage } from '../pages/BookingPage';
import HomePage from '../pages/HomePage';
import { AdminPage } from '../pages/AdminPage';
import { AdminBookingQueryPage } from '../pages/AdminBookingQueryPage';
import { AdminBookingTicket } from '../pages/AdminBookingTicket';
import Gallerie from '../pages/GalleriePage'
import AuthPage from "../pages/AuthPage";  //Naheeda
import AccountBookingInfoPage from "../pages/AccountBookingInfoPage";//Naheeda
import AccountDetails from "../components/User/AccountDetails";//Naheeda
import BookingDetails from "../components/User/BookingDetails";//Naheeda

const protectedLoader = async ({ context }) => {
  const user = context.auth?.user; // ✅ AuthContext aus dem `context` abrufen

  if (!user || (!user.isAuthenticated || !user.isAdmin)) {
      return redirect("/"); // Falls kein User oder Admin → Zur Startseite
  }

  return null;
};


const createAuthRouter = (authContext) =>
  createBrowserRouter(
      [
          {
              path: "/",
              element: <Layout />, 
              children: [
                  { path: "/", element: <HomePage /> },
                  { path: "/booking", element: <BookingPage /> },
                  { path: "/auth", element: <AuthPage /> },

                  // 🚀 Geschützte Benutzer- & Admin-Routen
                  {
                      path: "/account-booking",
                      element: <AccountBookingInfoPage />, // Wrapper-Seite
                      loader: protectedLoader,
                      children: [
                          { path: "account", element: <AccountDetails /> },
                          { path: "booking", element: <BookingDetails /> },
                      ],
                  },
      

                  // 🚀 Admin-Routen mit geschütztem Zugriff
                  {
                      path: "/admin",
                      element: <AdminPage />,
                      loader: protectedLoader,
                      children: [
                          { path: "bookings-query", element: <AdminBookingQueryPage /> },
                          {
                              path: "",
                              element: <div className="text-3xl pt-10 pl-4">Willkommen im Admin-Dashboard</div>,
                          },
                          { path: "bookings-manage", element: <AdminBookingTicket /> },
                      ],
                  },

                  // ✅ Falls Route nicht existiert → Weiterleitung zur Startseite
                  { path: "*", element: <Navigate to="/" replace /> },
              ],
          },
      ],
      { context: { auth: authContext } } // ✅ `authContext` wird an `loader` übergeben
  );

export function AppRouter() {
  const authContext = useContext(AuthContext); // ✅ useContext nur hier, nicht in `protectedLoader`
  if (!authContext) return null; // Falls `authContext` nicht existiert, verhindere Fehler
  const router = createAuthRouter(authContext);
  return <RouterProvider router={router} />;
}

*/
