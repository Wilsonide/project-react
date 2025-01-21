
import { useState} from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { resetSchema } from "@/schemas";
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
import { Axios } from "@/lib/axios";


export const ResetForm = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async(values: z.infer<typeof resetSchema>) => {
    try {
      setIsLoading(true);
      setSuccess("");
      setError("");
      const res = await Axios.post('/auth/reset-password',JSON.stringify(values));
      console.log(res);
      setError(res.data?.error);
      setSuccess(res.data?.success);
      setIsLoading(false);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.response) {
        setError('No server response')
      }
      
    } finally {
      setIsLoading(false);
    }
    


  };

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <CardWrapper
    headerLabel="Forgot your password?"
    backButtonLink="Back to login"
    backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-64"
                      {...field}
                      placeholder="Enter your email address"
                      type="email"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
