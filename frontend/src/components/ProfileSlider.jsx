import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Mousewheel } from 'swiper/modules';
import { useNavigate } from 'react-router';
import axios from 'axios';

// This component receives the profiles as a prop
function ProfileSlider({ profiles }) {
  if (!profiles || profiles.length === 0) {
    return <div className="text-white">No profiles to display.</div>;
  }
 const navigate = useNavigate();

  const onProfileClick = async (profileid) => {
  try {
    console.log("Fetching data...(id)");

    const response = await axios.get(`http://localhost:3000/api/fetchdata?id=${profileid}`);
    const data = response.data;

    navigate('/api/show', { state: { fetchedData: data } });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // You can show an alert or toast here
  }
};

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
        {profiles.map(profile => (
          <SwiperSlide key={profile.id}>
            {({ isActive }) => (
              <div
              onClick={() => onProfileClick(profile.id)}
                className={`flex flex-col items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ${
                  isActive ? 'scale-100 bg-white' : 'scale-75 bg-white/50'
                }`}
              >
                <img
                  src={`/api/image-proxy?url=${encodeURIComponent(profile.profilePicUrl)}`}
                  alt={profile.fullName}
                  className="w-30 h-30 rounded-full mb-4 border-2 border-slate-300"
                />
                <h3 className="text-xl font-bold text-slate-800">{profile.fullName}</h3>
                <p className="text-slate-700">{profile.category}</p>
                <p className="text-slate-700">{profile.followers} followers</p>

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

export default ProfileSlider;
