import { Box, VStack, Text } from '@chakra-ui/react';

type Props = {
  title: string;
};

export const AlbumCard = ({ title }: Props) => {
  return (
    <VStack>
      <Box
        w="24"
        h="32"
        cursor={'pointer'}
        bg="teal"
        shadow="md"
        borderRadius="md"
      >
        Album
      </Box>
      <Text>{title}</Text>
    </VStack>
  );
};
