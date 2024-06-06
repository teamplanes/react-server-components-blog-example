import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { prisma } from "../../prisma";
import { Comments } from "@/components/comments";
import { Separator } from "@/components/ui/separator";

// This is an async function component, this means it'll be rendered on the server.
export default async function Home() {
  // Wait for 2 seconds to simulate a slow network, meaning you'll see the loading state.
  await new Promise((res) => setTimeout(res, 2000));

  // Because we are on the server here, we have direct access to the database 🤯.
  const posts = await prisma.post.findMany({
    include: { comments: true },
  });

  // This "server action" is a function that we can actually call from the client.
  // We pass it in the props through to our client component called "Comments"
  const saveComment = async (postId: string, comment: string) => {
    "use server";

    // Note, error handling/try-catch is handled in the client component.
    return await prisma.comment.create({
      data: {
        authorId: "1", // this is hardcoded as we have no auth!
        content: comment,
        postId,
      },
    });
  };

  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col container mx-auto max-w-screen-md gap-2 py-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <Separator />
            <CardFooter>
              <Comments post={post} onSaveComment={saveComment} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
