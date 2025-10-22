// Activity Timeline Component
// Visual timeline of user contributions and events

import React, { useState } from 'react';
import { Calendar, GitCommit, Users, Award, Code, MessageSquare, Heart, ExternalLink } from 'lucide-react';

export const ActivityTimeline = ({ activities, userInfo }) => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const activityTypes = {
    commit: { icon: GitCommit, color: 'blue', label: 'Contribution' },
    event: { icon: Calendar, color: 'green', label: 'Event' },
    community: { icon: Users, color: 'purple', label: 'Community' },
    achievement: { icon: Award, color: 'yellow', label: 'Achievement' },
    code_review: { icon: Code, color: 'indigo', label: 'Code Review' },
    comment: { icon: MessageSquare, color: 'pink', label: 'Comment' },
    like: { icon: Heart, color: 'red', label: 'Like' },
  };

  const filters = [
    { id: 'all', label: 'All Activity' },
    { id: 'commit', label: 'Contributions' },
    { id: 'event', label: 'Events' },
    { id: 'community', label: 'Community' },
    { id: 'achievement', label: 'Achievements' },
  ];

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' },
  ];

  // Sample activities data structure
  const sampleActivities = activities || [
    {
      id: 1,
      type: 'commit',
      title: 'Added new feature to dashboard',
      description: 'Implemented real-time data visualization',
      timestamp: new Date('2024-01-15T10:30:00'),
      repo: 'gdg-platform',
      url: '#',
      metadata: { additions: 145, deletions: 23 },
    },
    {
      id: 2,
      type: 'event',
      title: 'Attended DevFest 2024',
      description: 'Annual developer festival',
      timestamp: new Date('2024-01-14T09:00:00'),
      location: 'San Francisco, CA',
      attendees: 500,
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Unlocked "Rising Star" badge',
      description: 'Made 10 contributions',
      timestamp: new Date('2024-01-13T15:20:00'),
      points: 50,
    },
    {
      id: 4,
      type: 'community',
      title: 'Mentored 3 new members',
      description: 'Helped onboard new developers',
      timestamp: new Date('2024-01-12T14:00:00'),
      impact: 'high',
    },
    {
      id: 5,
      type: 'code_review',
      title: 'Reviewed PR #234',
      description: 'Authentication system improvements',
      timestamp: new Date('2024-01-11T11:45:00'),
      repo: 'gdg-auth',
      url: '#',
    },
  ];

  const filteredActivities = sampleActivities.filter((activity) => {
    if (filter !== 'all' && activity.type !== filter) return false;
    
    const activityDate = new Date(activity.timestamp);
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return activityDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return activityDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        return activityDate >= yearAgo;
      default:
        return true;
    }
  });

  const formatDate = (date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 30) return new Date(date).toLocaleDateString();
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-300 dark:border-green-700',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700',
      pink: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-300 dark:border-pink-700',
      red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-300 dark:border-red-700',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Activity Timeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your journey through contributions and achievements
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Activity Type Filter */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Time Range Filter */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        {/* Activities */}
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => {
            const activityType = activityTypes[activity.type] || activityTypes.commit;
            const Icon = activityType.icon;
            const colorClasses = getColorClasses(activityType.color);

            return (
              <div key={activity.id} className="relative pl-20">
                {/* Icon Circle */}
                <div
                  className={`absolute left-0 w-16 h-16 rounded-full border-4 ${colorClasses} 
                           flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClasses}`}>
                          {activityType.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(activity.timestamp)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    </div>
                    {activity.url && (
                      <a
                        href={activity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {activity.repo && (
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <Code className="w-3 h-3 mr-1" />
                        {activity.repo}
                      </span>
                    )}
                    {activity.location && (
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        📍 {activity.location}
                      </span>
                    )}
                    {activity.attendees && (
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {activity.attendees} attendees
                      </span>
                    )}
                    {activity.points && (
                      <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 flex items-center">
                        ⭐ +{activity.points} points
                      </span>
                    )}
                    {activity.metadata && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        +{activity.metadata.additions} -{activity.metadata.deletions}
                      </span>
                    )}
                    {activity.impact && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          activity.impact === 'high'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {activity.impact} impact
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Activity Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start contributing to see your timeline grow!
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredActivities.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Activity Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{filteredActivities.length}</div>
              <div className="text-sm opacity-90">Total Activities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {filteredActivities.filter((a) => a.type === 'commit').length}
              </div>
              <div className="text-sm opacity-90">Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {filteredActivities.filter((a) => a.type === 'event').length}
              </div>
              <div className="text-sm opacity-90">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {filteredActivities.filter((a) => a.type === 'achievement').length}
              </div>
              <div className="text-sm opacity-90">Achievements</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
