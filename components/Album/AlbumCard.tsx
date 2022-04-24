import { Box, VStack, Text } from '@chakra-ui/react';

type Props = {
  title: string;
  onClick?: () => void;
};

export const AlbumCard = ({ title, onClick }: Props) => {
  return (
    <VStack w="40" h="48" cursor={'pointer'} onClick={onClick}>
      <Box w="24" h="32" bg="whiteAlpha.400" shadow="md" borderRadius="md">
        Album
      </Box>
      <Text>{title}</Text>
    </VStack>
  );
};
