import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

interface FlightHeaderProps {
  origin: string;
  destination: string;
  flightNumber: string;
  departureTime: string;
  duration: string;
}

export const FlightHeader: React.FC<FlightHeaderProps> = ({
  origin,
  destination,
  flightNumber,
  departureTime,
  duration,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 0,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Flight details
        </Typography>

        <FlightTakeoffIcon sx={{ mr: 1, opacity: 0.8 }} />
        <Typography variant="body2" sx={{ opacity: 0.8 }} textAlign="center">
          {duration}
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid container spacing={2} alignItems="center" size={6}>
          <Grid size={12}>
            <Typography variant="h6" fontWeight="bold">
              {origin}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              (SYD)
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" size={6}>
          <Grid size={12}>
            <Typography variant="h6" fontWeight="bold" textAlign="right">
              {destination}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }} textAlign="right">
              (LCY)
            </Typography>
          </Grid>
        </Grid>

        <Grid size={6} sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Depart
          </Typography>
          <Typography variant="body2">{departureTime}</Typography>
        </Grid>

        <Grid size={6} sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }} textAlign="right">
            Flight No
          </Typography>
          <Typography variant="body2" textAlign="right">{flightNumber}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
