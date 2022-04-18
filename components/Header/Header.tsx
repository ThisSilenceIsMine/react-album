import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { auth } from 'api';
import { signOut, User } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { ThemeSwitch } from './ThemeSwitch';
import { getAvatar } from 'api/getAvatar';

export const Header = () => {
  const bg = useColorModeValue('white', 'whiteAlpha.200');

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

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

      <HStack>
        {user && <Avatar src={getAvatar(user)} size="sm" />}
        <ThemeSwitch />

        {user && (
          <IconButton
            onClick={() => signOut(auth)}
            icon={<CloseIcon />}
            aria-label="sign out"
          />
        )}
      </HStack>
    </Flex>
  );
};
