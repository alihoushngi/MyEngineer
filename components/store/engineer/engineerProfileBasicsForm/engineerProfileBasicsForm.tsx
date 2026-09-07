"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EngineerEditDialog } from "@/components/store/engineer/engineerEditDialog/engineerEditDialog";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { updateEngineerProfile } from "@/services/engineer-service/engineer-service";
import { type EngineerProfile } from "@/types/store/engineer.types";

const schema = z.object({
  firstName: z.string().trim().min(1, "نام الزامی است."),
  lastName: z.string().trim().min(1, "نام خانوادگی الزامی است."),
  profession: z.string().trim().min(1, "عنوان حرفه‌ای الزامی است."),
  about: z.string().trim().optional(),
});

type FormValues = z.infer<typeof schema>;

type EngineerProfileBasicsFormProps = {
  profile: EngineerProfile;
};

export function EngineerProfileBasicsForm({
  profile,
}: EngineerProfileBasicsFormProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(updateEngineerProfile);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      profession: profile.profession,
      about: profile.about ?? "",
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);

    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        profession: values.profession,
        about: values.about,
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
        icon={<PencilIcon aria-hidden="true" />}
        onClick={() => setOpen(true)}
      >
        {engineerPanelCopy.editLabel}
      </Button>

      <EngineerEditDialog
        open={open}
        onOpenChange={setOpen}
        title="ویرایش اطلاعات پایه"
        description="این اطلاعات روی پروفایل عمومی نمایش داده می‌شود. ذخیره تا اتصال API انجام نمی‌شود."
        pending={mutation.isPending}
        error={error}
        canSubmit={form.formState.isDirty && !mutation.isPending}
        onSubmit={() => void form.handleSubmit(onSubmit)()}
        onRetry={() => void form.handleSubmit(onSubmit)()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field invalid={Boolean(form.formState.errors.firstName)}>
            <FieldLabel htmlFor="engineer-first-name" required>
              نام
            </FieldLabel>
            <Input id="engineer-first-name" {...form.register("firstName")} />
            <FieldError>{form.formState.errors.firstName?.message}</FieldError>
          </Field>

          <Field invalid={Boolean(form.formState.errors.lastName)}>
            <FieldLabel htmlFor="engineer-last-name" required>
              نام خانوادگی
            </FieldLabel>
            <Input id="engineer-last-name" {...form.register("lastName")} />
            <FieldError>{form.formState.errors.lastName?.message}</FieldError>
          </Field>
        </div>

        <Field invalid={Boolean(form.formState.errors.profession)}>
          <FieldLabel htmlFor="engineer-profession" required>
            عنوان حرفه‌ای
          </FieldLabel>
          <Input id="engineer-profession" {...form.register("profession")} />
          <FieldError>{form.formState.errors.profession?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="engineer-about">درباره من</FieldLabel>
          <Textarea id="engineer-about" rows={5} {...form.register("about")} />
        </Field>
      </EngineerEditDialog>
    </>
  );
}
