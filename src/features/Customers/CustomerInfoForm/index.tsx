import userIcon from '@/assets//images/user-icon.webp';
import {
  EmailOutlinedIcon,
  LocalPhoneOutlinedIcon,
} from '@/assets/images/icons';
import { CloseButton } from '@/components/CloseButton';
import { modalStyles } from '@/styles';
import { Box, Modal, Typography } from '@mui/material';
import { modalHeaderStyles } from '../../Products/styles';
import {
  addressContentStyles,
  boxContentStyles,
  customerBoxInfoStyles,
  modalContentStyles,
  textContentStyles,
} from '../styles';
import { CustomerValidation } from '../types';
import { AddressInfoSpan } from './AddressInfoSpan';

interface CustomerInfoFormProps {
  open: boolean;
  onClose: () => void;
  customer?: CustomerValidation;
}

export const CustomerInfoForm = ({
  onClose,
  open,
  customer,
}: CustomerInfoFormProps) => {
  if (customer === undefined) return;

  return (
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <Box sx={customerBoxInfoStyles}>
        <Box sx={modalHeaderStyles}>
          <CloseButton onClose={onClose} />
        </Box>

        <Box sx={modalContentStyles}>
          <img
            src={userIcon}
            alt="user"
            style={{ width: '11em' }}
            loading="lazy"
          />
          <Typography variant="h5" fontWeight="bold">
            {customer.name}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="GrayText">
            Pessoa {customer.customerType}
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="GrayText">
            {customer.cpfcnpj}
          </Typography>
        </Box>

        <Box sx={boxContentStyles}>
          <Typography variant="body2" fontWeight="bold" color="GrayText">
            Informações de Contato
          </Typography>
          <Box display="flex">
            {customer.phone && (
              <Typography variant="body2" sx={textContentStyles}>
                <LocalPhoneOutlinedIcon /> {customer.phone}
              </Typography>
            )}
            <Typography variant="body2" sx={textContentStyles}>
              <EmailOutlinedIcon /> {customer.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={boxContentStyles}>
          <Typography variant="body2" fontWeight="bold" color="GrayText">
            Endereço
          </Typography>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Typography variant="body2" sx={addressContentStyles}>
              <AddressInfoSpan text="Rua" />
              {customer.address.address}
            </Typography>
            <Typography variant="body2" sx={addressContentStyles}>
              <AddressInfoSpan text="CEP" />
              {customer.address.zipCode}
            </Typography>
            <Typography variant="body2" sx={addressContentStyles}>
              <AddressInfoSpan text="Estado" />
              {customer.address.state}
            </Typography>
            {customer.address.landmark && (
              <Typography variant="body2" sx={addressContentStyles}>
                <AddressInfoSpan text="Referência" />
                {customer.address.landmark}
              </Typography>
            )}
            {customer.address.neighborhood && (
              <Typography variant="body2" sx={addressContentStyles}>
                <AddressInfoSpan text="Bairro" />
                {customer.address.neighborhood}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
