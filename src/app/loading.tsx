import { Comments } from "@/components/comments";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-[70%]" />
      </CardContent>
      <Separator />
      <CardFooter>
        <Comments />
      </CardFooter>
    </Card>
  );
};

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col container mx-auto max-w-screen-md gap-2 py-6">
        <LoadingCard />
        <LoadingCard />
      </div>
    </main>
  );
}
