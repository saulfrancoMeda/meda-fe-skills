"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "@/components/ui/form-field";
import { AmountInput } from "@/components/ui/amount-input";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { isValidCLABE, isValidRFC } from "@/lib/utils/validators";

const schema = z.object({
  beneficiary: z.string().min(3, "Enter the beneficiary name"),
  clabe: z.string().refine(isValidCLABE, "CLABE must be 18 digits"),
  rfc: z.string().refine(isValidRFC, "Invalid RFC").or(z.literal("")),
  amount: z.number({ error: "Enter an amount" }).positive("Amount must be greater than 0"),
  concept: z.string().max(40, "Max 40 characters").optional(),
});
type TransferValues = z.infer<typeof schema>;

export function TransferForm({ onSubmit }: { onSubmit?: (v: TransferValues) => Promise<void> | void }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const { control, register, handleSubmit, getValues, formState: { errors, isValid } } =
    useForm<TransferValues>({ resolver: zodResolver(schema), mode: "onChange",
      defaultValues: { beneficiary: "", clabe: "", rfc: "", amount: undefined as unknown as number, concept: "" } });

  const doSubmit = async () => {
    setSubmitting(true);
    try { await onSubmit?.(getValues()); setConfirmOpen(false); } finally { setSubmitting(false); }
  };

  return (
    <>
      <form onSubmit={handleSubmit(() => setConfirmOpen(true))} className="flex flex-col gap-4 max-w-md">
        <FormField label="Beneficiary" placeholder="Full name" error={errors.beneficiary?.message} {...register("beneficiary")} />
        <FormField label="CLABE (18 digits)" placeholder="0000 0000 0000 0000 00" error={errors.clabe?.message} {...register("clabe")} />
        <FormField label="RFC (optional)" placeholder="XAXX010101000" error={errors.rfc?.message} {...register("rfc")} />
        <div>
          <label className="mb-1 block text-sm text-fg-secondary">Amount</label>
          <Controller name="amount" control={control}
            render={({ field }) => <AmountInput value={field.value ?? ""} onChange={field.onChange} error={!!errors.amount} />} />
          {errors.amount && <p className="mt-1 text-sm text-error">{errors.amount.message}</p>}
        </div>
        <FormField label="Concept (optional)" placeholder="Payment for..." error={errors.concept?.message} {...register("concept")} />
        <Button type="submit" variant="primary" disabled={!isValid} className="mt-2">Review transfer</Button>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={doSubmit}
        loading={submitting}
        title="Confirm transfer"
        description={`You're about to send $${getValues("amount") || 0} MXN to ${getValues("beneficiary") || "the beneficiary"}. This action can't be undone.`}
        confirmLabel="Send transfer"
      />
    </>
  );
}
