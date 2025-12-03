import React, { useReducer, useEffect } from 'react';
import { Box, TextField, Grid, Typography, Paper } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { z } from 'zod';

// Zod Schema
const paymentSchema = z.object({
  cardHolderName: z.string().min(3, 'Name must be at least 3 characters'),
  cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Invalid card number format (XXXX XXXX XXXX XXXX)'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid date format (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV (3 or 4 digits)'),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormState {
  data: PaymentFormData;
  errors: Partial<Record<keyof PaymentFormData, string>>;
  isValid: boolean;
}

type Action = { type: 'SET_FIELD'; field: keyof PaymentFormData; value: string };

const initialState: PaymentFormState = {
  data: {
    cardHolderName: 'Cosme Fulanito',
    cardNumber: '4444 5121 8455 1564',
    expiryDate: '08/23',
    cvv: '123',
  },
  errors: {},
  isValid: true,
};

const paymentReducer = (state: PaymentFormState, action: Action): PaymentFormState => {
  switch (action.type) {
    case 'SET_FIELD': {
      const newData = { ...state.data, [action.field]: action.value };
      
      // Validate the specific field
      const fieldSchema = paymentSchema.shape[action.field];
      const fieldResult = fieldSchema.safeParse(action.value);
      
      const newErrors = { ...state.errors };
      if (!fieldResult.success) {
        console.log("if not succeed", fieldResult.error!.issues[0].message);
        newErrors[action.field] = fieldResult.error!.issues[0].message;
      } else {
        delete newErrors[action.field];
      }

      // Validate entire form for isValid flag
      const formResult = paymentSchema.safeParse(newData);

      return {
        ...state,
        data: newData,
        errors: newErrors,
        isValid: formResult.success,
      };
    }
    default:
      return state;
  }
};

export interface PaymentFormProps {
  onPaymentDataChange?: (data: PaymentFormData, isValid: boolean) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentDataChange }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  useEffect(() => {
    if (onPaymentDataChange) {
      onPaymentDataChange(state.data, state.isValid);
    }
  }, [state.data, state.isValid, onPaymentDataChange]);

  const handleChange = (field: keyof PaymentFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FIELD', field, value: event.target.value });
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <CreditCardIcon color="primary" /> <Typography variant="caption">VISA</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <CreditCardIcon color="secondary" /> <Typography variant="caption">Mastercard</Typography>
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           <Typography variant="caption" fontWeight="bold">PayPal</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Card Holder Name"
            value={state.data.cardHolderName}
            onChange={handleChange('cardHolderName')}
            error={!!state.errors.cardHolderName}
            helperText={state.errors.cardHolderName}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Card Number"
            value={state.data.cardNumber}
            onChange={handleChange('cardNumber')}
            error={!!state.errors.cardNumber}
            helperText={state.errors.cardNumber}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: <CreditCardIcon color="action" />
            }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Expiry Date"
            value={state.data.expiryDate}
            onChange={handleChange('expiryDate')}
            error={!!state.errors.expiryDate}
            helperText={state.errors.expiryDate}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="CVV"
            value={state.data.cvv}
            onChange={handleChange('cvv')}
            error={!!state.errors.cvv}
            helperText={state.errors.cvv}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
