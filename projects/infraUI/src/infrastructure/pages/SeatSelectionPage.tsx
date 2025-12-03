import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FlightHeader } from '../components/FlightHeader';
import { SeatMap } from '../components/SeatMap';

export const SeatSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  const flightDetails = {
    origin: "Sydney",
    destination: "London",
    flightNumber: "EK008",
    departureTime: "8:30 AM",
    duration: "23h 25m"
  };

  const handleCheckout = () => {
    if (selectedSeat) {
      navigate('/checkin/checkout', { 
        state: { 
          flight: flightDetails,
          seat: selectedSeat 
        } 
      });
    }
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
          <FlightHeader
            {...flightDetails}
          />
        </Box>

        <Box sx={{ px: 2, borderTopLeftRadius: 32, borderTopRightRadius: 32, bgcolor: 'primary.main'}}>
          <SeatMap
            onSeatSelect={setSelectedSeat}
            selectedSeatId={selectedSeat?.id}
          />

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', px: 1 }}>
            <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Ticket Price</Typography>
                <Typography variant="h6">$790</Typography>
            </Box>
             <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={!selectedSeat}
                sx={{ maxWidth: 200 }}
            >
                Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
