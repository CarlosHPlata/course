import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Navigate back to home or restart flow
    navigate('/checkin/seats');
  };

  return (
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box sx={{ p: 3, color: 'white', display: 'flex', alignItems: 'center' }}>
            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer', mr: 2 }} />
            <Typography variant="h6">Confirmation</Typography>
        </Box>

        <Box sx={{ px: 2, textAlign: 'center', color: 'white', mt: 4 }}>
           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
             <Box sx={{ bgcolor: 'white', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: 'primary.main' }} />
             </Box>
           </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Done
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
            Your ticket purchase successfully completed
          </Typography>

          {/* Ticket Preview Placeholder */}
          <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2, minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white' }}>
             <Typography color="text.secondary">Ticket Preview</Typography>
          </Paper>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            sx={{ mb: 2, height: 56 }}
            onClick={() => {}} // Placeholder
          >
            Download Ticket
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{ 
                height: 56, 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
            onClick={() => {}} // Placeholder
          >
            Print Ticket
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
