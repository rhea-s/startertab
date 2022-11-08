import { TextFeedSkeleton } from "@/components/skeletons/TextFeedSkeleton";
import { HackerNewsLogo } from "@/components/ui/HackerNewsLogo";
import { OptionBadge } from "@/components/ui/OptionBadge";
import { calculateTimeAgoString } from "@/helpers/tileHelpers";
import { TileId } from "@/types";
import { HackerNewsLinkHolder } from "@/types/hackernews";
import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { redditFeedSelector } from "../recoil/UserSettingsSelectors";

type PageProps = {
  tileId: TileId;
};

type HackerNewsFeed = "Ask" | "Top" | "Show";

const fetcher = async (hackerNewsFeed: string) => {
  const res = await fetch(`/api/hackerNews?hackerNewsFeed=${hackerNewsFeed}`);
  const data = (await res.json()) as HackerNewsLinkHolder[];

  return data;
};

export const HackerNewsFeedTile: React.FC<PageProps> = ({ tileId }) => {
  const [hackerNewsFeed, setHackerNewsFeed] = useRecoilState(
    redditFeedSelector(tileId)
  ) as [string | undefined, SetterOrUpdater<string | undefined>];

  const { data, error, isLoading } = useQuery(
    ["hackerNewsFeed", hackerNewsFeed],
    () => fetcher(hackerNewsFeed!),
    {
      enabled: hackerNewsFeed != undefined && hackerNewsFeed !== "",
    }
  );

  const color = `var(--text-color-${tileId})`;
  const underlineColor = color;

  useEffect(() => {
    if (!hackerNewsFeed) {
      setHackerNewsFeed("Top");
    }
  }, [hackerNewsFeed, setHackerNewsFeed]);

  const changeFeedType = (feed: HackerNewsFeed) => {
    setHackerNewsFeed(feed);
  };

  let display;

  if (isLoading) {
    display = <TextFeedSkeleton />;
  } else if (data && Array.isArray(data)) {
    display = (
      <UnorderedList margin="0" mt="4">
        {data?.map((link) => (
          <ListItem listStyleType="none" key={link.time + link.author} mt="3">
            <Link href={link.url}>{link.title}</Link>
            <Flex justifyContent="space-between">
              <Text fontSize="xs">
                {calculateTimeAgoString(new Date(link.time * 1000))}
              </Text>
              <Text fontSize="xs">{link.author}</Text>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    );
  } else if (error) {
    display = (
      <Text p="4">
        There was an error fetching HackerNews data, please try again later!
      </Text>
    );
  }

  return (
    <Box px="4" color={color} position="relative">
      <Heading mt="3" fontSize="xl">
        <Link
          href="https://news.ycombinator.com"
          aria-label="Link to Hacker News"
        >
          Hacker News Feed
        </Link>
      </Heading>
      <Box position="absolute" right="4" top="4" height="10px" width="20px">
        <HackerNewsLogo color={color} />
      </Box>
      <Box w="80%" bg="white" height="1px" mt="2" bgColor={underlineColor} />
      {display}
      <Box height="1px" width="100%" bg={color} mt="3" />

      <Box width="100%" mt="4" mb="4" textAlign="center">
        <OptionBadge onClick={() => changeFeedType("Top")} color={color}>
          Top Stories
        </OptionBadge>
        <OptionBadge
          onClick={() => changeFeedType("Show")}
          color={color}
          ml="2"
          mr="2"
        >
          Show Stories
        </OptionBadge>
        <OptionBadge onClick={() => changeFeedType("Ask")} color={color} mt="2">
          Ask Stories
        </OptionBadge>
      </Box>
    </Box>
  );
};
