import { Box, Divider, Modal, Typography } from '@mui/material';
import CloseButton from '../../../components/CloseButton';
import CustomLabel from '../../../components/CustomLabel';
import { modalStyles } from '../../../styles';
import { modalHeaderStyles, modalTitleStyles } from '../styles';
import { ProductValidation } from '../types';
import { productBoxInfoStyles } from './styles';

interface ProductInfoFormProps {
  open: boolean;
  onClose: () => void;
  product?: ProductValidation;
}

export default function ProducstInfoForm({
  onClose,
  open,
  product,
}: ProductInfoFormProps) {
  if (product === undefined) return;

  return (
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <Box sx={productBoxInfoStyles}>
        <Box>
          <Box sx={modalHeaderStyles}>
            <CloseButton onClose={onClose} />
          </Box>

          <Typography sx={modalTitleStyles} variant="h5">
            {product.name}
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              justifyContent: 'space-between',
            }}
          >
            <CustomLabel title="Categoria" text={product.category} />
            <CustomLabel
              title="Preço"
              text={
                product.price?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }) || 'R$ 0,00'
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              backgroundColor: '#f5f5f5',
            }}
          >
            <CustomLabel
              title="Profundidade"
              text={product.depth == 0 ? 'Não informada' : product.depth + ''}
            />
            <CustomLabel
              title="Largura"
              text={product.width == 0 ? 'Não informada' : product.width + ''}
            />
            <CustomLabel
              title="Altura"
              text={product.height == 0 ? 'Não informada' : product.height + ''}
            />
            <CustomLabel
              title="Unidade de medida"
              text={product.unitOfMeasure}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
