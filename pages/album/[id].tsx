import { Container } from '@chakra-ui/react';
import { UploadModal } from 'components/Upload/UploadModal';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Photo } from 'models/Photo/Photo';
import PhotoAlbum from 'react-photo-album';

const Album = () => {
  const { id } = useRouter().query;
  const [photos, setPhotos] = useState<Photo[]>([]);

  const onUpload = async (image: File) => {
    console.log('uploading image');
    setPhotos([...photos, await Photo.fromFile(image)]);
  };

  return (
    <Container maxW="80%" h="full">
      Album: {id}
      <UploadModal onUpload={onUpload} />
      <PhotoAlbum layout="columns" photos={photos} />
    </Container>
  );
};

export default Album;
