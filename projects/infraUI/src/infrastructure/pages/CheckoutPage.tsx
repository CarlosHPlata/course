import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { PaymentForm, PaymentFormData } from '../components/PaymentForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePayment } from '@infrastructure/hooks/usePayment';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, seat } = location.state || {};

  const ticketPrice = seat?.price || 0;
  const tax = Math.round(ticketPrice * 0.15);
  const total = ticketPrice + tax;

  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const { mutateAsync: initPayment, isPending: isPaymentLoading } = usePayment(); 

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state]);

  const handlePaymentDataChange = (data: PaymentFormData, isValid: boolean) => {
    setPaymentData(data);
    setIsPaymentValid(isValid);
  };

  const handleProceed = () => {
    if (isPaymentValid && paymentData) {
      initPayment({
        purchaseInformation: {
          amount: total,
          cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
          cardExpiryDate: paymentData.expiryDate,
          cardCvv: paymentData.cvv,
          cardHolderName: paymentData.cardHolderName
        },
        userId: '1',
        flights: [
          {
            flightNumber: flight?.flightNumber || '',
            seat: {
              id: seat?.id || '',
              category: seat?.category || ''
            }
          }
        ]
      })
        .then(() => {
          navigate('/checkin/confirmation');
        })
        .catch((error) => {
          console.error('Payment initialization failed:', error);
        })
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box sx={{ p: 3, color: 'white', display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon onClick={handleBack} sx={{ cursor: 'pointer', mr: 2 }} />
          <Typography variant="h6">Checkout</Typography>
        </Box>

        <Box sx={{ px: 2 }}>
          <PaymentForm onPaymentDataChange={handlePaymentDataChange} />

          <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
            {flight && seat && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {flight.flightNumber} • {flight.origin} to {flight.destination}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  Seat {seat.id} ({seat.category})
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Ticket Price</Typography>
              <Typography variant="body1" fontWeight="bold">${ticketPrice}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Fare Tax</Typography>
              <Typography variant="body1" fontWeight="bold">${tax}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h6" color="secondary.main">Total Amount</Typography>
              <Typography variant="h6" color="secondary.main">${total}</Typography>
            </Box>
          </Paper>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={handleProceed}
            disabled={!isPaymentValid || isPaymentLoading}
            sx={{ mt: 3, height: 56 }}
          >
            Proceed
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
