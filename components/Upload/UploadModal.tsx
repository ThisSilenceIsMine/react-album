import {
  Button,
  IconButton,
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

import { useCallback, useEffect, useState } from 'react';
import { FcUpload } from 'react-icons/fc';
import { UploadDropzone } from './UploadDropzone';

type Props = {
  onUpload?: (image: File) => void;
};

export const UploadModal = ({ onUpload }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleClose = useCallback(() => {
    setPreview(null);
    setFile(null);
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
          <ModalBody>
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
              onClick={() => {
                if (onUpload && file) onUpload(file);
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
