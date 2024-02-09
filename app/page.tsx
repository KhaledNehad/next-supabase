import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link href="/dashboard">
        <Button variant="outline">Dashboard</Button>
      </Link>
      <Link href="profile">
        <Button variant="outline">Profile</Button>
      </Link>
    </div>
  );
}
