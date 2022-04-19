import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

type Props = {
  onClick?: () => void;
};

export const GoogleButton = ({ onClick }: Props) => {
  return (
    <Button
      w={'full'}
      variant={'outline'}
      leftIcon={<FcGoogle />}
      onClick={onClick}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
};
