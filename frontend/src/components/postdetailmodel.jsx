import { X, Heart, MessageCircle, Share, Bookmark, Eye, Calendar } from 'lucide-react';
const PostDetailModal = ({ post, isOpen, onClose, profiledata } = {}) => {


  let ai_analysis = null
  profiledata?.ai_analysis_image?.forEach(element => {
    if (element?.id === post?.id) {         // post always has id but post is passed at param only when clicked so this keeps breaking  thats why use post?.id
      ai_analysis = element?.ai_analysis
    }


  });

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

            <p className="text-gray-800 leading-relaxed mb-2 border-b border-gray-300 pb-4 mb-6">Caption - {post.caption}</p>
            <p className="text-gray-800 leading-relaxed border-b border-gray-300 pb-4 mb-6">AI analysis as following </p>




            <p className="text-gray-800 leading-relaxed mb-6">content category - {ai_analysis?.analysis.content_category}</p>
            <p className="text-gray-800 leading-relaxed mb-6 break-words whitespace-pre-wrap"></p>
            <p className="text-gray-800 leading-relaxed mb-6 flex flex-wrap gap-2">HASHTAGS
              {ai_analysis?.analysis.keywords?.map((vibe, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 rounded-md text-sm text-blue-700"
                >
                  {vibe}
                </span>
              ))}
            </p>
            <p className="text-gray-800 leading-relaxed mb-6 flex flex-wrap gap-2">
              VIBE {ai_analysis?.analysis.vibe.primary?.map((vibe, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 rounded-md text-sm text-blue-700"
                >
                  {vibe}
                </span>
              ))}
            </p>


            <p className="text-gray-800 leading-relaxed mb-6">Lighting - {ai_analysis?.analysis.quality.lighting}</p>
            <p className="text-gray-800 leading-relaxed mb-6">Visual appeal - {ai_analysis?.analysis.quality.visual_appeal}</p>
            <p className="text-gray-800 leading-relaxed mb-6">Consistency - {ai_analysis?.analysis.quality.consistency}</p>
            <p className="text-gray-800 leading-relaxed mb-6">Consistency - {ai_analysis?.analysis.quality.consistency}</p>
            <p className="text-gray-800 leading-relaxed mb-6">Generated Caption - {ai_analysis?.analysis.image_caption}</p>



            {/* <p className="text-gray-800 leading-relaxed mb-6">{ai_analysis?.analysis.quality.technical}</p> */}




          </div>


        </div>
      </div>
    </div>
  );
};


export default PostDetailModal;