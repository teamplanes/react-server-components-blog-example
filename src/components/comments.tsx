"use client";

import { Comment, Post } from "@prisma/client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

interface Props {
  post?: Post & { comments: Comment[] };
  onSaveComment?: (postId: string, comment: string) => Promise<Comment>;
}

export const Comments = (props: Props) => {
  const isSkeleton = props.post === undefined;
  const [comments, setComments] = useState<Comment[]>(
    props.post?.comments || [],
  );

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveComment = async () => {
    if (!props.post || !props.onSaveComment) return;
    if (!comment) {
      toast("Please type a comment.");
      return;
    }

    try {
      setLoading(true);
      const newComment = await props.onSaveComment(props.post.id, comment);
      setComments([...comments, newComment]);
      setComment("");
      setLoading(false);
      toast("Comment saved successfully.");
    } catch (error) {
      toast("Failed to save comment.");
    }
  };

  return (
    <div className="flex flex-col w-full pt-6 gap-6">
      <Card>
        <CardHeader>
          <h3 className="text-md font-semibold">Comments</h3>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {comments.length > 0 ? (
            <ul className="w-full">
              {comments.map((comment) => (
                <li key={comment.id} className="mb-2">
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-center text-gray-500">
              No comments yet.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your comment here."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            onClick={handleSaveComment}
            isLoading={loading}
            disabled={isSkeleton}
          >
            Save Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
