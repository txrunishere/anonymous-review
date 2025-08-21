import { ReviewForm } from "@/components";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div>
      <div>
        <section>
          <h1 className="text-center text-2xl mx-4 md:text-4xl font-bold mt-20">
            Write a Review about{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              {username}
            </span>
          </h1>
        </section>
        <main className="max-w-3xl mt-8 mx-auto">
          <ReviewForm username={username} />
        </main>
        <div className="mt-6">
          <p className="text-center underline text-blue-600">
            <Link href={"/login"}>Create a account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
