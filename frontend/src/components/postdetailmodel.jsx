import { X, Heart, MessageCircle, Share, Bookmark, Eye, Calendar } from 'lucide-react';
const PostDetailModal = ({ post, isOpen, onClose } = {}) => {


  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] min-h-[60vh] overflow-hidden flex">
        {/* Left Side - Image/Video */}
        <div className="flex-1 bg-black relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
          >
            <X size={20} />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            {post.isVideo ? (
              <video
                src={`/api/image-proxy?url=${encodeURIComponent(post.video_url)}`}
                controls
                className="max-w-full max-h-full object-contain"
                poster={`/api/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
              />
            ) : (
              <img
                src={`/api/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
                alt={post.caption}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center p-4 border-b">
            <img
              src={`/api/image-proxy?url=${encodeURIComponent(post.displayUrl)}`}
              alt="User"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{post.username || 'User'}</h3>
              <p className="text-sm text-gray-500">Instagram Post</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-gray-800 leading-relaxed mb-6">{post.caption}</p>

           

            
          </div>

          
        </div>
      </div>
    </div>
  );
};


export default PostDetailModal;