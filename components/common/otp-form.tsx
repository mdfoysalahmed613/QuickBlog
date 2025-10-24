"use client"
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
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ClerkAPIError } from "@clerk/types"

interface OTPFormProps {
  code: string
  setCode: (code: string) => void
  onSubmit: (e: React.FormEvent) => void
  onResend?: () => void
  email?: string
  errors?: ClerkAPIError[]
}

export function OTPForm({ code, setCode, onSubmit, onResend, email, errors }: OTPFormProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>
          We sent a 6-digit code to {email ? email : 'your email'}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <InputOTP maxLength={6} id="otp" value={code} onChange={(value) => setCode(value)} required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
              {errors && (
                <FieldDescription className="text-red-600">
                  {errors.map((error) => error.longMessage).join(" ")}
                </FieldDescription>
              )}
            </Field>
            <Button type="submit" disabled={code.length !== 6}>Verify</Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{" "}
              {onResend ? (
                <button type="button" onClick={onResend} className="underline hover:text-primary">
                  Resend
                </button>
              ) : (
                <a href="#" className="underline">Resend</a>
              )}
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
