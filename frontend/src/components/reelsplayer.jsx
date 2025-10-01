import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Info } from 'lucide-react';
import PostDetailModal from './postdetailmodel';






const ReelsPlayer = ({ reels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentReel = reels[currentIndex];
  console.log({currentReel})
  // Auto-play when reel changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  }, [currentIndex]);


  // ✅ ADDED: Modal control functions
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleDoubleClick = (e) => {
    togglePlayPause();
    e.stopPropagation();
    openModal(currentReel);
  };


  // Handle video ended - go to next reel
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      handleNext();
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentIndex]);

  // Handle scroll navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout;

    const handleScroll = (e) => {
      e.preventDefault();

      if (isScrolling) return;
      isScrolling = true;

      const delta = e.deltaY;

      if (delta > 0) {
        // Scroll down - next video
        handleNext();
      } else {
        // Scroll up - previous video
        handlePrevious();
      }

      // Reset scrolling flag
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    container.addEventListener('wheel', handleScroll, { passive: false });
    return () => container.removeEventListener('wheel', handleScroll);
  }, [currentIndex]);


  // ✅ ADDED: Escape key handler
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  if (isModalOpen) {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  return () => {
    document.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = 'unset';
  };
}, [isModalOpen]);






  // // Handle touch/swipe for mobile
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   let startY = 0;
  //   let isSwping = false;

  //   const handleTouchStart = (e) => {
  //     startY = e.touches[0].clientY;
  //     isSwping = false;
  //   };

  //   const handleTouchMove = (e) => {
  //     if (isSwping) return;

  //     const currentY = e.touches[0].clientY;
  //     const diff = startY - currentY;

  //     // Minimum swipe distance
  //     if (Math.abs(diff) > 50) {
  //       isSwping = true;

  //       if (diff > 0) {
  //         // Swipe up - next video
  //         handleNext();
  //       } else {
  //         // Swipe down - previous video
  //         handlePrevious();
  //       }
  //     }
  //   };

  //   container.addEventListener('touchstart', handleTouchStart);
  //   container.addEventListener('touchmove', handleTouchMove);

  //   return () => {
  //     container.removeEventListener('touchstart', handleTouchStart);
  //     container.removeEventListener('touchmove', handleTouchMove);
  //   };
  // }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(reels.length - 1); // Loop to last
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (!currentReel) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        <p>No videos available</p>
      </div>
    );
  }

  return (
    <>
    <div
      ref={containerRef}
      className="relative w-full h-3/5  md:h-full bg-black overflow-hidden cursor-pointer select-none rounded-xl"
      onClick={togglePlayPause}
      onDoubleClick={handleDoubleClick}
    >
      {/* Video Player */}
      <video
        ref={videoRef}
        src={`/api/image-proxy?url=${encodeURIComponent(currentReel.video_url)}`}

        className="w-full h-full object-cover"
        poster={`/api/image-proxy?url=${encodeURIComponent(currentReel.displayUrl)}`}
        muted={isMuted}
        playsInline
        preload="metadata"
      />

      {/* Play/Pause Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${!isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="bg-black/50 rounded-full p-6">
          <Play size={48} className="text-white ml-1" />
        </div>
      </div>
     
      <div className="absolute top-4 right-4 flex flex-col gap-3">
   
  
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(currentReel);
            togglePlayPause();
          }}
          className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
          title="View details"
        >
          <Info size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{
              width: `${((currentIndex + 1) / reels.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Video Counter */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {reels.length}
      </div>

      {/* Navigation Instructions (optional - can be removed) */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
        <p>Scroll or swipe to navigate</p>
      </div>
      
    </div>
    <PostDetailModal 
      post={selectedPost}
      isOpen={isModalOpen}
      onClose={closeModal}
    />
    </>
    
    
  );
};

export default ReelsPlayer;