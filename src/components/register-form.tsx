'use client';

import * as React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phoneNumber: z.string().min(10, { message: 'Phone number is required' }),
  numberPlate: z.string().min(1, { message: 'Number plate is required' }),
  stageName: z.string().min(1, { message: 'Stage name is required' }),
  nin: z.string().min(1, { message: 'NIN is required' }),
  permitNumber: z.string().optional(),
  location: z.string().min(1, { message: 'Location is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
});

type Values = z.infer<typeof schema>;

const defaultValues: Values = {
  name: '',
  phoneNumber: '',
  numberPlate: '',
  stageName: '',
  nin: '',
  permitNumber: '',
  location: '',
  position: '',
};

const inputStyle = {
  height: 40,
  fontSize: '0.875rem',
  padding: '10px',
};

const labelStyle = {
  top: '-6px',
  fontSize: '0.875rem',
};

export function RegisterForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = (data: Values): void => {
    console.log('Registration Data:', data);
    // Send to API here
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{fontWeight: 600}}>Register as a Boda Rider</Typography>
      <Typography color="text.secondary" variant="body2">
        Be part of Union Boda and National Boda Riders Database
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12} sm={6}>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.name}>
                  <InputLabel sx={labelStyle}>Name</InputLabel>
                  <OutlinedInput {...field} label="Name" sx={inputStyle} />
                  {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={2} /> */}
          {/* Phone Number */}
          <Grid item xs={12} sm={6}>

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.phoneNumber}>
                  <InputLabel sx={labelStyle}>Phone Number</InputLabel>
                  <OutlinedInput {...field} label="Phone Number" sx={inputStyle} />
                  {errors.phoneNumber && (
                    <FormHelperText>{errors.phoneNumber.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Number Plate */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="numberPlate"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.numberPlate}>
                  <InputLabel sx={labelStyle}>Boda Number Plate</InputLabel>
                  <OutlinedInput {...field} label="Boda Number Plate" sx={inputStyle} />
                  {errors.numberPlate && (
                    <FormHelperText>{errors.numberPlate.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Stage Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="stageName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.stageName}>
                  <InputLabel sx={labelStyle}>Stage Name</InputLabel>
                  <OutlinedInput {...field} label="Stage Name" sx={inputStyle} />
                  {errors.stageName && (
                    <FormHelperText>{errors.stageName.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* NIN */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="nin"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.nin}>
                  <InputLabel sx={labelStyle}>National ID Number (NIN)</InputLabel>
                  <OutlinedInput {...field} label="National ID Number (NIN)" sx={inputStyle} />
                  {errors.nin && (
                    <FormHelperText>{errors.nin.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Driving Permit */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="permitNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel sx={labelStyle}>Driving Permit Number (optional)</InputLabel>
                  <OutlinedInput {...field} label="Driving Permit Number (optional)" sx={inputStyle} />
                </FormControl>
              )}
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.location}>
                  <InputLabel sx={labelStyle}>Location</InputLabel>
                  <Select {...field} label="Location" sx={inputStyle}>
                    <MenuItem value="">Select Location</MenuItem>
                    <MenuItem value="Kampala">Kampala</MenuItem>
                    <MenuItem value="Mbale">Mbale</MenuItem>
                    <MenuItem value="Gulu">Gulu</MenuItem>
                  </Select>
                  {errors.location && (
                    <FormHelperText>{errors.location.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Position */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.position}>
                  <InputLabel sx={labelStyle}>Position at Stage</InputLabel>
                  <Select {...field} label="Position at Stage" sx={inputStyle}>
                    <MenuItem value="">Select Position</MenuItem>
                    <MenuItem value="Chairman">Chairman</MenuItem>
                    <MenuItem value="Vice Chairman">Vice Chairman</MenuItem>
                    <MenuItem value="Rider">Rider</MenuItem>
                  </Select>
                  {errors.position && (
                    <FormHelperText>{errors.position.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ height: 44 }}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}
