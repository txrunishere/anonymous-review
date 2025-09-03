"use client";

import { Button, Input } from "@/components";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import moment from "moment";
import { useUserStore } from "@/stores/user-store";
import { useEffect, useRef, useState } from "react";

export default function Message() {
  const { fetchUser, user } = useUserStore();
  const userUrlRef = useRef<HTMLInputElement>(null);
  const [pathname, setPathname] = useState<string>("");

  useEffect(() => {
    fetchUser();

    if (typeof window !== "undefined") setPathname(window.location.href);
  }, [fetchUser]);

  const handleCopyUserUrl = () => {
    if (userUrlRef.current?.value)
      navigator.clipboard.writeText(userUrlRef.current?.value);
  };

  return (
    <div>
      <div>
        <section>
          <h1 className="text-center text-2xl md:text-4xl font-bold mt-20">
            Hello {user?.username ? user.username : "User"}
          </h1>
        </section>
        <div className="max-w-4xl mx-auto mt-6">
          <div className="flex md:mx-4 mx-8 gap-2">
            <Input
              readOnly
              value={`${pathname}/${user?.username ? user?.username : ""}`}
              ref={userUrlRef}
            />
            <Button onClick={handleCopyUserUrl}>Copy</Button>
          </div>
        </div>
        <div className="mt-10 max-w-4xl mx-auto">
          <section className="grid md:grid-cols-2 md:mx-8 lg:grid-cols-3 mx-8 grid-cols-1 gap-2">
            {user?.reviews &&
              user?.reviews.map(({ content, _id, createdAt }) => (
                <Card key={_id}>
                  <CardHeader>
                    <CardTitle>{content}</CardTitle>
                    <p className="text-end text-sm opacity-65">
                      {moment(createdAt).fromNow()}
                    </p>
                  </CardHeader>
                </Card>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
