import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  ModalBody,
  IconButton,
} from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import { Photo } from 'models/Photo/Photo';
import { FcDownload } from 'react-icons/fc';

type Props = {
  image: Photo | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PhotoView = ({ isOpen, onClose, image }: Props) => {
  if (!image) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {image.title}
          <IconButton
            onClick={() => saveAs(image.src, image.file?.name || image.title)}
            aria-label="download"
          >
            <FcDownload />
          </IconButton>
        </ModalHeader>
        <Image src={image.src} alt={image.title} />
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit tempora
          repellendus mollitia, ut quia explicabo saepe, laudantium sequi ab
          maiores a magni quam, nostrum impedit iusto aperiam aliquid ducimus.
          Sunt. Aliquam exercitationem sit possimus voluptates, provident a?
          Quaerat impedit deserunt recusandae quod, aperiam autem quas. Illo
          totam quod non cupiditate officiis sequi ea nulla similique, modi
          voluptatibus velit, itaque ipsam? Culpa saepe a quam doloribus,
          quaerat sunt veniam adipisci exercitationem dolorum harum animi ut ab
          facilis vero vel earum nostrum totam debitis? Optio dolore cumque, ut
          eligendi odio amet excepturi. Aperiam libero a consectetur accusantium
          tempora, hic non, sapiente officiis quod deserunt unde animi ea est?
          Exercitationem, quas ipsa nulla impedit quibusdam soluta neque quasi
          nam ex? Unde, soluta! Delectus!
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
