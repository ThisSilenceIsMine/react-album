import { Container, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { UploadModal } from 'components/Upload/UploadModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PhotoWrapper } from 'models/Photo/Photo';
import PhotoAlbum, { Photo } from 'react-photo-album';
import RednerPhoto from 'components/Photo';
import { Column } from 'components/Column';
import { getImages, uploadImage } from 'api/firebase/storage';
import { useUser } from 'lib/hooks/useUser';
import { PhotoView } from 'components/Gallery/PhotoView';
import { Filter } from 'components/Filter';
import { FcFilledFilter } from 'react-icons/fc';
import { DateTime } from 'luxon';

const Album = () => {
  const [photos, setPhotos] = useState<PhotoWrapper[]>([]);
  const [selected, setSelected] = useState<PhotoWrapper | null>(null);
  const [filter, setFilter] = useState<Filter>({});
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { title: album } = useRouter().query;
  const user = useUser();

  const filteredPhotos = photos.filter((photo) => {
    return Object.entries(filter).every(([key, value]) => {
      if (key === 'title' || key === 'description') {
        return photo[key]?.includes(value);
      }
      //It is dates then?

      const dateRange = value.map((x: Date) =>
        DateTime.fromISO(x.toISOString()).toMillis()
      );
      //Check if photo createdAt is between the range
      if (!photo.createdAt) return true;
      return photo.createdAt >= dateRange[0] && photo.createdAt <= dateRange[1];
    });
  });

  const onUpload = async (image: PhotoWrapper) => {
    if (!album || Array.isArray(album) || !user) return;
    uploadImage(user, album, image);
  };

  useEffect(() => {
    if (!album || Array.isArray(album) || !user) return;
    getImages(user, album, async (photos) => {
      const res = photos.map((p) =>
        PhotoWrapper.fromUrl(p.url).then((photo) =>
          photo.setProperties({
            title: p.title,
            description: p.description,
            createdAt: p.createdAt,
          })
        )
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
      <IconButton variant="ghost" aria-label="open filters" onClick={onOpen}>
        <FcFilledFilter />
      </IconButton>
      <Filter isOpen={isOpen} onClose={onClose} onFilter={setFilter} />
      <PhotoAlbum
        layout="columns"
        photos={filteredPhotos as Photo[]}
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
