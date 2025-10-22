// Leaderboard Component
// Shows top contributors and community engagement

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Star } from 'lucide-react';

export const Leaderboard = ({ contributors, timeframe = 'all' }) => {
  const [sortBy, setSortBy] = useState('contributions');
  const [filteredData, setFilteredData] = useState([]);

  const sortOptions = [
    { id: 'contributions', label: 'Total Contributions', icon: TrendingUp },
    { id: 'events', label: 'Events Attended', icon: Users },
    { id: 'streak', label: 'Longest Streak', icon: Award },
    { id: 'rating', label: 'Community Rating', icon: Star },
  ];

  useEffect(() => {
    if (!contributors) return;

    let sorted = [...contributors];

    switch (sortBy) {
      case 'contributions':
        sorted.sort((a, b) => b.totalContributions - a.totalContributions);
        break;
      case 'events':
        sorted.sort((a, b) => b.eventsAttended - a.eventsAttended);
        break;
      case 'streak':
        sorted.sort((a, b) => b.longestStreak - a.longestStreak);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredData(sorted);
  }, [contributors, sortBy]);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return {
          icon: <Trophy className="w-8 h-8" />,
          color: 'text-yellow-500',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-500',
          label: '🥇 Champion',
        };
      case 2:
        return {
          icon: <Medal className="w-7 h-7" />,
          color: 'text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-400',
          label: '🥈 Runner-up',
        };
      case 3:
        return {
          icon: <Medal className="w-6 h-6" />,
          color: 'text-orange-600',
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-600',
          label: '🥉 Third Place',
        };
      default:
        return {
          icon: null,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-white dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700',
          label: `#${rank}`,
        };
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Community Leaderboard
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Celebrating our top contributors and community champions
        </p>
      </div>

      {/* Sort Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </span>
            <div className="flex space-x-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      sortBy === option.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredData.length} contributors
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {filteredData.map((contributor, index) => {
          const rank = index + 1;
          const badge = getRankBadge(rank);

          return (
            <div
              key={contributor.id}
              className={`${badge.bg} ${badge.border} border-2 rounded-lg p-4 transition-all hover:shadow-lg hover:scale-102 ${
                rank <= 3 ? 'transform hover:scale-105' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left: Rank and User Info */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Rank Badge */}
                  <div className={`flex items-center justify-center ${rank <= 3 ? 'w-16' : 'w-12'}`}>
                    {rank <= 3 ? (
                      <div className={`${badge.color} flex flex-col items-center`}>
                        {badge.icon}
                        <span className="text-xs font-bold mt-1">{badge.label}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700">
                        <span className="font-bold text-gray-700 dark:text-gray-300">{rank}</span>
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={contributor.avatar || `https://ui-avatars.com/api/?name=${contributor.name}`}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-700 shadow-md"
                    />
                    {rank <= 3 && (
                      <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* User Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                        {contributor.name}
                      </h3>
                      {contributor.verified && (
                        <span className="text-blue-500" title="Verified">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      @{contributor.username}
                    </p>
                    {contributor.location && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        📍 {contributor.location}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ml-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {contributor.totalContributions || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {contributor.eventsAttended || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {contributor.longestStreak || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {contributor.rating ? contributor.rating.toFixed(1) : '0.0'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {contributor.achievements && contributor.achievements.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Achievements:
                    </span>
                    {contributor.achievements.slice(0, 5).map((achievement, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        title={achievement.description}
                      >
                        {achievement.icon} {achievement.name}
                      </span>
                    ))}
                    {contributor.achievements.length > 5 && (
                      <span className="text-xs text-gray-500">
                        +{contributor.achievements.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Contributors Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to join and make it to the leaderboard!
          </p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">
              {filteredData.reduce((sum, c) => sum + (c.totalContributions || 0), 0)}
            </div>
            <div className="text-sm opacity-90">Total Contributions</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {filteredData.reduce((sum, c) => sum + (c.eventsAttended || 0), 0)}
            </div>
            <div className="text-sm opacity-90">Events Attended</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {Math.max(...filteredData.map((c) => c.longestStreak || 0), 0)}
            </div>
            <div className="text-sm opacity-90">Longest Streak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{filteredData.length}</div>
            <div className="text-sm opacity-90">Active Contributors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
