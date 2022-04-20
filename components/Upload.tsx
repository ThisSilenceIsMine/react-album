import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  onUpload?: (files: File[]) => void;
};

export const Upload = ({ onUpload }: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 5000000,
  });

  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    setImages([]);

    acceptedFiles.map((file) => {
      if (FileReader) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const res = reader.result;
          if (res) {
            setImages((c) => [...c, res]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [acceptedFiles]);

  const files = images.map((img) => {
    return <Image key={img} src={img} width="60px" height="60px" alt="" />;
  });

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

      {files.length > 0 && (
        <SimpleGrid pt="4" gap="1em" columns={[2, null, 5]}>
          {files}
        </SimpleGrid>
      )}
    </Box>
  );
};
