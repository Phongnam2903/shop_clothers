import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Sử dụng biểu tượng trái tim từ react-icons
import "../home/css/Like.css";
function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={toggleLike}
    >
      <FaHeart />
    </button>
  );
}

export default LikeButton;
