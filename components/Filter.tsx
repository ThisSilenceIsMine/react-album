import {
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  IconButton,
  HStack,
} from '@chakra-ui/react';

import { IPhotoWrapper, PhotoWrapper } from 'models/Photo/Photo';
import { useEffect, useState } from 'react';
import { FcClearFilters } from 'react-icons/fc';
import { RangeDatepicker } from './DatePicker';

export interface Filter extends Pick<IPhotoWrapper, 'title' | 'description'> {
  dates?: Date[];
}

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onFilter: (filter: Filter) => void;
};

export const Filter = ({ isOpen, onClose, onFilter }: Props) => {
  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    const cleared = Object.fromEntries(
      Object.entries(filter).filter(
        ([, value]) => value !== undefined && value !== null && value.length > 0
      )
    );
    onFilter(cleared);
  }, [filter, onFilter]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Drawer
      isOpen={Boolean(isOpen)}
      onClose={onClose}
      placement="left"
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack>
            <Text>Filters</Text>
            <IconButton
              onClick={() => setFilter({})}
              aria-label="clear filters"
              variant="ghost"
            >
              <FcClearFilters />
            </IconButton>
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              onChange={handleChange}
              value={filter.title ?? ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              onChange={handleChange}
              value={filter.description ?? ''}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <RangeDatepicker
              selectedDates={filter.dates ?? []}
              onDateChange={(dates) => {
                setFilter({ ...filter, dates });
              }}
            />
          </FormControl>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
