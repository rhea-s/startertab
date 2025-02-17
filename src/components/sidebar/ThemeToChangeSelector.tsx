import { tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { colorModeState } from "@/recoil/UserSettingsAtoms";
import { Flex, Select } from "@chakra-ui/react";
import Router from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { OutlinedButton } from "../ui/OutlinedButton";

interface ThemeToChangeSelectorProps {
  themes: string[];
  textColor: string;
}
const optionsStyles = {
  color: "white",
  background: "var(--chakra-colors-gray-600)",
};

export const ThemeToChangeSelector: React.FC<ThemeToChangeSelectorProps> = ({
  themes,
  textColor,
}) => {
  const [colorMode, setColorModeState] = useRecoilState(colorModeState);
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  const onThemeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // for the tutorial, if we change the theme we want to progress the tutorial
    setTutorialProgress((prevState) => (prevState === 2 ? 3 : prevState));
    setColorModeState(e.target.value);
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt="3"
      pb="4"
      color={textColor}
    >
      <Select
        value={colorMode}
        width="75%"
        onChange={onThemeSelectChange}
        outline={`1px solid ${textColor}`}
        _focus={{ border: `1px solid ${textColor}` }}
      >
        {themes.map((theme) => (
          <option key={theme} value={theme} style={optionsStyles}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </Select>
      <OutlinedButton
        mr="1"
        borderColor={textColor}
        borderWidth="1px"
        onClick={() => Router.push("/newTheme")}
        isDisabled={tutorialProgress === 2 || tutorialProgress === 3}
        paddingY="20px"
      >
        +
      </OutlinedButton>
    </Flex>
  );
};
