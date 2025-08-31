import { Button } from "@/components";
import Link from "next/link";

export default function page() {
  return (
    <div className="md:h-screen h-auto md:mt-0 mt-20 flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <div className="space-x-4">
          <Button>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button>
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
        <div>
          <p>
            Created by{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={"https://github.com/txrunishere"}
            >
              txrunishere
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
