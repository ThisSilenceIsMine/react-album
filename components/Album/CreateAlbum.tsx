import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Box,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  onCreate?: (title: string) => void;
};

export const CreateAlbum = ({ onCreate }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState<string>('');

  const onClickHandler = () => {
    onOpen();
  };

  const onCreateHandler = () => {
    if (title) {
      onClose();
      setTitle('');
      onCreate && onCreate(title);
    }
  };

  return (
    <VStack w="40" h="48">
      <Box
        display={'grid'}
        placeContent={'center'}
        border="2px solid white"
        w="24"
        h="32"
        cursor={'pointer'}
        onClick={onClickHandler}
      >
        <AddIcon />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select title for a new album</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Album title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summer photos 2006"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={!title} onClick={onCreateHandler}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Text>Create album</Text>
    </VStack>
  );
};
