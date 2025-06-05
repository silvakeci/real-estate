import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className=" grid  grid-cols-2">
    {/* Left - Image Section */}
    <div className="block">
        <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1170&q=80"
        alt="Login Illustration"
        className="object-cover w-full h-full"
        />
    </div>
    {/* Right - Login Form */}
    <div className="flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500">Please sign in to your account</p>
        </div>

        <SignIn/>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}