"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { EmailCodeFactor, SignInFirstFactor } from '@clerk/types'
import { useSignIn } from "@clerk/nextjs"
import { OTPForm } from "./otp-form"
import { useRouter } from "next/navigation"
import { ClerkAPIError } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { OAuthStrategy } from '@clerk/types'
import { Spinner } from "../ui/spinner"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState<ClerkAPIError[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  if (!signIn) return null
  const signInWith = (strategy: OAuthStrategy) => {
    setIsSubmitting(true)
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-in/sso-callback',
        redirectUrlComplete: '/', 
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.errors)
        console.error(err, null, 2)
      }) .finally(() => {
        setIsSubmitting(false)
      })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(undefined)
    setIsSubmitting(true)
    if (!isLoaded && !signIn) return null

    try {
      const { supportedFirstFactors } = await signIn.create({
        identifier: email,
      })
      const isEmailCodeFactor = (factor: SignInFirstFactor): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code'
      }
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor)

      if (emailCodeFactor) {
        const { emailAddressId } = emailCodeFactor

        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        })
        setVerifying(true)
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error('Error:', JSON.stringify(err, null, 2))
    } finally { 
      setIsSubmitting(false)
    }
  }
  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(undefined)
    setIsSubmitting(true)
    if (!isLoaded && !signIn) return null

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      })

      if (signInAttempt.status === "complete") {
        await setActive({
          session: signIn.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            router.push('/')
          },
        })
      } else {
        console.error(signInAttempt)
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error('Error:', JSON.stringify(err, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }
  if (verifying) {
    return (
      <OTPForm
        code={code}
        setCode={setCode}
        onSubmit={handleOTPSubmit}
        email={email}
        errors={errors}
      />
    )
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Button disabled={isSubmitting} onClick={() => signInWith('oauth_google')} variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? "Signing in..." : "Sign in with Google"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              {errors && (
                <p className="text-red-600">
                  {errors.map((error) => error.longMessage).join(" ")}
                </p>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? "Continuing..." : "Continue"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
