import { createBrowserRouter, RouterProvider, Route, redirect } from 'react-router-dom';
import { BookingPage } from '../pages/BookingPage';
import { HomePage } from '../pages/HomePage';
import { AdminPage } from '../pages/AdminPage';
import { AdminBookingQueryPage } from '../pages/AdminBookingQueryPage';
import { AdminBookingTicket } from '../pages/AdminBookingTicket';
const userIsLogin = {
    isAuthenticated:true,
    isAdmin:true
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>
      },
    {
        path: "/booking",
        element: <BookingPage></BookingPage>
    },
    // page router, begin



    // page router, end
    {
        path: "/admin",
        element: <AdminPage></AdminPage>,
        children: [
          { path: "bookings-query", element: <AdminBookingQueryPage></AdminBookingQueryPage> },
          { path: "", element: <div className='text-3xl pt-10 pl-4'>Willkommen im Admin-Dashboard</div> },
          { path: "bookings-manage", element: <AdminBookingTicket></AdminBookingTicket>},
          // admin page, begin

          // admin page, end
        ],
        loader: async () => {
          const user = userIsLogin; 
          if (user=== null || !user.isAuthenticated || !user.isAdmin) {
            return redirect("/"); 
          }
          return null;
        }
    }
    ]
);
export function AppRouter() {
    return (
      <RouterProvider router={router} />
    );
  }