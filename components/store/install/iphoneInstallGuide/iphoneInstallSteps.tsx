import { IphoneStepVisual } from "@/components/store/install/iphoneInstallGuide/iphoneStepVisual";
import { Card } from "@/components/ui/card/card";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

const installSteps = [
  {
    title: "صفحه را در Safari باز کنید",
    description:
      "Safari را روی آیفون باز کنید و وارد وب‌سایت مهندس من شوید. نصب از مرورگرهای دیگر ممکن است گزینه لازم را نشان ندهد.",
    variant: "safari",
  },
  {
    title: "دکمه اشتراک‌گذاری را بزنید",
    description:
      "در نوار ابزار Safari روی نماد مربع با پیکان رو به بالا بزنید. جای این دکمه ممکن است با نسخه iOS کمی متفاوت باشد.",
    variant: "share",
  },
  {
    title: "گزینه افزودن به صفحه اصلی را انتخاب کنید",
    description: (
      <>
        در فهرست بازشده گزینه{" "}
        <bdi dir="ltr" className="font-semibold text-foreground">
          Add to Home Screen
        </bdi>{" "}
        را پیدا کنید. اگر دیده نمی‌شود، فهرست را به پایین پیمایش کنید.
      </>
    ),
    variant: "add-menu",
  },
  {
    title: "نام و آیکن را بررسی کنید",
    description:
      "پیش‌نمایش آیکن و نام «مهندس من» نمایش داده می‌شود. می‌توانید نام میان‌بر را کوتاه‌تر کنید.",
    variant: "preview",
  },
  {
    title: "روی Add بزنید",
    description: (
      <>
        دکمه{" "}
        <bdi dir="ltr" className="font-semibold text-foreground">
          Add
        </bdi>{" "}
        را در بالای صفحه بزنید تا وب‌اپ به صفحه اصلی اضافه شود.
      </>
    ),
    variant: "confirm",
  },
  {
    title: "مهندس من را از Home Screen باز کنید",
    description:
      "به صفحه اصلی آیفون برگردید و روی آیکن مهندس من بزنید. وب‌اپ در پنجره مستقل و بدون نوار مرورگر باز می‌شود.",
    variant: "home",
  },
] as const;

export function IphoneInstallSteps() {
  return (
    <ol className="grid items-stretch gap-4 lg:grid-cols-2">
      {installSteps.map((step, index) => (
        <li key={step.variant} className="h-full">
          <Card className="group flex h-full flex-col gap-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/15 hover:shadow-md motion-reduce:transform-none sm:flex-row sm:items-center sm:p-6">
            <IphoneStepVisual variant={step.variant} />

            <div className="min-w-0 flex-1">
              <span className="mb-4 inline-flex size-9 items-center justify-center rounded-xl bg-primary type-body-sm font-semibold text-primary-foreground shadow-xs">
                {formatFaNumber(index + 1)}
              </span>

              <h2 className="type-h3 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                {step.title}
              </h2>

              <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </div>
          </Card>
        </li>
      ))}
    </ol>
  );
}
