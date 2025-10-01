import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Mousewheel } from 'swiper/modules';
import { useNavigate } from 'react-router';
import axios from 'axios';




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






// This component receives the profiles as a prop
function PostSlider({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="text-white">No posts to display.</div>;
  }
 const navigate = useNavigate();

//   const onProfileClick = async (profileid) => {
//   try {
//     console.log("Fetching data...(id)");

//     const response = await axios.get(`http://localhost:3000/api/fetchdata?id=${profileid}`);
//     const profile = response.data;

//     navigate('/show', { state: { profile: profile } });
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//     // You can show an alert or toast here
//   }
// };

  return (
    // CHANGE 1: Added a new parent div with padding to make space for the buttons
    <div className="relative w-full max-w-[90rem] px-16">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
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
        className="profile-slider"
      >
        {posts.map(post => (
          <SwiperSlide key={post.id}>
            {({ isActive }) => (
              <div
              onClick={() => onProfileClick(posts.id)}
                className={`flex flex-col items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                  isActive ? 'scale-100 bg-white' : 'scale-75 bg-white/50'
                }`}
              >
                <img
                  src={`/api/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
                  alt={post.caption.split(" ")[0]}
                  className="w-30 h-30 rounded-full mb-4 border-2 border-slate-300"
                />
                <p className="text-slate-700">{formatNumber(post.comments)}com</p>
                <p className="text-slate-700">{formatNumber(post.likes)} likes</p>
                <p className="text-xl font-bold text-slate-800">{post.caption.split(" ").slice(0,3).join(" ")}...</p>
                

              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CHANGE 3: Buttons are now positioned absolutely within the padded parent */}
      {/* <div className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 text-slate-700 after:text-3xl font-extrabold"></div>
      <div className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 text-slate-700 after:text-3xl font-extrabold"></div> */}
    </div>
  );
}

export default PostSlider ;
