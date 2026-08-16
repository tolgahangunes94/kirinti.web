"use client";

import { useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { createClient } from "@/lib/supabase/client";
import { likePost, unlikePost } from "@/lib/supabase/likes";

type LikeButtonProps = {
  postId: string;
  initialLikesCount: number;
  initiallyLiked?: boolean;
};

export default function LikeButton({
  postId,
  initialLikesCount,
  initiallyLiked = false,
}: LikeButtonProps) {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [liked, setLiked] = useState(initiallyLiked);
  const [count, setCount] = useState(initialLikesCount);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!user) {
      openAuthModal("sign-in");
      return;
    }
    if (pending) return;

    const previousLiked = liked;
    const previousCount = count;

    setLiked(!previousLiked);
    setCount(previousLiked ? previousCount - 1 : previousCount + 1);
    setPending(true);

    try {
      const supabase = createClient();
      if (previousLiked) {
        await unlikePost(supabase, postId, user.id);
      } else {
        await likePost(supabase, postId, user.id);
      }
    } catch {
      setLiked(previousLiked);
      setCount(previousCount);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1.5 transition-colors ${
        liked ? "text-accent" : "hover:text-foreground"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M10 17s-6.5-4-6.5-9A3.5 3.5 0 0 1 10 6a3.5 3.5 0 0 1 6.5 2c0 5-6.5 9-6.5 9Z" />
      </svg>
      {count}
    </button>
  );
}
