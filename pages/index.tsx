import { Container, SimpleGrid } from '@chakra-ui/react';
import { CreateAlbum } from 'components/CreateAlbum';
import { useUser } from 'lib/hooks/useUser';
import { createAlbum, getUserAlbums } from 'models/Album';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const user = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    getUserAlbums(user).then((snapshot) => {
      // console.log(snapshot);

      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
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
      </SimpleGrid>
    </Container>
  );
};

export default Home;
