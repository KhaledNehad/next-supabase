"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { KeyRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

export default function Page() {
  const params = useSearchParams();
  const next = params.get("next");
  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: location.origin + "/auth/callback?next=" + next },
    });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 rounded-md border p-5 space-y-5">
        <div className="flex items-center gap-2">
          <KeyRound />
          <h1 className="text-2xl font-bold">Quick Quotient</h1>
        </div>
        <p className="text-sm text-gray-300">Register today 👇</p>
        <Button
          className="flex w-full items-center gap-2"
          variant="outline"
          onClick={() => handleLoginWithOAuth("google")}
        >
          <FcGoogle />
          Google
        </Button>
        <Button
          className="flex w-full items-center gap-2"
          variant="outline"
          onClick={() => handleLoginWithOAuth("github")}
        >
          <ImGithub />
          Github
        </Button>
      </div>
    </div>
  );
}
