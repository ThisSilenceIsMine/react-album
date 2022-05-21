import { Box, VStack, Text, Image } from '@chakra-ui/react';
import { PhotoWrapper } from 'models/Photo/Photo';

type Props = {
  title: string;
  src?: string;
  onClick?: () => void;
};

export const AlbumCard = ({ title, src, onClick }: Props) => {
  return (
    <VStack w="40" h="48" cursor={'pointer'} onClick={onClick}>
      {!src && (
        <Box w="24" h="32" bg="whiteAlpha.400" shadow="md" borderRadius="md" />
      )}
      {src && <Image src={src} alt={title} />}

      <Text>{title}</Text>
    </VStack>
  );
};
