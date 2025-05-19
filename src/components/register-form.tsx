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

// Zod schema to validate form
const schema = z.object({
  full_name: z.string().min(1, { message: 'Full name is required' }),
  phone_number: z.string().min(10, { message: 'Phone number is required' }),
  number_plate: z.string().min(1, { message: 'Number plate is required' }),
  stage: z.string().min(1, { message: 'Stage is required' }),
  nin: z.string().min(1, { message: 'NIN is required' }),
  driving_permit_number: z.string().optional(),
  region: z.string().min(1, { message: 'Region is required' }),
  position_at_stage: z.string().min(1, { message: 'Position is required' }),
});

type Values = z.infer<typeof schema>;

const defaultValues: Values = {
  full_name: '',
  phone_number: '',
  number_plate: '',
  stage: '',
  nin: '',
  driving_permit_number: '',
  region: '',
  position_at_stage: '',
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
    reset,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  // Fetch select options from backend
  const [regions, setRegions] = React.useState<any[]>([]);
  const [stages, setStages] = React.useState<any[]>([]);
  const [positions, setPositions] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/regions/')
      .then((res) => res.json())
      .then(setRegions);
    fetch('http://127.0.0.1:8000/stages/')
      .then((res) => res.json())
      .then(setStages);
    fetch('http://127.0.0.1:8000/positions/')
      .then((res) => res.json())
      .then(setPositions);
  }, []);

  const onSubmit = async (data: Values) => {
    try {
      // Cast stage, region, and position_at_stage to integers (their primary key values)
      const payload = {
        ...data,
        stage: parseInt(data.stage, 10),
        region: parseInt(data.region, 10),
        position_at_stage: parseInt(data.position_at_stage, 10),
      };

      const response = await fetch('http://127.0.0.1:8000/riders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');
      const rider = await response.json();
      console.log('Registered rider:', rider);
      reset(); // clear the form
      alert('Rider registered successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Check console for errors.');
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Register as a Boda Rider
      </Typography>
      <Typography color="text.secondary" variant="body2">
        Be part of Union Boda and National Boda Riders Database
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.full_name}>
                  <InputLabel sx={labelStyle}>Full Name</InputLabel>
                  <OutlinedInput {...field} label="Full Name" sx={inputStyle} />
                  {errors.full_name && <FormHelperText>{errors.full_name.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.phone_number}>
                  <InputLabel sx={labelStyle}>Phone Number</InputLabel>
                  <OutlinedInput {...field} label="Phone Number" sx={inputStyle} />
                  {errors.phone_number && (
                    <FormHelperText>{errors.phone_number.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          {/* Number Plate */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="number_plate"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.number_plate}>
                  <InputLabel sx={labelStyle}>Number Plate</InputLabel>
                  <OutlinedInput {...field} label="Number Plate" sx={inputStyle} />
                  {errors.number_plate && (
                    <FormHelperText>{errors.number_plate.message}</FormHelperText>
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
                  <OutlinedInput {...field} label="National ID Number" sx={inputStyle} />
                  {errors.nin && <FormHelperText>{errors.nin.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Driving Permit Number */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="driving_permit_number"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel sx={labelStyle}>Driving Permit Number (optional)</InputLabel>
                  <OutlinedInput {...field} label="Driving Permit Number" sx={inputStyle} />
                </FormControl>
              )}
            />
          </Grid>

          {/* Stage (Dropdown) */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="stage"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.stage}>
                  <InputLabel sx={labelStyle}>Stage</InputLabel>
                  <Select {...field} label="Stage" sx={inputStyle}>
                    <MenuItem value="">Select Stage</MenuItem>
                    {stages.map((stage) => (
                      <MenuItem key={stage.name} value={stage.name}>
                        {stage.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.stage && <FormHelperText>{errors.stage.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Region (Dropdown) */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.region}>
                  <InputLabel sx={labelStyle}>Region</InputLabel>
                  <Select {...field} label="Region" sx={inputStyle}>
                    <MenuItem value="">Select Region</MenuItem>
                    {regions.map((region) => (
                      <MenuItem key={region.name} value={region.name}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.region && <FormHelperText>{errors.region.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Position at Stage (Dropdown) */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="position_at_stage"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.position_at_stage}>
                  <InputLabel sx={labelStyle}>Position at Stage</InputLabel>
                  <Select {...field} label="Position at Stage" sx={inputStyle}>
                    <MenuItem value="">Select Position</MenuItem>
                    {positions.map((pos) => (
                      <MenuItem key={pos.title} value={pos.title}>
                        {pos.title}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.position_at_stage && (
                    <FormHelperText>{errors.position_at_stage.message}</FormHelperText>
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
