import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ThemePickerBubble = (props: BoxProps) => {
  return (
    <Box
      borderRadius="50%"
      width="5"
      height="5"
      boxShadow={"2px 2px 1px rgba(0,0,0,.15)"}
      transition="all .2s"
      _hover={{ cursor: "pointer", transform: "translateY(-2px)" }}
      {...props}
    />
  );
};

const ThemePickerTile: React.FC = () => {
  const settings = useRecoilValue(userSettingState);
  const setColorModeState = useSetRecoilState(colorModeState);

  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Flex
        width="100%"
        py="25px"
        px="55px"
        flexWrap="wrap"
        justifyContent="center"
      >
        {settings.themes.map((theme) => {
          if (theme.themeName !== "Global Settings") {
            return (
              <ThemePickerBubble
                key={theme.themeName}
                justifySelf="center"
                marginX="5px"
                marginY="7px"
                onClick={() => {
                  setColorModeState(theme.themeName);
                }}
                bg={theme.globalSettings.themePickerBubbleColor}
              />
            );
          }
        })}
      </Flex>
    </Flex>
  );
};

export default ThemePickerTile;
