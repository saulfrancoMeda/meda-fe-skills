"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { MedaLogo } from "./meda-logo";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});
type LoginValues = z.infer<typeof schema>;

interface LoginFormProps {
  onSubmit: (values: LoginValues) => Promise<void> | void;
  error?: string;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<LoginValues>({ resolver: zodResolver(schema) });

  return (
    <div className="meda-fade-in mx-auto w-full max-w-sm rounded-meda border border-border-default bg-surface p-8 shadow-sm">
      <div className="mb-6 flex justify-center"><MedaLogo className="h-8 text-fg" /></div>
      <h1 className="mb-1 text-center text-xl font-semibold text-fg">Sign in</h1>
      <p className="mb-6 text-center text-sm text-fg-secondary">Access your MEDA account</p>

      {error && <div className="mb-4 rounded-meda border border-error bg-error/10 px-3 py-2 text-sm text-error-dark">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField label="Email" type="email" placeholder="you@meda.com.mx" error={errors.email?.message} {...register("email")} />
        <FormField label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
        <Button type="submit" variant="primary" loading={isSubmitting} className="mt-2 w-full">Sign in</Button>
      </form>
    </div>
  );
}
