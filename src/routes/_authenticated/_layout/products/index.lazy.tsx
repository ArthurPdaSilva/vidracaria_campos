import { Box, Button } from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import AddButton from '../../../../components/AddButton/index.tsx';
import TableContainer from '../../../../components/TableContainer/index.tsx';
import StockForm from '../../../../features/Products/StockForm/index.tsx';
import Table from '../../../../features/Products/Table/index.tsx';

export const Route = createLazyFileRoute('/_authenticated/_layout/products/')({
  component: Products,
});

function Products() {
  const [open, setOpen] = useState(false);
  const [openDown, setOpenDown] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StockForm variant="ENTER" open={open} onClose={handleClose} />
      <StockForm
        variant="DOWN"
        open={openDown}
        onClose={() => setOpenDown(false)}
      />
      <TableContainer
        title="Produtos"
        table={<Table />}
        rightActionComponent={
          <Box display="flex" gap=".5rem">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenDown(true)}
            >
              Realizar baixa
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Receber
            </Button>
            <AddButton link="/products/add" />
          </Box>
        }
      />
    </>
  );
}
