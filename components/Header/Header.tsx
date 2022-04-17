import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { ThemeSwitch } from './ThemeSwitch';

export const Header = () => {
  const bg = useColorModeValue('white', 'whiteAlpha.200');

  return (
    <Flex
      as="header"
      align="center"
      direction="row"
      justify="space-between"
      wrap="wrap"
      padding=".5rem"
      bg={bg}
      color="teal.500"
      shadow="2xl"
    >
      <Heading size="md">
        <Link href="/">Album</Link>
      </Heading>

      <ThemeSwitch />
    </Flex>
  );
};
