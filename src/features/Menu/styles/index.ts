import { CSSProperties as CSSPropertiesMui } from '@mui/styled-engine';
import { CSSProperties } from 'react';

export const linkStyle: CSSProperties = {
  textDecoration: 'none',
  color: 'var(--color-text)',
};

export const linkStyleActives: CSSProperties = {
  textDecoration: 'none',
  color: 'var(--primary)',
  fontWeight: 'bold',
};

export const iconStyle: CSSPropertiesMui = {
  textDecoration: 'none',
  color: 'var(--color-text)',
};

export const iconStyleActives: CSSPropertiesMui = {
  textDecoration: 'none',
  color: 'var(--primary)',
  fontWeight: 'bold',
};

export const buttonStyle: CSSPropertiesMui = {
  borderLeft: 'none',
};

export const buttonStyleActive: CSSPropertiesMui = {
  borderLeft: 'solid 5px #2196F3',
  backgroundColor: '#f5f5f5',
};

export const exitStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  minWidth: '100%',
  marginBottom: '20px',
};

export const navStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  minHeight: '100vh',
  position: 'fixed',
  boxShadow: '0px 4px 15px 0px rgba(0,0,0,0.1)',
  width: '200px',
  zIndex: '999',
};

export const headerStyles: CSSProperties = {
  position: 'relative',
  width: '200px',
  overflow: 'hidden',
  minHeight: '100vh',
  background: '#fff',
  zIndex: '999',
};

export const navListStyles: CSSPropertiesMui = {
  width: '100%',
  zIndex: '999',
};

export const colapsableButtonMenu: CSSPropertiesMui = {
  display: 'flex',
  gap: '5px',
  width: '100%',
  marginTop: '1rem',
};
