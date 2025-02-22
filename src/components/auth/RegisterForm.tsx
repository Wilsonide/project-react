"use client";
import { useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas";
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
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async(values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      console.log("values =================================================================", values);
      setSuccess("");
      setError("");
      const res = await Axios.post('/auth/register',values)
      setSuccess(res.data.success)
      setError(res.data.error);
      navigate("/auth/login")
      
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.response) {
        setError('No server response')
      }
      
    } finally {
      setIsLoading(false);
    }
        
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });
  return (
    <div >
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        backButtonLink="Login"
        showSocial
        headerTitle="Register here"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Names"
                        type="text"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                        type="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        type="password"
                        disabled={isLoading}
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
                        placeholder="Confirm your password"
                        type="password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button className="w-full " type="submit" disabled={isLoading}>
              Create account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
