"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkIcon, PlusCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addBookmark } from "@/lib/actions/bookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const CreateBookmarkPage = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession(); // ✅ Call `useSession` at the top level

  // React Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (userId: string) => {
      const metaDataResponse = await fetch(`/api/getMeta?url=${encodeURIComponent(url)}`);
      const data = await metaDataResponse.json();

      return addBookmark({
        url,
        name: data?.title || url,
        owner: userId,
        image: data?.favicon,
        createdAt: new Date(),
      });
    },

    onSuccess: () => {
      toast.success("Bookmark created successfully!");
      queryClient.refetchQueries({ queryKey: ["bookmarks"] }); // ✅ Force refresh
      router.push("/bookmarks");
      router.refresh(); // ✅ Ensure UI updates instantly
    },

  });


  return (
      <div className="my-10">
        <div className="grid gap-4">
          <div className="app-container flex items-center justify-between">
            <h2 className="text-4xl color-pink font-bold">Create</h2>
            <div className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <Link href="/bookmarks" className="flex items-center justify-center gap-1">
                <p className="text-sm">Go to bookmarks</p>
              </Link>
            </div>
          </div>
          <div className="app-container">
            <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!url || !session?.user?.id) return;
                  mutate(session.user.id); // ✅ Pass userId when calling mutate()
                }}
                className="flex items-center py-4 gap-4"
            >
              <div className="bg-gray-100 w-full px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-6 w-6 text-gray-400" />
                  <Input
                      className="w-full px-0 py-1"
                      placeholder="Type in the link of the web page you want to bookmark"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
              </div>
              <Button className="flex items-center">
                {isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <PlusCircle className="h-8 w-8" />}
                <p>{isPending ? "Creating..." : "Create"}</p>
              </Button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default CreateBookmarkPage;
