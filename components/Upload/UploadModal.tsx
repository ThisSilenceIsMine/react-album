import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { Image } from '@chakra-ui/react';
import { Photo } from 'models/Photo/Photo';

import { useCallback, useState } from 'react';
import { FcUpload } from 'react-icons/fc';
import { UploadDropzone } from './UploadDropzone';

type Props = {
  onUpload?: (image: Photo) => void;
};

export const UploadModal = ({ onUpload }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  const handleClose = useCallback(() => {
    setPreview(null);
    setFile(null);
    setTitle('');
    onClose();
  }, [onClose, setPreview]);

  const handleUpload = useCallback(
    (file: File) => {
      if (!file) return;
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
    [setFile, setPreview]
  );

  return (
    <>
      <IconButton
        icon={<FcUpload style={{ width: '70%', height: '70%' }} />}
        aria-label="upload"
        variant="ghost"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="1em">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <UploadDropzone onUpload={handleUpload} />
            {preview && (
              <Image
                src={preview}
                alt=""
                maxW="90%"
                mt="4"
                marginInline="auto"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              mr={'3'}
              onClick={async () => {
                if (onUpload && file)
                  onUpload((await Photo.fromFile(file)).setTitle(title));
                handleClose();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
