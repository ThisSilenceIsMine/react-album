import { PropsWithChildren } from 'react';
import { ColumnContainerProps, Photo } from 'react-photo-album';

export const Column = <T extends Photo = Photo>({
  columnContainerProps,
  children,
}: PropsWithChildren<ColumnContainerProps<T>>) => (
  <div
    {...columnContainerProps}
    style={{ ...columnContainerProps.style, maxWidth: '50%' }}
  >
    {children}
  </div>
);
