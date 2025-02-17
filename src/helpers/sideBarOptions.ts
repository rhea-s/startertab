import { Option } from "@/types";

export const globalSettingsOptions: Option[] = [
  {
    title: "All Tiles Background Color",
    subTitle:
      "Controls the background color of all the tiles at once, leave blank if you want to customize tile by tile",
    localStorageId: "globalTileBackgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "All Tiles Text Color",
    subTitle:
      "Controls the text color of all the tiles at once, leave blank if you want to customize tile by tile",
    localStorageId: "globalTileTextColor",
    optionType: "ColorPicker",
  },
  {
    title: "Background",
    subTitle: "Controls the theme background of the main page",
    localStorageId: "backgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "Border",
    subTitle: "Controls the border of all the tiles",
    localStorageId: "tileBorder",
    optionType: "BorderSelect",
  },
  {
    title: "Border Color",
    subTitle:
      "Controls the color of the border for all of the tiles, this will override the natural border color which is the text color of the tile",
    localStorageId: "borderColor",
    optionType: "ColorPicker",
  },
  {
    title: "Border Radius",
    subTitle: "Controls the border radius of all the tiles",
    localStorageId: "borderRadius",
    optionType: "BorderRadiusInput",
  },
  {
    title: "Drop shadow",
    subTitle: "Controls the drop shadow of all the tiles",
    localStorageId: "dropShadow",
    optionType: "DropShadowInput",
  },
  {
    title: "Grid Gap",
    subTitle: "Controls the grip gap of all the tiles",
    localStorageId: "gridGap",
    optionType: "GridGapInput",
  },
  {
    title: "Reset All and Randomize Buttons",
    subTitle: "Won't be display don't worry about it",
    localStorageId: "null",
    optionType: "RandomizeColors",
  },
];

export const sideBarSmallTileOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    optionType: "ColorPicker",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    optionType: "SmallTileTypePicker",
  },
  {
    title: "City for weather",
    subTitle: "Name of the city you want the weather for",
    localStorageId: "cityForWeather",
    optionType: "CityInputForWeather",
  },
  {
    title: "Stock ticker",
    subTitle: "Ticker that you want to see the stock info for, in capitals",
    localStorageId: "stockName",
    optionType: "SmallStockInput",
  },
  {
    title: "Title for Favorites",
    subTitle: "Optional title for the favorites tile",
    localStorageId: "favoriteLinksTitle",
    optionType: "TitleForFavorites",
  },
];

export const sideBarMediumTileOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    optionType: "ColorPicker",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    optionType: "MediumTileTypePicker",
  },
  {
    title: "Bonsai base color",
    subTitle: "Color of the bonsai base",
    localStorageId: "bonsaiBaseColor",
    optionType: "ColorPicker",
  },
  {
    title: "Bonsai trunk color",
    subTitle: "Color of the bonsai trunk",
    localStorageId: "bonsaiTrunkColor",
    optionType: "ColorPicker",
  },
  {
    title: "Reddit feed subreddit",
    subTitle: "Subreddit you want to see the posts from",
    localStorageId: "subReddit",
    optionType: "SubRedditPicker",
  },
  {
    title: "Hacker News Feed Type",
    subTitle: "What type of feed do you want to see from Hacker News?",
    localStorageId: "hackerNewsFeedType",
    optionType: "HackerNewsFeedType",
  },
  {
    title: "Spotify Top Artists Time Length",
    subTitle: "How long back do you want to search over?",
    localStorageId: "spotifyArtistSearchTimeLength",
    optionType: "SpotifyTopArtistsTimeLength",
  },
  {
    title: "Title for Favorites",
    subTitle: "Optional title for the favorites tile",
    localStorageId: "favoriteLinksTitle",
    optionType: "TitleForFavorites",
  },
  {
    title: "Title for RSS Feed",
    subTitle: "Optional title for the RSS feeds tile",
    localStorageId: "rssFeedTitle",
    optionType: "TitleForRSSFeed",
  },
];

export const sideBarLargeTileOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    optionType: "ColorPicker",
  },
  {
    title: "Type of tile",
    subTitle: "Type of tile you want to display",
    localStorageId: "tileType",
    optionType: "LargeTileTypePicker",
  },
  {
    title: "City for UV data",
    subTitle: "Name of the city you want the UV data for",
    localStorageId: "cityForUv",
    optionType: "CityInputForUV",
  },
  {
    title: "City for weather forecast",
    subTitle: "Name of the city you want the weather forecast for",
    localStorageId: "cityForWeather",
    optionType: "CityInputForWeather",
  },
  {
    title: "Title for Favorites",
    subTitle: "Optional title for the favorites tile",
    localStorageId: "favoriteLinksTitle",
    optionType: "TitleForFavorites",
  },
  {
    title: "Title for RSS Feed",
    subTitle: "Optional title for the RSS feeds tile",
    localStorageId: "rssFeedTitle",
    optionType: "TitleForRSSFeed",
  },
];

export const sideBarLongTileOptions: Option[] = [
  {
    title: "Background color",
    subTitle: "Background color of the tile",
    localStorageId: "backgroundColor",
    optionType: "ColorPicker",
  },
  {
    title: "Text color",
    subTitle: "Text color of the tile",
    localStorageId: "textColor",
    optionType: "ColorPicker",
  },
  {
    title: "Type of tile",
    subTitle: "Choose what you want this tile to display",
    localStorageId: "tileType",
    optionType: "LongTileTypePicker",
  },
];
