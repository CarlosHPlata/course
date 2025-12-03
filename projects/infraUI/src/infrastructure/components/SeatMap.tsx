import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

interface Seat {
  id: string;
  row: number;
  col: string;
  status: 'available' | 'occupied' | 'selected';
  category: 'basic' | 'business' | 'first';
  price: number;
}

interface SeatMapProps {
  onSeatSelect: (seat: Seat | null) => void;
  selectedSeatId?: string;
}

// Mock data generation
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = 8;
  const cols = ['A', 'B', 'C', 'D'];

  for (let r = 1; r <= rows; r++) {
    cols.forEach((c) => {
      let category: Seat['category'] = 'basic';
      let price = 100;
      if (r <= 2) {
        category = 'first';
        price = 300;
      } else if (r <= 4) {
        category = 'business';
        price = 200;
      }

      // Randomly occupy some seats
      const status = Math.random() > 0.8 ? 'occupied' : 'available';

      seats.push({
        id: `${r}${c}`,
        row: r,
        col: c,
        status,
        category,
        price,
      });
    });
  }
  return seats;
};

const initialSeats = generateSeats();

export const SeatMap: React.FC<SeatMapProps> = ({ onSeatSelect, selectedSeatId }) => {
  const [seats] = useState<Seat[]>(initialSeats);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    if (selectedSeatId === seat.id) {
      onSeatSelect(null);
    } else {
      onSeatSelect(seat);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.id === selectedSeatId) return 'secondary.main';
    if (seat.status === 'occupied') return 'action.disabled';
    return 'primary.light';
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'transparent' }}>
       <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Select a seat
        </Typography>
      </Box>

      <Grid container spacing={1} justifyContent="center" sx={{ maxWidth: 300, mx: 'auto' }}>
        {seats.map((seat) => (
          <Grid size={3} key={seat.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              disabled={seat.status === 'occupied'}
              onClick={() => handleSeatClick(seat)}
              sx={{
                minWidth: 60,
                height: 60,
                p: 1,
                bgcolor: getSeatColor(seat),
                '&:hover': {
                  bgcolor: getSeatColor(seat),
                  opacity: 0.8,
                },
                borderRadius: 2,
              }}
            >
              {seat.price}
              <br/>
              {seat.id}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'action.disabled', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Occupied</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'primary.light', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Available</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 16, height: 16, bgcolor: 'secondary.main', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">Selected</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
