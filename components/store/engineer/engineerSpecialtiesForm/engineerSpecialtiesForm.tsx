"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EngineerEditDialog } from "@/components/store/engineer/engineerEditDialog/engineerEditDialog";
import { Button } from "@/components/ui/button/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { updateEngineerSpecialties } from "@/services/engineer-service/engineer-actions";

const schema = z.object({
  specialtiesText: z.string(),
  softwareText: z.string(),
});

type FormValues = z.infer<typeof schema>;

type EngineerSpecialtiesFormProps = {
  specialties: readonly string[];
  software: readonly string[];
};

export function EngineerSpecialtiesForm({
  specialties,
  software,
}: EngineerSpecialtiesFormProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(updateEngineerSpecialties);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      specialtiesText: specialties.join("\n"),
      softwareText: software.join("\n"),
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);

    try {
      await mutation.mutateAsync({
        specialties: splitLines(values.specialtiesText),
        software: splitLines(values.softwareText),
      });
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        {engineerPanelCopy.editLabel}
      </Button>
      <EngineerEditDialog
        open={open}
        onOpenChange={setOpen}
        title="ویرایش تخصص‌ها و نرم‌افزارها"
        description="هر تخصص را با عنوان دقیق سرویس سامانه در یک خط بنویسید. نرم‌افزارها فعلاً در API پروفایل ذخیره نمی‌شوند."
        pending={mutation.isPending}
        error={error}
        canSubmit={form.formState.isDirty && !mutation.isPending}
        onSubmit={() => void form.handleSubmit(onSubmit)()}
        onRetry={() => void form.handleSubmit(onSubmit)()}
      >
        <Field>
          <FieldLabel htmlFor="engineer-specialties">تخصص‌ها</FieldLabel>
          <FieldDescription>
            مطابق حوزه‌های انتخاب‌شده در ثبت‌نام
          </FieldDescription>
          <Textarea
            id="engineer-specialties"
            rows={5}
            {...form.register("specialtiesText")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="engineer-software">نرم‌افزارها</FieldLabel>
          <Textarea
            id="engineer-software"
            rows={4}
            {...form.register("softwareText")}
          />
        </Field>
      </EngineerEditDialog>
    </>
  );
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}
