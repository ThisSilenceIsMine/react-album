import { Container, SimpleGrid } from '@chakra-ui/react';
import { AlbumCard } from 'components/Album/AlbumCard';
import { CreateAlbum } from 'components/Album/CreateAlbum';
import { useUser } from 'lib/hooks/useUser';
import { createAlbum, subscribeToUserAlbums } from 'models/Album';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const user = useUser();

  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsubscribe = subscribeToUserAlbums(user, (albums) => {
      setAlbums(albums);
    });

    return unsubscribe;
  }, [user]);

  const onCreateAlbum = (title: string) => {
    if (user) {
      createAlbum(user, title);
    }
  };

  return (
    <Container maxW="80%" h="full">
      <SimpleGrid mt="12" columns={[2, 4, 8]} spacing="4">
        <CreateAlbum onCreate={onCreateAlbum} />
        {albums.map((album) => (
          <AlbumCard key={album.id} title={album.title} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
