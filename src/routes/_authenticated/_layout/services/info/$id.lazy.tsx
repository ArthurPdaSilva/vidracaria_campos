import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import ReturnButton from '../../../../../components/ReturnButton';
import { AddressValidation } from '../../../../../features/Customers/types';
import {
  useGetImagesByServiceId,
  useGetProducstByServiceId,
  useGetServiceById,
} from '../../../../../features/Services/services';
import Carousel from '../../../../../features/Services/ServicesInfo/Carousel';
import UserInfo from '../../../../../features/Services/ServicesInfo/UserInfo';
import { BudgetItem } from '../../../../../features/Services/types';
import { boxStyles, formStyles } from '../../../../../styles';

function ServicesInfo() {
  const { id } = Route.useParams();
  const { data, isLoading } = useGetServiceById(id);
  const { data: products } = useGetProducstByServiceId(data?.id);
  const { data: images } = useGetImagesByServiceId(data?.id);

  const columns = useMemo(
    () => [
      { id: 'name', label: 'Produto' },
      { id: 'actualQuantity', label: 'Quantidade' },
      { id: 'dimensions', label: 'Dimensões A x L x P' },
      { id: 'Total', label: 'Total' },
    ],
    [],
  );

  return (
    <Box sx={boxStyles}>
      <Box
        sx={{
          ...formStyles,
          height: '100%',
        }}
      >
        <Box>
          <ReturnButton link="/services" />
        </Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                width: '70vw',
                marginBottom: '1rem',
                marginTop: '1rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {data && (
                <UserInfo
                  data={{
                    client: data.ownerName,
                    deliveryForecast: data.deliveryForecast ?? 'Não informado',
                    address: data.address as AddressValidation,
                    status: data.status,
                  }}
                />
              )}
              {images && images.length > 0 && <Carousel images={images} />}
            </Box>
            <Divider
              sx={{
                width: '70vw',
                marginBottom: '2rem',
              }}
            />
            <TableContainer
              sx={{
                width: '70vw',
                maxHeight: '41vh',
                overflow: 'auto',
              }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products &&
                    products.items.map((product: BudgetItem) => (
                      <TableRow key={product.name}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          {product.height} x {product.width} x {product.depth}
                        </TableCell>
                        <TableCell>
                          {product.total
                            ? product.total.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                            : 'Não informado'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 'auto',
          }}
        >
          <Avatar
            sx={{
              bgcolor: data?.total && data?.total > 0 ? green[500] : red[500],
              minWidth: 150,
              minHeight: 150,
              fontSize: '1.5rem',
              marginTop: '1rem',
              fontWeight: 'bold',
            }}
          >
            {data?.total?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/services/info/$id',
)({
  component: ServicesInfo,
});
