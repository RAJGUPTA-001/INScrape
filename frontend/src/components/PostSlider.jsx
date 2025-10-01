import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow, Navigation,Mousewheel } from 'swiper/modules';
import { X, Heart, MessageCircle, Share, Bookmark, Eye, Calendar } from 'lucide-react';
import PostDetailModal from './postdetailmodel';

function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

// Modal Component for detailed post information
PostDetailModal();

// Main PostSlider Component
function PostSlider({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!posts || posts.length === 0) {
    return <div className="text-white">No posts to display.</div>;
  }

  const onPostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="relative w-full max-w-[90rem] px-16">
            <Swiper
              effect={'coverflow'}
              grabCursor={false}
              centeredSlides={true}
              loop={true}
              // CHANGE 2: Set slidesPerView to 3 for more predictable behavior
              slidesPerView={5}
              coverflowEffect={{
                rotate: 10,
                stretch: -7,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              mousewheel={true}
              modules={[EffectCoverflow, Navigation, Mousewheel]}
              className="profile-slider"         // ← important
              preventClicksPropagation={false}
            
            >
          {posts.map(post => (
            <SwiperSlide key={post.id}>
              {({ isActive }) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onPostClick(post);    // Fixed: Pass entire post object
                  }}
                  className={`
                    flex flex-col items-center p-8 rounded-2xl shadow-lg 
                    transition-all duration-300 cursor-pointer relative
                    ${isActive 
                      ? 'scale-100 bg-white z-20 hover:shadow-xl' 
                      : 'scale-75 bg-white/50 z-10 hover:bg-white/70'
                    }
                  `}
                >
                  {/* Video indicator */}
                  {post.isVideo && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Video
                    </div>
                  )}

                  <img
                    src={`/api/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
                    alt={post.caption?.split(" ")[0] || "Post"}
                    className="w-30 h-30 rounded-full mb-4 border-2 border-slate-300 object-cover"
                    draggable={false}
                  />
                  
                  <p className="text-slate-700">{formatNumber(post.comments)} comments</p>
                  <p className="text-slate-700">{formatNumber(post.likes)} likes</p>
                  {post.views && <p className="text-slate-700">{formatNumber(post.views)} views</p>}
                  
                  <p className="text-xl font-bold text-slate-800 text-center mt-2">
                    {post.caption?.split(" ").slice(0,3).join(" ") || "No caption"}...
                  </p>

                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      <PostDetailModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default PostSlider;
