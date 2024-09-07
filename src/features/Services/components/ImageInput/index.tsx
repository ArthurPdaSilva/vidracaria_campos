import { textFieldStyles } from '@/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, FormControl } from '@mui/material';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface FieldProps {
  field: ControllerRenderProps<any, 'images'>;
  images: File[];
  setImages: (images: File[]) => void;
  disabled?: boolean;
}

export default function ImageInput({
  field,
  images,
  setImages,
  disabled = false,
}: FieldProps) {
  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      setImages([...images, file]);
    }
  };

  return (
    <FormControl sx={{ ...textFieldStyles }}>
      <input
        type="file"
        id="images"
        style={{ display: 'none', flex: '1' }}
        {...field}
        onChange={addImage}
      />
      <label htmlFor="images">
        <Button
          variant="contained"
          disabled={disabled}
          component="span"
          startIcon={<PhotoCamera />}
          sx={{ padding: '1rem', width: '100%' }}
        >
          Enviar Imagens
        </Button>
      </label>
    </FormControl>
  );
}
