import { Metadata } from "next"
import Link from "next/link"
import { UserRegisterForm } from "@/components/auth/user-signup-form"
import { AuthHeader } from "@/components/auth/auth-header"

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="flex-1 flex flex-col">
      <AuthHeader />
      <div className="flex-1 flex items-center justify-center py-4 sm:py-8">
        <div className="w-full max-w-[350px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserRegisterForm />
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/login"
                className="hover:text-brand underline underline-offset-4"
              >
                Already have an account? Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 