import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { signInWithGoogle } from 'api/firebase/auth/google';
import { signIn } from 'api/firebase/auth/signIn';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const onRegister = () => router.push('/auth/register');

  const onLogin = () => signIn(email, password).then(() => router.push('/'));

  const onLoginWithGoogle = () =>
    signInWithGoogle().then(() => router.push('/'));

  return (
    <Container height={'full'}>
      <Center height={'full'}>
        <VStack gap="4px">
          <Heading marginBottom="12">Login</Heading>
          <Button variant="solid" width="full" onClick={onLoginWithGoogle}>
            Google
          </Button>
          <Input
            placeholder={'mail@mail.com'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup>
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                aria-label="Show/Hide password"
                h="1.75rem"
                variant="ghost"
                size="sm"
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => setShow((c) => !c)}
              />
            </InputRightElement>
          </InputGroup>

          <ButtonGroup>
            <Button onClick={onLogin}>Login</Button>
            <Button variant="outline" onClick={onRegister}>
              Register
            </Button>
          </ButtonGroup>
        </VStack>
      </Center>
    </Container>
  );
};

export default Login;
