// Achievement System Component
// Gamification with badges, levels, and milestones

import React, { useState } from 'react';
import { 
  Award, Star, Zap, Target, TrendingUp, Code, 
  Users, Calendar, Gift, Lock, CheckCircle, Clock 
} from 'lucide-react';

export const AchievementSystem = ({ userStats, achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLocked, setShowLocked] = useState(true);

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Award },
    { id: 'contribution', label: 'Contributions', icon: Code },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'special', label: 'Special', icon: Gift },
  ];

  const achievementsList = [
    {
      id: 'first-contribution',
      name: 'First Steps',
      description: 'Made your first contribution',
      icon: '🎯',
      category: 'contribution',
      points: 10,
      rarity: 'common',
      requirement: 1,
      progress: userStats?.contributions || 0,
      unlocked: (userStats?.contributions || 0) >= 1,
    },
    {
      id: 'contributor-10',
      name: 'Rising Star',
      description: 'Made 10 contributions',
      icon: '⭐',
      category: 'contribution',
      points: 50,
      rarity: 'uncommon',
      requirement: 10,
      progress: userStats?.contributions || 0,
      unlocked: (userStats?.contributions || 0) >= 10,
    },
    {
      id: 'contributor-50',
      name: 'Super Contributor',
      description: 'Made 50 contributions',
      icon: '🚀',
      category: 'contribution',
      points: 200,
      rarity: 'rare',
      requirement: 50,
      progress: userStats?.contributions || 0,
      unlocked: (userStats?.contributions || 0) >= 50,
    },
    {
      id: 'contributor-100',
      name: 'Legend',
      description: 'Made 100 contributions',
      icon: '👑',
      category: 'contribution',
      points: 500,
      rarity: 'epic',
      requirement: 100,
      progress: userStats?.contributions || 0,
      unlocked: (userStats?.contributions || 0) >= 100,
    },
    {
      id: 'first-event',
      name: 'Event Attendee',
      description: 'Attended your first event',
      icon: '🎟️',
      category: 'events',
      points: 15,
      rarity: 'common',
      requirement: 1,
      progress: userStats?.eventsAttended || 0,
      unlocked: (userStats?.eventsAttended || 0) >= 1,
    },
    {
      id: 'event-regular',
      name: 'Event Regular',
      description: 'Attended 5 events',
      icon: '🎪',
      category: 'events',
      points: 75,
      rarity: 'uncommon',
      requirement: 5,
      progress: userStats?.eventsAttended || 0,
      unlocked: (userStats?.eventsAttended || 0) >= 5,
    },
    {
      id: 'event-enthusiast',
      name: 'Event Enthusiast',
      description: 'Attended 15 events',
      icon: '🎊',
      category: 'events',
      points: 250,
      rarity: 'rare',
      requirement: 15,
      progress: userStats?.eventsAttended || 0,
      unlocked: (userStats?.eventsAttended || 0) >= 15,
    },
    {
      id: 'streak-7',
      name: 'Consistent',
      description: 'Maintained a 7-day streak',
      icon: '🔥',
      category: 'contribution',
      points: 100,
      rarity: 'uncommon',
      requirement: 7,
      progress: userStats?.currentStreak || 0,
      unlocked: (userStats?.longestStreak || 0) >= 7,
    },
    {
      id: 'streak-30',
      name: 'Dedicated',
      description: 'Maintained a 30-day streak',
      icon: '💪',
      category: 'contribution',
      points: 300,
      rarity: 'rare',
      requirement: 30,
      progress: userStats?.currentStreak || 0,
      unlocked: (userStats?.longestStreak || 0) >= 30,
    },
    {
      id: 'community-helper',
      name: 'Community Helper',
      description: 'Helped 10 community members',
      icon: '🤝',
      category: 'community',
      points: 150,
      rarity: 'uncommon',
      requirement: 10,
      progress: userStats?.helpedMembers || 0,
      unlocked: (userStats?.helpedMembers || 0) >= 10,
    },
    {
      id: 'mentor',
      name: 'Mentor',
      description: 'Mentored 5 new members',
      icon: '🎓',
      category: 'community',
      points: 250,
      rarity: 'rare',
      requirement: 5,
      progress: userStats?.mentored || 0,
      unlocked: (userStats?.mentored || 0) >= 5,
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Joined in the first month',
      icon: '🐦',
      category: 'special',
      points: 100,
      rarity: 'rare',
      requirement: 1,
      progress: 1,
      unlocked: userStats?.earlyMember || false,
    },
    {
      id: 'anniversary',
      name: 'One Year Strong',
      description: 'Been a member for 1 year',
      icon: '🎂',
      category: 'special',
      points: 500,
      rarity: 'epic',
      requirement: 365,
      progress: userStats?.memberDays || 0,
      unlocked: (userStats?.memberDays || 0) >= 365,
    },
  ];

  const rarityColors = {
    common: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      border: 'border-gray-300 dark:border-gray-600',
      text: 'text-gray-700 dark:text-gray-300',
      badge: 'bg-gray-500',
    },
    uncommon: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-400 dark:border-green-600',
      text: 'text-green-700 dark:text-green-300',
      badge: 'bg-green-500',
    },
    rare: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-400 dark:border-blue-600',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'bg-blue-500',
    },
    epic: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-400 dark:border-purple-600',
      text: 'text-purple-700 dark:text-purple-300',
      badge: 'bg-purple-500',
    },
    legendary: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-400 dark:border-yellow-600',
      text: 'text-yellow-700 dark:text-yellow-300',
      badge: 'bg-yellow-500',
    },
  };

  const filteredAchievements = achievementsList.filter((achievement) => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const lockedMatch = showLocked || achievement.unlocked;
    return categoryMatch && lockedMatch;
  });

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;
  const totalPoints = achievementsList
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const progressPercentage = (progress, requirement) => {
    return Math.min((progress / requirement) * 100, 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Award className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Achievements
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Unlock badges and earn rewards for your contributions
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Unlocked</div>
              <div className="text-3xl font-bold">
                {unlockedCount}/{achievementsList.length}
              </div>
            </div>
            <CheckCircle className="w-12 h-12 opacity-80" />
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${(unlockedCount / achievementsList.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Total Points</div>
              <div className="text-3xl font-bold">{totalPoints}</div>
            </div>
            <Star className="w-12 h-12 opacity-80" />
          </div>
          <div className="mt-4 text-sm opacity-90">Keep earning to unlock more!</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Completion</div>
              <div className="text-3xl font-bold">
                {Math.round((unlockedCount / achievementsList.length) * 100)}%
              </div>
            </div>
            <Target className="w-12 h-12 opacity-80" />
          </div>
          <div className="mt-4 text-sm opacity-90">You&apos;re doing great!</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex space-x-2 flex-wrap">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLocked}
              onChange={(e) => setShowLocked(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show locked</span>
          </label>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => {
          const colors = rarityColors[achievement.rarity];
          const progress = progressPercentage(achievement.progress, achievement.requirement);

          return (
            <div
              key={achievement.id}
              className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex flex-col items-end">
                  <span
                    className={`${colors.badge} text-white text-xs px-2 py-1 rounded-full font-medium uppercase mb-1`}
                  >
                    {achievement.rarity}
                  </span>
                  {achievement.unlocked ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              <h3 className={`text-lg font-bold ${colors.text} mb-1`}>{achievement.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {achievement.description}
              </p>

              {/* Progress Bar */}
              {!achievement.unlocked && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>
                      {achievement.progress}/{achievement.requirement}
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${colors.badge} rounded-full h-2 transition-all`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {achievement.points} pts
                  </span>
                </div>
                {achievement.unlocked && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Unlocked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Achievements Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start contributing to unlock achievements!
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;
