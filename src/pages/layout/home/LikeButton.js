import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import "../home/css/Like.css";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [productId, setProductId] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProductId = async () => {
      try {
        const response = await fetch('http://localhost:9999/products'); // API để lấy danh sách sản phẩm
        const products = await response.json();

        const Product = products[0];
        if (Product) {
          setProductId(Product.id);
          
          if (userId) {
            const likedItemsString = localStorage.getItem(`likedItems_${userId}`);
            const likedItems = likedItemsString ? JSON.parse(likedItemsString) : [];
            setLiked(likedItems.includes(Product.id));
          }
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductId();
  }, [userId]);

  const toggleLike = () => {
    if (userId && productId) {
      const currentLikedItemsString = localStorage.getItem(`likedItems_${userId}`);
      const currentLikedItems = currentLikedItemsString ? JSON.parse(currentLikedItemsString) : [];

      let updatedLikedItems;
      if (liked) {
        updatedLikedItems = currentLikedItems.filter(id => id !== productId);
      } else {
        updatedLikedItems = [...currentLikedItems, productId];
      }

      setLiked(!liked);
      localStorage.setItem(`likedItems_${userId}`, JSON.stringify(updatedLikedItems));
    }
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
