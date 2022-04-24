import { RenderPhoto } from 'react-photo-album';
import { Image, Tooltip } from '@chakra-ui/react';

export const Photo: RenderPhoto = (props) => {
  const { src, alt, srcSet, sizes, ...rest } = props.imageProps;

  return (
    <Tooltip hasArrow bg="teal.500" label={rest.title}>
      <Image
        src={src}
        alt={''}
        {...(srcSet ? { srcSet, sizes } : null)}
        {...rest}
      />
    </Tooltip>
  );
};

export default Photo;
