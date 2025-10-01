/**
 * Instagram Profile Metrics Calculator
 * 
 * Calculates engagement metrics from Instagram profile data
 * @param {Object} profile - The profile object from Instagram API
 * @returns {Object} Calculated metrics including averages and engagement rates
 */

/**
 * Main metrics calculation function
 * @param {Object} profile - Profile data containing user info and posts
 * @returns {Object} Comprehensive metrics object
 */
export function metrics(profile) {
  try {
    // Validate input
    if (!profile || !profile.data || !profile.data.user) {
      throw new Error('Invalid profile structure: Missing profile.data.user');
    }

    const user = profile.data.user;

    // Extract basic profile information
    const basicInfo = {
      followers: user.edge_followed_by?.count || 0,
      following: user.edge_follow?.count || 0,
      name: user.full_name || 'Unknown',
      username: user.username || 'unknown',
      isVerified: user.is_verified || false,
      biography: user.biography || '',
      category: user.category_name || 'Not specified',
      profilePicture: user.profile_pic_url_hd || user.profile_pic_url || null
    };

    // Get video posts from edge_felix_video_timeline
    const videoPosts = user.edge_felix_video_timeline?.edges || [];

    // Get regular posts from edge_owner_to_timeline_media if available
    const regularPosts = user.edge_owner_to_timeline_media?.edges || [];

    // Combine all posts for analysis
    const allPosts = [...videoPosts, ...regularPosts];

    if (allPosts.length === 0) {
      return {
        ...basicInfo,
        totalPosts: 0,
        averageLikes: 0,
        averageComments: 0,
        averageViews: 0,
        engagementRate: 0,
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0,
        postsAnalyzed: 0,
        error: 'No posts found for analysis'
      };
    }

    // Calculate engagement metrics
    let totalLikes = 0;
    let totalComments = 0;
    let totalViews = 0;
    let postsWithViews = 0;

    const postDetails = allPosts.map(postEdge => {
      const post = postEdge.node;
      const likes = post.edge_liked_by?.count || post.edge_media_preview_like?.count || 0;
      const comments = post.edge_media_to_comment?.count || 0;
      const views = post.video_view_count || 0;

      totalLikes += likes;
      totalComments += comments;

      if (views > 0) {
        totalViews += views;
        postsWithViews++;
      }

      return {
        id: post.id,
        shortcode: post.shortcode,
        likes,
        comments,
        views,
        isVideo: post.is_video || false,
        timestamp: post.taken_at_timestamp,
        caption: post.edge_media_to_caption?.edges?.[0]?.node?.text || '',
        displayUrl: post.display_url || post.thumbnail_src,
        engagementCount: likes + comments
      };
    });

    // Calculate averages
    const postsCount = allPosts.length;
    const averageLikes = Math.round(totalLikes / postsCount);
    const averageComments = Math.round(totalComments / postsCount);
    const averageViews = postsWithViews > 0 ? Math.round(totalViews / postsWithViews) : 0;

    // Calculate engagement rate (likes + comments) / followers * 100
    const totalEngagement = totalLikes + totalComments;
    const engagementRate = basicInfo.followers > 0 
      ? parseFloat(((totalEngagement / postsCount) / basicInfo.followers * 100).toFixed(3))
      : 0;

    // Get post counts from different sections
    const videoPostsCount = user.edge_felix_video_timeline?.count || 0;
    const totalPostsCount = user.edge_owner_to_timeline_media?.count || videoPostsCount;

    return {
      // Basic profile information
      followers: basicInfo.followers,
      following: basicInfo.following,
      name: basicInfo.name,
      username: basicInfo.username,
      isVerified: basicInfo.isVerified,
      biography: basicInfo.biography,
      category: basicInfo.category,
      profilePicture: basicInfo.profilePicture,

      // Post counts
      totalPosts: totalPostsCount,
      videoPosts: videoPostsCount,
      postsAnalyzed: postsCount,

      // Engagement metrics
      averageLikes,
      averageComments,
      averageViews,
      engagementRate,

      // Total metrics
      totalLikes,
      totalComments,
      totalViews,
      totalEngagement,

      // Additional metrics
      avgEngagementPerPost: Math.round(totalEngagement / postsCount),
      likesToCommentsRatio: totalComments > 0 ? parseFloat((totalLikes / totalComments).toFixed(2)) : 0,

      // Post details for further analysis
      recentPosts: postDetails.slice(12, 22), // Last 10 posts
      allPosts: postDetails,

      // Engagement rate categories
      engagementLevel: getEngagementLevel(engagementRate),

      // Account type information
      isBusinessAccount: user.is_business_account || false,
      isProfessionalAccount: user.is_professional_account || false,

      // Additional profile data
      highlightReelCount: user.highlight_reel_count || 0,
      hasGuides: user.has_guides || false,
      hasClips: user.has_clips || false
    };

  } catch (error) {
    console.error('Error calculating metrics:', error);
    return {
      error: error.message,
      followers: 0,
      following: 0,
      totalPosts: 0,
      averageLikes: 0,
      averageComments: 0,
      engagementRate: 0
    };
  }
}

/**
 * Helper function to categorize engagement rate
 * @param {number} rate - Engagement rate percentage
 * @returns {string} Engagement level category
 */
function getEngagementLevel(rate) {
  if (rate >= 6) return 'Excellent';
  if (rate >= 3) return 'Good';
  if (rate >= 1) return 'Average';
  if (rate >= 0.5) return 'Below Average';
  return 'Low';
}

/**
 * Calculate engagement rate for a specific post
 * @param {Object} post - Individual post data
 * @param {number} followerCount - Total follower count
 * @returns {number} Post-specific engagement rate
 */
export function calculatePostEngagementRate(post, followerCount) {
  if (!post || followerCount <= 0) return 0;

  const likes = post.edge_liked_by?.count || post.likes || 0;
  const comments = post.edge_media_to_comment?.count || post.comments || 0;
  const engagement = likes + comments;

  return parseFloat(((engagement / followerCount) * 100).toFixed(3));
}

/**
 * Format numbers for display (e.g., 1200 -> "1.2K")
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

/**
 * Get the best performing posts based on engagement
 * @param {Array} posts - Array of post objects
 * @param {number} limit - Number of top posts to return
 * @returns {Array} Top performing posts
 */
export function getTopPosts(posts, limit = 5) {
  if (!Array.isArray(posts)) return [];

  return posts
    .sort((a, b) => b.engagementCount - a.engagementCount)
    .slice(0, limit);
}

/**
 * Calculate growth metrics (requires historical data)
 * Note: This is a placeholder for future implementation
 * @param {Object} currentMetrics - Current metrics
 * @param {Object} previousMetrics - Previous period metrics
 * @returns {Object} Growth metrics
 */
export function calculateGrowthMetrics(currentMetrics, previousMetrics) {
  if (!previousMetrics) {
    return {
      followerGrowth: 0,
      engagementGrowth: 0,
      postGrowth: 0
    };
  }

  return {
    followerGrowth: ((currentMetrics.followers - previousMetrics.followers) / previousMetrics.followers * 100).toFixed(2),
    engagementGrowth: ((currentMetrics.engagementRate - previousMetrics.engagementRate) / previousMetrics.engagementRate * 100).toFixed(2),
    postGrowth: ((currentMetrics.totalPosts - previousMetrics.totalPosts) / previousMetrics.totalPosts * 100).toFixed(2)
  };
}

// Export all functions
export default {
  metrics,
  calculatePostEngagementRate,
  formatNumber,
  getTopPosts,
  calculateGrowthMetrics,
  getEngagementLevel
};