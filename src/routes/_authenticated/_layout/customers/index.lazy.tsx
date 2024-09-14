import { AddButton } from '@/components/AddButton';
import { TableContainer } from '@/components/TableContainer';
import { Table } from '@/features/Customers/Table';
import { createLazyFileRoute } from '@tanstack/react-router';

const Customers = () => {
  return (
    <TableContainer
      rightActionComponent={<AddButton link="/customers/add" />}
      table={<Table />}
      title="Clientes"
    />
  );
};

export const Route = createLazyFileRoute('/_authenticated/_layout/customers/')({
  component: Customers,
});
