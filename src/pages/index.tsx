import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Spinner } from "../components/common";
import Button from "../components/common/elements/Buttons";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("🚀 ~ file: index.tsx:9 ~ Home ~ status", status);

  if (session) {
    router.push("/tasks");
  }
  if (status === "loading" || status === "authenticated") {
    return <Spinner show={true} delay={400} />;
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="mb-4 text-3xl font-bold text-gray-700">Login</h1>
      <div className="rounded-xl bg-white p-4 shadow-md">
        <Button
          onClick={() =>
            signIn("github", {
              callbackUrl: "/tasks",
            })
          }
          className="bg-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Sign In with Github
        </Button>
      </div>
    </main>
  );
};

export default Home;
