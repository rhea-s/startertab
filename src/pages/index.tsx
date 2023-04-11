import { TileGrid } from "@/components/grid/TileGrid";
import { TileLayoutActions } from "@/components/grid/TileLayoutActions";
import SettingsSideBar from "@/components/sidebar/SettingsSidebar";
import { ShowNewTabToast } from "@/components/toasts/ShowNewTabToast";
import { ShowUpdateToast } from "@/components/toasts/ShowUpdateToast";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { MobileWarning } from "@/components/ui/MobileWarning";
import { SettingsToggle } from "@/components/ui/SettingsToggle";
import {
  applyTheme,
  getCookieValue,
  getCurrentTheme,
  getNewSettingsFromLegacyTheme,
} from "@/helpers/settingsHelpers";
import { sidebarOpenAtom, tutorialProgressAtom } from "@/recoil/SidebarAtoms";
import { colorModeState, userSettingState } from "@/recoil/UserSettingsAtoms";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState, useSetRecoilState } from "recoil";

export type HomeProps = {
  cookies: string | undefined;
};

const Home: NextPage<HomeProps> = ({ cookies }) => {
  // Sidebar hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  // to highlight what tile you are looking to edit from the sidebar
  const [optionHovered, setOptionHovered] = useState<number | undefined>();

  // tutorial related state
  const [showingTutorial, setShowingTutorial] = useState(false);
  const [tutorialProgress, setTutorialProgress] =
    useRecoilState(tutorialProgressAtom);

  // need two states for mobile view because people can ignore the warning and continue
  const [isMobileView, setIsMobileView] = useState<boolean>(() => isMobile);
  const [showingMobileWarning, setShowingMobileWarning] = useState(false);

  const [settings, setSettings] = useRecoilState(userSettingState);
  const [isEditingTileGrid, setIsEditingTileGrid] = useState(false);

  const [colorMode] = useRecoilState(colorModeState);
  const setsidebarOpenAtom = useSetRecoilState(sidebarOpenAtom);

  useEffect(() => {
    if (isMobile) {
      const isMobileView = localStorage.getItem("isMobileView");
      setShowingMobileWarning(isMobileView == null);
    }
  }, [isMobileView]);

  useEffect(() => {
    const themeToChange = getCurrentTheme(settings, colorMode);
    applyTheme(themeToChange);
  }, [settings, colorMode]);

  // this is used to change tiles conditionally on the sidebar being open or tiles being edited
  useEffect(() => {
    setsidebarOpenAtom(isOpen || isEditingTileGrid);
  }, [isOpen, setsidebarOpenAtom, isEditingTileGrid]);

  const currentTheme = getCurrentTheme(settings, colorMode);

  // legacy settings need to be switched over to new format
  if ((currentTheme as any).tile1) {
    const newSettingsFormat = getNewSettingsFromLegacyTheme(settings);
    setSettings(newSettingsFormat);
  }
  const gridGap = currentTheme.globalSettings.gridGap;
  const settingsToggleColor = currentTheme.globalSettings.textColor;
  let toDisplay;

  if (showingMobileWarning) {
    toDisplay = <MobileWarning setIsMobileView={setIsMobileView} />;
  } else {
    toDisplay = (
      <Box width="100%" display="flex" minH="100%">
        {isOpen && (
          <SettingsSideBar
            onClose={onClose}
            isOpen={isOpen}
            setOptionHovered={setOptionHovered}
            setIsEditingTileGrid={setIsEditingTileGrid}
          />
        )}
        <>
          <Flex
            width="100%"
            overflow="auto"
            height="100%"
            onClick={() => setIsEditingTileGrid(false)}
          >
            <TileGrid
              isEditingTileGrid={isEditingTileGrid}
              setIsEditingTileGrid={setIsEditingTileGrid}
              optionHovered={optionHovered}
              gridGap={gridGap}
              layout={currentTheme.tileLayout}
              tiles={currentTheme.tiles}
            />
          </Flex>
        </>
      </Box>
    );
  }

  return (
    <>
      {toDisplay}
      {isEditingTileGrid && <TileLayoutActions colorMode={colorMode} />}
      {!isOpen && !showingMobileWarning && (
        <SettingsToggle
          onOpen={() => {
            onOpen();
          }}
          color={settingsToggleColor}
        />
      )}
      <ShowUpdateToast />
      <ShowNewTabToast setShowingTutorial={false} />
    </>
  );
};

export default Home;
