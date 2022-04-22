import { Container } from '@chakra-ui/react';
import { UploadModal } from 'components/Upload/UploadModal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Photo as PhotoWrapper } from 'models/Photo/Photo';
import { Photo } from 'react-photo-album';
import RednerPhoto from 'components/Photo';
import PhotoAlbum from 'react-photo-album';
import { Column } from 'components/Column';

const Album = () => {
  const { id } = useRouter().query;
  const [photos, setPhotos] = useState<PhotoWrapper[]>([]);

  const onUpload = async (image: PhotoWrapper) => {
    console.log('uploading image');
    setPhotos([...photos, image]);
  };

  return (
    <Container maxW="80%" h="full">
      Album: {id}
      <UploadModal onUpload={onUpload} />
      <PhotoAlbum
        layout="columns"
        photos={photos as Photo[]}
        renderPhoto={RednerPhoto}
        renderColumnContainer={Column}
      />
    </Container>
  );
};

export default Album;
