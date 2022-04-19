import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import validator from 'validator';
import { register } from 'api/firebase/auth/register';
import { NextPage } from 'next';
import { useState } from 'react';
import { useValidatedState } from 'lib/hooks/useValidatedState';
import { signInWithGoogle } from 'api/firebase/auth/google';

import { useRouter } from 'next/router';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { GoogleButton } from 'components/GoogleButton';

const Register: NextPage = () => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const [email, setEmail, emailError] = useValidatedState('', [
    { validate: validator.isEmail, error: 'Invalid email' },
  ]);
  const [password, setPassword, passwordError] = useValidatedState('', [
    {
      validate: (value) => value.length >= 6,
      error: 'Password must be at least 6 characters',
    },
    {
      validate: (value) => value.length <= 72,
      error: 'Password must be less than 72 characters',
    },
  ]);

  const [repeatPassword, setRepeatPassword, repeatPasswordError] =
    useValidatedState('', [
      {
        validate: (value) => value === password,
        error: 'Passwords do not match',
      },
    ]);

  const allValid = !emailError && !passwordError && !repeatPasswordError;

  const onRegisterWithEmail = () =>
    allValid && register(email, password).then(() => router.push('/'));

  const onSignUpWithGoogle = () =>
    signInWithGoogle().then(() => router.push('/'));

  return (
    <Container height={'full'}>
      <Center height={'full'}>
        <VStack gap="4px">
          <Heading marginBottom="12">Register</Heading>
          <GoogleButton onClick={onSignUpWithGoogle} />
          <FormControl isInvalid={!!email && !!emailError} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder={'mail@mail.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!password && !!passwordError} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                placeholder="password"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="3rem">
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
            {passwordError && (
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            isInvalid={!!repeatPassword && !!repeatPasswordError}
            isRequired
          >
            <FormLabel>Repeat Password</FormLabel>
            <Input
              pr="4.5rem"
              placeholder="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {repeatPasswordError && (
              <FormErrorMessage>{repeatPasswordError}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            width="full"
            onClick={onRegisterWithEmail}
            disabled={!allValid}
          >
            Register
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Register;
