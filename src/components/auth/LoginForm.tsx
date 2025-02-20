
import { useState} from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas";
import useAuth from "@/hooks/useAuth";
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
import {Link, useLocation, useNavigate } from "react-router-dom";

export const LoginForm = () => {
 
  const {setAuth,Auth} = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/dashboard"
  const [loading, setIsloading] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = async(values: z.infer<typeof loginSchema>) => {
    try {
      setIsloading(true);
      setSuccess("");
      setError("");
      const res = await Axios.post('/auth/login',values)
          
      
      setError(res.data.error);
        
      if (res.data?.twoFactor) {
          setShowTwoFactor(true);
        } 
          
      setSuccess(res.data.success)
      setAuth((prev)=>{
        return {...prev, ...res.data}
      });
      console.log(Auth)
      navigate(from,{replace:true})
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error?.response) {
        setError('No server response')
      } else setError('User does not exist')
      
    } finally {
      setIsloading(false);
    }
    
  
                
   }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonLink="Signup"
      backButtonHref="/auth/register"
      showSocial
      headerTitle="Login here"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!showTwoFactor && (
              <>
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
                          disabled={loading}
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
                          disabled={loading}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="font-normal px-0"
                      >
                        <Link to="/auth/reset">Forgot Password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full " type="submit" disabled={loading}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
