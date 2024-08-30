import localStorage from "@/storage/localStorage";
import { USER_TAOKEN_LC_KEY } from "@/common/const";

import { getAfterMinutesTimestamp } from "../date/dateTools";
import { timeIsAfter, diffTimeMinutes } from "../date/dateDiff";

export function getUserToken() {
  const userToken = localStorage.get(USER_TAOKEN_LC_KEY);
  // data example
  // {
  // 	"accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9",
  // 	"tokenType": "Bearer",
  // 	"expiresAt": 1659140921563
  // }
  if (userToken) {
    const isInDate = checkTokenIsInDate(userToken, 0);
    if (isInDate) {
      return userToken;
    } else {
      setUserToken("");
      return null;
    }
  }
  return null;
}

export function setUserToken(userToken: any) {
  return localStorage.set(USER_TAOKEN_LC_KEY, userToken);
}

export function removeUserToken(userToken: any) {
  return localStorage.delete(USER_TAOKEN_LC_KEY);
}

export function checkUserToken(minutes: number = 0) {
  const userToken = getUserToken();
  if (userToken) {
    return checkTokenIsInDate(userToken, minutes);
  } else {
    return false;
  }
}

export function getUserTokenValidMinutes() {
  const userToken = getUserToken();
  if (userToken) {
    const { expiresAt } = userToken;
    return diffTimeMinutes([], expiresAt);
  } else {
    return 0;
  }
}

//  较验 token 是不是在当前时间之后minutes分钟内也有效
function checkTokenIsInDate(token: any, minutes: number) {
  const { expiresAt } = token;
  if (expiresAt) {
    const timeNow = getAfterMinutesTimestamp([], minutes);
    return timeIsAfter(expiresAt, timeNow);
  } else {
    return false;
  }
}
