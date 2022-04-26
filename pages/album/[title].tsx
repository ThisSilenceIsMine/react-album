import { Container, Text } from '@chakra-ui/react';
import { UploadModal } from 'components/Upload/UploadModal';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Photo as PhotoWrapper } from 'models/Photo/Photo';
import PhotoAlbum, { Photo } from 'react-photo-album';
import RednerPhoto from 'components/Photo';
import { Column } from 'components/Column';
import { getImages, uploadImage } from 'api/firebase/storage';
import { useUser } from 'lib/hooks/useUser';
import { PhotoView } from 'components/Gallery/PhotoView';

const Album = () => {
  const [photos, setPhotos] = useState<PhotoWrapper[]>([]);
  const [selected, setSelected] = useState<PhotoWrapper | null>(null);

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

  useEffect(() => {
    if (!selected) return;
  }, [selected]);

  return (
    <Container maxW="80%" h="full">
      Album: {album}
      <UploadModal onUpload={onUpload} />
      <PhotoAlbum
        layout="columns"
        photos={photos as Photo[]}
        renderPhoto={RednerPhoto}
        renderColumnContainer={Column}
        onClick={(e) =>
          setSelected(
            photos.find((p) => p.src === (e.target as any).src) ?? null
          )
        }
      />
      <PhotoView
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        image={selected}
      />
    </Container>
  );
};

export default Album;
