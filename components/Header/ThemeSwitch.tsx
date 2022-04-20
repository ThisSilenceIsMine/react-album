import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Switch color mode"
      onClick={toggleColorMode}
      variant={'ghost'}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    />
  );
};
