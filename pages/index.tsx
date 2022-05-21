import { Container, SimpleGrid } from '@chakra-ui/react';
import { AlbumCard } from 'components/Album/AlbumCard';

import { CreateAlbum } from 'components/Album/CreateAlbum';
import { useUser } from 'lib/hooks/useUser';
import { Album, createAlbum, subscribeToUserAlbums } from 'models/Album/Album';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Home: NextPage = () => {
  const user = useUser();
  const router = useRouter();

  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    let isMounted = true;

    const unsubscribe = subscribeToUserAlbums(user, async (albums) => {
      if (isMounted) {
        setAlbums(await albums);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user]);

  const onCreateAlbum = (title: string) => {
    if (user) {
      createAlbum(user, title)
        .then((ref) => {
          if (ref) {
            toast.success('Album created successfully', { duration: 3000 });
          }
        })
        .catch(() => {
          toast.error('Something went wrong', { duration: 3000 });
        });
    }
  };

  return (
    <Container maxW="80%" h="full">
      <SimpleGrid pt="12" columns={[2, 4, 6]} spacing="4">
        <CreateAlbum onCreate={onCreateAlbum} />
        {albums.map(({ id, title, image }) => (
          <AlbumCard
            key={id}
            src={image}
            title={title}
            onClick={() => router.push(`/album/${id}`)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
