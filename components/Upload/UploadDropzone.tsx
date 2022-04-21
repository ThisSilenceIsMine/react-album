import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onUpload?: (files: File) => void;
};

export const UploadDropzone = ({ onUpload }: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 5000000,
    multiple: false,
  });

  useEffect(() => {
    onUpload && onUpload(acceptedFiles[0]);
  }, [acceptedFiles, onUpload]);

  return (
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="teal.500"
      borderRadius="lg"
      p="6"
      w="fit-content"
    >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Text>
          Drag &apos;n&apos; drop some files here, or click to select files
        </Text>
      </div>
    </Box>
  );
};
