import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SeatSelectionPage } from '../pages/SeatSelectionPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { ConfirmationPage } from '../pages/ConfirmationPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/checkin/seats" replace />,
  },
  {
    path: '/checkin/seats',
    element: <SeatSelectionPage />,
  },
  {
    path: '/checkin/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/checkin/confirmation',
    element: <ConfirmationPage />,
  },
])
