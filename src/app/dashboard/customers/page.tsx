'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { RidersTable } from '@/components/dashboard/customer/customers-table';
import type { Rider } from '@/components/dashboard/customer/customers-table';

export default function Page(): React.JSX.Element {
  const [riders, setRiders] = React.useState<Rider[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  // Check if data is in localStorage
  React.useEffect(() => {
    const storedRiders = localStorage.getItem('riders');
    if (storedRiders) {
      setRiders(JSON.parse(storedRiders));
      setLoading(false); // No need to load data if it's in localStorage
    } else {
      fetchRiders();
    }
  }, []);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/riders/');
      const data = await res.json();
      setRiders(data);
      localStorage.setItem('riders', JSON.stringify(data)); // Store the fetched data
    } catch (err) {
      console.error('Failed to fetch riders:', err);
    } finally {
      setLoading(false);
    }
  };

  const paginatedRiders = applyPagination(riders, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Riders</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>

      {/* {loading ? (
        <Typography>Loading...</Typography>
      ) : ( */}
        <RidersTable
          count={riders.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rows={paginatedRiders}
        />
      {/* )} */}
    </Stack>
  );
}

function applyPagination(rows: Rider[], page: number, rowsPerPage: number): Rider[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
