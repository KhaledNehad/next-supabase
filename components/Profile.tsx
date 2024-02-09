"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/app/hook/useUser";
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";

export default function Profile() {
  const { data, isFetching } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const pathname = usePathname();

  if (isFetching) {
    return <div></div>;
  }

  const handleSignOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();

    if (protectedPaths.includes(pathname)) {
      router.replace("/auth?next=" + pathname);
    }
  };

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">SignIn</Button>
        </Link>
      ) : (
        <>
          {data.avatar ? (
            <Image
              src={data.avatar || ""}
              alt={data.username || ""}
              width={50}
              height={50}
              className="rounded-full animate-fade ring-2"
              onClick={handleSignOut}
            />
          ) : (
            <div
              className="rounded-full w-[50px] text-2xl font-bold h-[50px] flex justify-center items-center ring-2 animate-fade"
              onClick={handleSignOut}
            >
              {data.email?.charAt(0)}
            </div>
          )}
        </>
        // <Link href="/profile">
        //   <Button variant="outline">{data.username}</Button>
        // </Link>
      )}
    </div>
  );
}
