import moment from "moment-timezone";
import { NextApiRequest, NextApiResponse } from "next";
import {
  StravaActivity,
  StravaCombinedGraphData,
  StravaGraphData,
  StravaGraphPoint,
} from "@/types/strava";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let {
      query: { accessToken, refreshToken },
    } = req;

    if (!accessToken || !refreshToken) {
      return res.status(500).send("Failed to provide access or refresh token");
    }

    const stravaData = await getStravaData(
      accessToken as string,
      refreshToken as string
    );
    res.status(200).json(stravaData);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getStravaData = async (
  accessToken: string,
  refreshToken: string
) => {
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_SECRET) {
    throw new Error("No environment variables set for Strava API");
  }

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    refresh_token: refreshToken,
    client_secret: process.env.STRAVA_SECRET,
    grant_type: "refresh_token",
  });

  const headers = {
    Accept: "application/json, text/plain",
    "Content-Type": "application/json",
  };

  try {
    const reAuthorizeRes = await fetch("https://www.strava.com/oauth/token", {
      body: body,
      headers: headers,
      method: "post",
    });

    const reAuthorizeData = await reAuthorizeRes.json();

    const MonEpoch = getMonsEpoch();

    const activitiesRes = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${reAuthorizeData.access_token}&after=${MonEpoch}`
    );

    const activitiesJson: StravaActivity[] = await activitiesRes.json();

    const formattedStravaData = formatStravaData(activitiesJson);

    return formattedStravaData;
  } catch (err) {
    throw new Error(err as string);
  }
};

const getMonsEpoch = (): number => {
  let NZ = moment.tz(moment(), "Pacific/Auckland");
  const startOfWeek = NZ.startOf("isoWeek");

  const startOfWeekEpoch = startOfWeek.unix();

  return startOfWeekEpoch;
};

const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

// I want two lots of data (swimming and running)
const formatStravaData = (data: StravaActivity[]) => {
  const formattedStravaData = getEmptyStravaData();

  data.forEach((activity) => {
    const utcDate = new Date(activity.start_date);
    const localDate = new Date(utcDate);

    if (activity.type === "Run") {
      formattedStravaData.running.forEach((activityToFind) => {
        if (activityToFind.day === weekday[localDate.getDay()]) {
          activityToFind.distance +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (activityToFind.day === weekday[localDate.getDay()]) {
          activityToFind.run +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    } else if (activity.type === "Swim") {
      formattedStravaData.swimming.forEach((activityToFind) => {
        if (activityToFind.day === weekday[localDate.getDay()]) {
          activityToFind.distance +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
      formattedStravaData.combinedData.forEach((activityToFind) => {
        if (activityToFind.day === weekday[localDate.getDay()]) {
          activityToFind.swim +=
            Math.round((activity.distance / 1000) * 10) / 10;
        }
      });
    }
  });

  return formattedStravaData;
};

const getEmptyStravaData = (): StravaGraphData => {
  const formattedStravaData: StravaGraphData = {
    swimming: [] as StravaGraphPoint[],
    running: [] as StravaGraphPoint[],
    combinedData: [] as StravaCombinedGraphData[],
  };

  formattedStravaData.running.push({ day: "Mon", distance: 0 });
  formattedStravaData.running.push({ day: "Tues", distance: 0 });
  formattedStravaData.running.push({ day: "Wed", distance: 0 });
  formattedStravaData.running.push({ day: "Thur", distance: 0 });
  formattedStravaData.running.push({ day: "Fri", distance: 0 });
  formattedStravaData.running.push({ day: "Sat", distance: 0 });
  formattedStravaData.running.push({ day: "Sun", distance: 0 });
  formattedStravaData.swimming.push({ day: "Mon", distance: 0 });
  formattedStravaData.swimming.push({ day: "Tues", distance: 0 });
  formattedStravaData.swimming.push({ day: "Wed", distance: 0 });
  formattedStravaData.swimming.push({ day: "Thur", distance: 0 });
  formattedStravaData.swimming.push({ day: "Fri", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sat", distance: 0 });
  formattedStravaData.swimming.push({ day: "Sun", distance: 0 });
  formattedStravaData.combinedData.push({ day: "Mon", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Tues", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Wed", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Thur", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Fri", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Sat", run: 0, swim: 0 });
  formattedStravaData.combinedData.push({ day: "Sun", run: 0, swim: 0 });

  return formattedStravaData;
};
