import { CSSProperties } from 'react';

export const boxStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100%',
  padding: '1em',
  width: '100%',
  alignItems: 'center',
};

export const buttonStyles: CSSProperties = {
  width: '100%',
  padding: '10px',
  display: 'flex',
  alignSelf: 'center',
};

export const textFieldStyles: CSSProperties = {
  margin: '1em 0 1em 0',
  flex: 1,
  minWidth: '200px',
};

export const headerBoxStyles: CSSProperties = {
  display: 'flex',
  gap: '1em',
  padding: '10px',
  marginBottom: '1em',
};

export const headerTablePageStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1em',
  padding: '10px',
  marginBottom: '1em',
};

export const headerFormStyles: CSSProperties = {
  display: 'flex',
  gap: '30%',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

export const formStyles: CSSProperties = {
  display: 'flex',
  background: 'white',
  padding: '1rem',
  borderRadius: '.5rem',
  flexDirection: 'column',
  margin: '1em',
  width: '70vw',
};

export const modalStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
