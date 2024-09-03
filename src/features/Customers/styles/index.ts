import { CSSProperties } from '@mui/material/styles/createMixins';

export const boxStylesForm: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1em',
  marginBottom: '1em',
  flexWrap: 'wrap',
};

export const customerBoxInfoStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '50vh',
  borderRadius: '5px',
  padding: '1rem',
  marginLeft: '2em',
  backgroundColor: '#fff',
};

export const modalContentStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1em',
};

export const boxContentStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  borderTop: '1px solid #000',
  marginTop: '1em',
  padding: '0.5em',
};

export const textContentStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  color: 'GrayText',
  margin: '1em',
};

export const addressContentStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'GrayText',
  margin: '1em',
};
