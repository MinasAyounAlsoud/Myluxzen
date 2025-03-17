import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";
import { BookingPage } from "../pages/BookingPage";
import { HomePage } from "../pages/HomePage";
import { AdminPage } from "../pages/AdminPage";
import { AdminBookingQueryPage } from "../pages/AdminBookingQueryPage";
import { AdminBookingTicket } from "../pages/AdminBookingTicket";
import { ReviewPage } from "../pages/ReviewPage";
import { AdminReviewPage } from "../pages/AdminReviewPage";
// import { ApartmentsList } from "../pages/hausBeschreibung";
const userIsLogin = {
  isAuthenticated: true,
  isAdmin: true,
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/booking",
    element: <BookingPage></BookingPage>,
  },
  {
    path: "/reviews",
    element: <ReviewPage></ReviewPage>,
  },
  // {
  //   path: "/HausBeschreibung",
  //   element: <ApartmentsList></ApartmentsList>,
  // },
  {
    path: "/admin",
    element: <AdminPage></AdminPage>,
    children: [
      {
        path: "bookings-query",
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
      {
        path: "bookings-manage",
        element: <AdminBookingTicket></AdminBookingTicket>,
      },
      { path: "reviews", element: <AdminReviewPage /> },
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
  return <RouterProvider router={router} />;
}
