import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  ModalBody,
  IconButton,
  Text,
  HStack,
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { PhotoWrapper } from 'models/Photo/Photo';
import { FcDownload } from 'react-icons/fc';
import { DateTime } from 'luxon';

type Props = {
  image: PhotoWrapper | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PhotoView = ({ isOpen, onClose, image }: Props) => {
  if (!image) return null;
  const createdAt =
    image.createdAt &&
    DateTime.fromMillis(image.createdAt).toLocaleString(DateTime.DATETIME_MED);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="space-between">
          <Text>{image.title}</Text>
          <IconButton
            onClick={() => saveAs(image.src, image.file?.name || image.title)}
            aria-label="download"
            variant="ghost"
          >
            <FcDownload />
          </IconButton>
        </ModalHeader>
        <Image src={image.src} alt={image.title} />
        <ModalBody>
          <Text color="gray.500" fontSize="sm">
            {createdAt}
          </Text>
          <Text>{image.description}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
