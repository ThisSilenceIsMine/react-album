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
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { PhotoWrapper } from 'models/Photo/Photo';
import { FcDownload, FcEditImage } from 'react-icons/fc';
import { DateTime } from 'luxon';

type Props = {
  image: PhotoWrapper | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: Partial<{ title: string; description: string }>) => void;
};

export const PhotoView = ({ isOpen, onClose, image, onUpdate }: Props) => {
  if (!image) return null;
  const createdAt =
    image.createdAt &&
    DateTime.fromMillis(image.createdAt).toLocaleString(DateTime.DATETIME_MED);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex">
          <Editable
            defaultValue={image.title}
            onSubmit={(val) => onUpdate({ title: val })}
          >
            <EditableInput autoFocus={false} /> <EditablePreview />
          </Editable>

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
          <Editable
            defaultValue={image.description}
            onSubmit={(val) => onUpdate({ description: val })}
          >
            <EditableTextarea />
            <EditablePreview />
          </Editable>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
