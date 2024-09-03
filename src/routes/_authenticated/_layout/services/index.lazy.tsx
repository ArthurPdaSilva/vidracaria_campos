import { createLazyFileRoute } from '@tanstack/react-router';
import AddButton from '../../../../components/AddButton';
import TableContainer from '../../../../components/TableContainer';
import Table from '../../../../features/Services/Table';

function Services() {
  return (
    <TableContainer
      rightActionComponent={<AddButton link="/services/add" />}
      table={<Table />}
      title="Serviços"
    />
  );
}

export const Route = createLazyFileRoute('/_authenticated/_layout/services/')({
  component: Services,
});
