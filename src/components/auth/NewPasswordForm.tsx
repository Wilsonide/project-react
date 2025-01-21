
import  { useState} from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { useSearchParams } from "react-router-dom";
import { Axios } from "@/lib/axios";

export const NewPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const [loading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const token = searchParams.get("token");

  const onSubmit = async(values: z.infer<typeof newPasswordSchema>) => {
    try {
      setIsLoading(true);
      const data = {values, token}
      setSuccess("");
      setError("");
      const res = await Axios.post('/auth/new-password',data);
      console.log(res);
      setError(res.data?.error);
      setSuccess(res.data?.success);
      setIsLoading(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.response) {
        setError('No server response')
      }
      
    } finally {
      setIsLoading(false);
    }
    
  };

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <CardWrapper
      headerLabel="Enter a password?"
      backButtonLink="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-64"
                      {...field}
                      placeholder="Enter a new password"
                      type="password"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirmPassword</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Your Password"
                      type="password"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full " type="submit" disabled={loading}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
