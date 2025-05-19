'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

function noop(): void {}

export interface Rider {
  id: number;
  full_name: string;
  phone_number: string;
  number_plate: string;
  region_name: string;
  stage_name: string;
  date_registered: string;
}

interface RidersTableProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rows: Rider[];
}

export function RidersTable({
  count,
  page,
  rowsPerPage,
  rows,
}: RidersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((r) => r.id.toString()), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Number Plate</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Registered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((rider) => {
              const isSelected = selected?.has(rider.id.toString());

              return (
                <TableRow hover key={rider.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(e) =>
                        e.target.checked
                          ? selectOne(rider.id.toString())
                          : deselectOne(rider.id.toString())
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {/* <Avatar>{rider.full_name.charAt(0)}</Avatar> */}
                      <Typography variant="subtitle2">{rider.full_name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{rider.phone_number}</TableCell>
                  <TableCell>{rider.number_plate}</TableCell>
                  <TableCell>{rider.region_name}</TableCell>
                  <TableCell>{rider.stage_name}</TableCell>
                  <TableCell>{dayjs(rider.date_registered).format('MMM D, YYYY')}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
