import React, { useState, useEffect } from 'react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ProfileSlider from '../components/ProfileSlider';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Homepage() {
  const [profiles, setProfiles] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError]             = useState(null);
  const navigate                      = useNavigate();


  useEffect(() => {
    const fetchInitialProfiles = async () => {
      try {
        console.log("Fetching initial profiles...");
        const response = await axios.get('http://localhost:3000/api/fetchdata/initials');
        const rawProfiles = response.data;

        const formatted = rawProfiles.map(profile => ({
          id: profile._id,
          fullName: profile.data.user.full_name,
          username: profile.data.user.username,
          profilePicUrl: profile.data.user.profile_pic_url_hd,
          category: profile.data.user.category_name,
          followers: profile.data.user.edge_followed_by.count,
        }));

        setProfiles(formatted);           // ← Set state here

      } catch (err) {
        console.error("Failed to fetch initial profiles:", err);
        setError("Could not load profiles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialProfiles();
  }, []);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-slate-900 text-white">Loading profiles...</div>;
  }
  if (error) {
    return <div className="h-screen flex items-center justify-center bg-slate-900 text-red-500">{error}</div>;
  }
 
 
 

const handleSubmit = async e => {
    e.preventDefault();
    const username = textValue.trim();
    if (!username) {
      return alert('Enter a username');
    }
    setSearchLoading(true);
    setError(null);
    try {
      console.log("Fetching data...(username)",{textValue});

      const res = await axios.get(`http://localhost:3000/api/search?username=${encodeURIComponent(username)}`
      );
      const profile = res.data;
      // Navigate only after fetch completes
      navigate(`/api/show`, { state: { fetchedProfile: profile } });
    } catch (err) {
      setError(err.response?.status === 404 ? 'Profile not found.' : 'Search failed.');
    } finally {
      setSearchLoading(false);
    }
  };
    // Early returns
  if (searchLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        Searching…
      </div>
    );
  }
  
  if (error && !searchLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-red-500 space-y-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-600 text-white"
        >
          Retry
        </button>
      </div>
    );
  }


return (
  // 1. The SINGLE main container for the entire page.
  // It fills the screen height and uses flexbox to center its children.
  <div className="h-screen  flex items-center justify-center  bg-slate-900">

    {/* 2. The BorderAnimatedContainer wraps all your content. */}
    <BorderAnimatedContainer className="">

      {/* 3. A single flex column to stack and center the slider and form. */}
      {/* `justify-center` vertically centers the content. `space-y-12` adds a gap. */}
      <div className='w-full h-full flex flex-col justify-center items-center p-8 space-y-72'>

        {/* --- Profile Slider Section --- */}
        <div className="w-full flex justify-center">

          <ProfileSlider profiles={profiles} />
        </div>

        {/* --- Form Section --- */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">



          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Search with username"
            className="w-full bg-slate-800 text-white p-3 border border-slate-600 rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white font-bold py-3 rounded-md hover:bg-cyan-600 transition-colors"
          >
            Search
          </button>
        </form>

      </div>
    </BorderAnimatedContainer>
  </div>
);
}

export default Homepage;

