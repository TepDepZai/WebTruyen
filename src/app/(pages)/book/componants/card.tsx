
interface CardProps {
  id: string;
  title: string;
  author: string;
  tags: string;
  imageUrl: string;
  corner_author: string;
  triggerUpdate?: () => void;
  triggerDelete?: () => void;
  onClick?: () => void;
}

const Card = ({ title, author, tags, imageUrl, corner_author, triggerUpdate, triggerDelete, onClick }: CardProps) => {
  return (
    <div className="bg-gradient-to-br from-[#1b1b24] to-[#252536] border border-[#52357B]/50 rounded-2xl p-5 shadow-xl w-full max-w-lg space-y-4 hover:shadow-[#4ED7F1]/30 hover:shadow-2xl transition-all duration-300">
      <div onClick={onClick}>
        <div className="overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt="Book Cover"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
  
        <h2 className="text-2xl font-bold text-[#4ED7F1] tracking-wide truncate">
          {title}
        </h2>
  
        <div className="space-y-1">
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-gray-300">Author:</span> {author}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-gray-300">Corner Author:</span> {corner_author}
          </p>
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-gray-300">Tags:</span> {tags}
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-3 text-xs">
        <button className="flex-1 bg-[#4ED7F1] text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#38c6de] active:scale-95 transition">
          View
        </button>
        <button 
        onClick={triggerDelete}
        className="flex-1 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 active:scale-95 transition">
          Delete
        </button>
        <button
          onClick={triggerUpdate}
          className="flex-1 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 active:scale-95 transition"
        >
          Update Chapter
        </button>
      </div>
    </div>
  );
};

export default Card;
