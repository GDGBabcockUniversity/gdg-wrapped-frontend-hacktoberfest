interface MostActiveGroup {
  group: string;
  number_of_messages: number;
}

interface MostActiveTime {
  hour: number;
  weekday: string;
}

interface MostActiveMembers {
  [key: string]: number;
}

interface MemberActivity {
  phone_number: string;
  message_count: number;
  group_chat: string;
}

export interface Data {
  most_active_group: MostActiveGroup;
  most_active_time: MostActiveTime;
  most_active_members: MostActiveMembers;
  most_active_members_per_track: MemberActivity[];
}

export interface SuccessGeneralResponse {
  data: Data;
  success: boolean;
}

export interface ErrorGeneralResponse {
  error: string;
  success: boolean;
}
