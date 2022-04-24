import { Container, Text } from '@chakra-ui/react';
import { UploadModal } from 'components/Upload/UploadModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Photo as PhotoWrapper } from 'models/Photo/Photo';
import PhotoAlbum, { Photo } from 'react-photo-album';
import RednerPhoto from 'components/Photo';
import { Column } from 'components/Column';
import { getImages, uploadImage } from 'api/firebase/storage';
import { useUser } from 'lib/hooks/useUser';

const Album = () => {
  const [photos, setPhotos] = useState<PhotoWrapper[]>([]);
  const { title: album } = useRouter().query;
  const user = useUser();

  const onUpload = async (image: PhotoWrapper) => {
    if (!album || Array.isArray(album) || !user) return;
    uploadImage(user, album, image);
  };

  useEffect(() => {
    if (!album || Array.isArray(album) || !user) return;
    getImages(user, album, async (photos) => {
      const res = photos.map((p) =>
        PhotoWrapper.fromUrl(p.url).then((photo) => photo.setTitle(p.title))
      );

      setPhotos(await Promise.all(res));
    });
  }, [user, album]);

  return (
    <Container maxW="80%" h="full">
      Album: {album}
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
