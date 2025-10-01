import React from 'react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { useLocation } from "react-router";
import { metrics, formatNumber } from '../lib/metrics';
import { MessageCircle, Heart, Eye } from 'lucide-react';
import PostSlider from '../components/PostSlider';
import ReelsPlayer from '../components/reelsplayer';





function Dashboard() {
  const location = useLocation();
  const { profile } = location.state || {}; // safely destructure
  const data_metrics = metrics(profile)
  const recentvideo_reels  = data_metrics.allPosts
  .filter(post => post.isVideo)
  .reverse();
  console.log(recentvideo_reels);
  console.log(data_metrics)
  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        No profile data found.
      </div>
    );
  }




  return (
    <BorderAnimatedContainer>
      <div className="min-h-screen w-full bg-gray-900 text-white flex">

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Header/Profile Info */}
          <section className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
            {/* Image */}
            <div className="flex-shrink-0">
              <a
                href={`https://www.instagram.com/${profile.data.user.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`/api/image-proxy?url=${encodeURIComponent(profile.data.user.profile_pic_url_hd)}`}
                  alt={profile.data.user.username}
                  className="w-60 h-60 rounded-lg border border-black object-cover mx-auto md:mx-0"
                /></a>

            </div>
            {/* All other elements */}
            <div className="flex-1 flex flex-col md:flex-row justify-end space-y-6 md:space-y-0 md:space-x-6">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold">
                  <a
                    href={`https://www.instagram.com/${profile.data.user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline text-5xl text-gray-300">{profile.data.user.full_name.split(" ")[0]}</span>{" "}
                    <span className="inline text-4xl text-gray-300">{profile.data.user.full_name.split(" ")[1]}</span>
                  </a>
                  <div className=' p-1 leading-none rounded-lg text-center md:text-right'>
                    <a href={`https://www.instagram.com/${profile.data.user.username}`}
                      target="_blank" rel="noopener noreferrer">
                      <span className="text-lg px-1 py-1  rounded  w-full md:w-auto">
                        @{profile.data.user.username}
                      </span>
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-end py-1.5 space-x-2">
                    <span className="text-base text-gray-400"> Category</span>
                    <span className="text-base text-gray-300 font-semibold">{(data_metrics.category)}</span>

                  </div>
                  <div className="flex items-center justify-center md:justify-end py-1.5 space-x-2">
                    <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.followers)}</span>
                    <span className="text-base text-gray-400"> followers</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-end py-1.5 space-x-2">
                    <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.following)}</span>
                    <span className="text-base text-gray-400"> following</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-end py-1.5 space-x-2">
                    <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.totalPosts)}</span>
                    <span className="text-base text-gray-400"> Posts</span>

                  </div>

                </h1>
              </div>





            </div>
            <div className="flex flex-col md:flex-row items-center px-5 space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold">

                  <div className="space-y-3">
                    <div className="flex items-center justify-center md:justify-end space-x-2 py-3">

                      <span className="text-xl text-gray-300 font-semibold">AVERAGE STATS 📊</span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-base text-gray-400">Comments:</span>
                      <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.averageComments)}</span>
                    </div>

                    {/* Likes */}
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-base text-gray-400">Likes:</span>
                      <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.averageLikes)}</span>
                    </div>

                    {/* Video/Reel Views */}
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-base text-gray-400">Video/Reel Views:</span>
                      <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.averageViews)}</span>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <span className="text-base text-gray-400">💬 Engagement:</span>
                      <span className="text-base text-gray-300 font-semibold">{formatNumber(data_metrics.avgEngagementPerPost)}</span>
                    </div>

                    {/* Engagement Rate */}
                    <div className="flex items-center justify-center md:justify-end space-x-2">
                      <span className="text-base text-gray-400"> % Engagement:</span>
                      <span className="text-base text-gray-300 font-semibold">{data_metrics.engagementRate}</span>
                    </div>
                  </div>


                </h1>
              </div>





            </div>
          </section>



          <section className="h-full">
            <div className="flex flex-col md:flex-row w-full h-full">
              {/* Left section (75%) */}
              <div className="w-full md:w-3/4 p-4 flex items-center justify-center">
                <div className="w-full h-full flex justify-center items-center">
                  <PostSlider posts={data_metrics.recentPosts} />
                </div>
              </div>

              {/* Right section (25%) */}
              <div className="w-full md:w-1/4 p-4 flex items-center justify-center mt-4 md:mt-0">
                <ReelsPlayer reels = {recentvideo_reels} />
              </div>
            </div>

          </section>




        </main>
      </div>
    </BorderAnimatedContainer>

  );
}

export default Dashboard;
