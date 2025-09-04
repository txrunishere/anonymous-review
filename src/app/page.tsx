"use client";

import { Button } from "@/components";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>How to use ?</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to use ?</DialogTitle>
            </DialogHeader>
            <div>
              <ul>
                <li>
                  <h2 className="font-bold">Create an Account & Login</h2>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Register with your username, email, and password.
                  </p>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Use your email & password to log in anytime.
                  </p>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Once logged in, you’ll get your unique shareable link
                    (e.g., yourname.here).
                  </p>
                </li>
                <li>
                  <h2 className="font-bold">Share Your Link</h2>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Copy your unique link.
                  </p>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Share it with friends, family, or anyone you want feedback
                    from.
                  </p>
                </li>
                <li>
                  <h2 className="font-bold">Receive Anonymous Reviews</h2>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ People can write reviews about you using your link.
                  </p>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Reviews are 100% anonymous — you won’t know who wrote
                    them.
                  </p>
                </li>
                <li>
                  <h2 className="font-bold">View Your Reviews</h2>
                  <p className="ml-4 text-muted-foreground text-sm">
                    ⦁ Log in to your account anytime to read new reviews.
                  </p>
                </li>
              </ul>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-32">Login</Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full sm:w-32">Register</Button>
          </Link>
        </div>
        <div className="text-center text-sm text-gray-400">
          <p>
            Created by{" "}
            <Link
              className="text-blue-400 hover:underline"
              target="_blank"
              href="https://github.com/txrunishere"
            >
              txrunishere
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
