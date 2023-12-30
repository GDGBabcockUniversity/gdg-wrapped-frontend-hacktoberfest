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
  name: string;
}

export interface Data {
  most_active_group: MostActiveGroup;
  most_active_time: MostActiveTime;
  most_active_members: MostActiveMembers[];
  most_active_members_per_track: MemberActivity[];
}

export interface SuccessGeneralResponse {
  data?: Data;
  success: boolean;
  error?: string;
}

export interface DataMember {
  number_of_messages_sent: number;
  percentile_messages: number;
  messages_top_perc: string;
  number_of_links: number;
  percentile_links: number;
  resources_top_perc: string;
  number_of_questions: number;
  percentile_questions: number;
  questions_top_perc: string;
  message_impact_score: number;
  percentile_impact: number;
  message_impact_top_perc: string;
  peak_weekday: number;
  peak_hour: number;
  peak_day_and_hour: string;
}

export interface SuccessMemberResponse {
  data?: DataMember;
  success: boolean;
  error?: string;
}
