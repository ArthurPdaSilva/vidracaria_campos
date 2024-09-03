import { createLazyFileRoute } from '@tanstack/react-router';
import AddButton from '../../../../components/AddButton';
import TableContainer from '../../../../components/TableContainer';
import Table from '../../../../features/Customers/Table';

function Customers() {
  return (
    <TableContainer
      rightActionComponent={<AddButton link="/customers/add" />}
      table={<Table />}
      title="Clientes"
    />
  );
}

export const Route = createLazyFileRoute('/_authenticated/_layout/customers/')({
  component: Customers,
});
