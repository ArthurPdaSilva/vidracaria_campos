import { IconButton, Tooltip } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  DeleteIcon,
  EditIcon,
  InfoIcon,
  PrintIcon,
} from '../../assets/images/icons';
import { ConfirmAction } from '../ConfirmAction';

export interface TableCellActionsProps {
  idObject: string;
  type: 'product' | 'customer' | 'service';
  dispach: (idObject: string) => void;
  handleClick: (id: string) => void;
  printBudgetClick?: (id: string) => void;
}

const typeMap = {
  product: { label: 'Produto', editPath: '/products/edit/$id' },
  customer: { label: 'Cliente', editPath: '/customers/edit/$id' },
  service: { label: 'Serviço', editPath: '/services/edit/$id' },
};

export const TableCellActions = ({
  idObject,
  type,
  dispach,
  handleClick,
  printBudgetClick,
}: TableCellActionsProps) => {
  const [open, setOpen] = useState(false);
  const [typeTranslate, setTypeTranslate] = useState<string>('');

  useEffect(() => {
    setTypeTranslate(typeMap[type]?.label || '');
  }, [type]);

  return (
    <>
      <ConfirmAction
        confirmDispach={() => {
          dispach(idObject);
          setOpen(false);
        }}
        open={open}
        denyDispach={() => setOpen(false)}
      />

      {typeMap[type]?.label === 'Serviço' && (
        <Tooltip title={`Imprimir ${typeTranslate}`}>
          <IconButton
            aria-label="Imprimir"
            color="default"
            onClick={() => printBudgetClick && printBudgetClick(idObject)}
          >
            <PrintIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={`Ver informação de ${typeTranslate}`}>
        <IconButton
          aria-label="Info"
          color="info"
          onClick={() => handleClick(idObject)}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={`Editar informações de ${typeTranslate}`}>
        <Link to={typeMap[type]?.editPath.replace('$id', idObject) || ''}>
          <IconButton aria-label="Editar" color="warning">
            <EditIcon />
          </IconButton>
        </Link>
      </Tooltip>

      <Tooltip title={`Excluir informações de ${typeTranslate}`}>
        <IconButton
          aria-label="Excluir"
          color="error"
          onClick={() => setOpen(true)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
