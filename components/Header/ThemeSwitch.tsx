import { FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormControl display="flex" alignItems="center" width="fit-content">
      <FormLabel htmlFor="themeToggle" mb="0" textTransform="capitalize">
        {colorMode}
      </FormLabel>
      <Switch
        id="themeToggle"
        isChecked={colorMode === 'dark'}
        onChange={() => toggleColorMode()}
      />
    </FormControl>
  );
};
