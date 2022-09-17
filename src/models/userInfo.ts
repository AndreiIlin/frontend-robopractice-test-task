export interface Day {
  Date: string;
  End: string;
  Start: string;
}

export interface FormattedDay {
  time: number;
  day: number
}

export interface UserInfo {
  id: number;
  Fullname: string;
  Days: Day[];
}

export interface FormattedUserInfo {
  id: number;
  username: string;
  days: FormattedDay[];
  total: number;
}
