import { LoginForm } from "@/components";

const page = () => {
  return (
    <div className="h-screen grid grid-cols-12">
      <div className="md:col-span-5 hidden md:block h-full">
        <img
          className="w-full h-full object-cover"
          src="/20943394.jpg"
          alt="Login Illustration"
        />
      </div>

      <div className="md:col-span-7 col-span-full flex items-center justify-center">
        <div className="md:w-xs">
          <h1 className="text-center text-3xl font-bold mb-8">LOGIN</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
