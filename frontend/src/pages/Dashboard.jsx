import React from 'react';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';

function Dashboard() {
  return (
    <BorderAnimatedContainer>
    <div className="min-h-screen w-full bg-gray-900 text-white flex">
    
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Header/Profile Info */}
        <section className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="/path/to/profile.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold">Ralph</h1>
              <p className="text-2xl text-gray-300">Edwards</p>
            </div>
          </div>
          <div className="space-x-6 text-right">
            <span className="text-gray-400 uppercase text-sm">Spain</span>
            <span className="text-gray-400 uppercase text-sm">23 Years Old</span>
            <span className="text-gray-400 uppercase text-sm">Single</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg space-y-2 text-right">
            <p className="text-sm text-gray-400">Occupation</p>
            <p className="font-semibold">Software Developer</p>
            <p className="text-sm text-gray-400">Microsoft</p>
            <p className="font-semibold">$100k</p>
          </div>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">Call Now</button>
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Send Email</button>
          </div>
        </section>


      </main>
      </div>
     </BorderAnimatedContainer>
    
  );
}

export default Dashboard;
