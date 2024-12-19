import React, { useState, useTransition } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { OtpSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from '@/auth'

interface OtpFormProps {
    phone_email: { phone: string, email: string };
}

const OtpForm = ({ phone_email }: OtpFormProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    // OTP form
    const otpForm = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const handleOtpSubmit = (values: z.infer<typeof OtpSchema>) => {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const result = await signIn("credentials", {
                phone: phone_email.phone,
                otp: values.otp,
                email: phone_email.email,
                isSignup: true,
                redirect: false,
            });

            console.log(result)

        });
    };
    return (
        <Form {...otpForm}>
            <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter OTP</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="123456"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                {/* Submit Button */}
                <Button disabled={isPending} type="submit" className="w-full">
                    Verify OTP
                </Button>
            </form>
        </Form>
    )
}

export default OtpForm