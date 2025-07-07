
export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  twitterUsername?: string;
  twitterId?: string;
}

export interface ScheduledTweet {
  id: string;
  content: string;
  scheduledFor: Date;
  isPosted: boolean;
  postedAt?: Date;
  isThread: boolean;
  threadOrder?: number;
  parentTweetId?: string;
  metadata?: any;
}

export interface TweetAnalysis {
  id: string;
  totalTweets: number;
  avgEngagement?: number;
  commonHashtags?: any;
  writingStyle?: any;
  topicAnalysis?: any;
  sentimentScore?: number;
  postingPattern?: any;
  analyzedAt: Date;
}

export interface ProfileOptimization {
  id: string;
  suggestionType: 'bio' | 'posting_strategy' | 'engagement_tips';
  title: string;
  description: string;
  isApplied: boolean;
  priority: number;
  createdAt: Date;
}

export interface UserSettings {
  id: string;
  twitterApiKey?: string;
  twitterApiSecret?: string;
  twitterAccessToken?: string;
  twitterTokenSecret?: string;
  geminiApiKey?: string;
  defaultTweetStyle: string;
  autoScheduleOptimal: boolean;
  notificationsEnabled: boolean;
  timezone: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: any;
  isActive?: boolean;
}
