# مستند APIهای آماده‌ی بک‌اند

> منبع: [`https://test.kbdcland.ir/openapi.json`](https://test.kbdcland.ir/openapi.json)  
> عنوان: **emohandes API — v1** · نسخه: **0.2.0-phase1** · OpenAPI: **3.0.3**  
> تاریخ تولید از اسکیما: **2026-09-15**

## خلاصه

- تعداد pathها: **62**
- تعداد عملیات (endpoint): **77**
- تعداد اسکیماها: **41**
- سرورها:
  - `/api/v1` — نسخه‌ی فعلی API

### قالب پاسخ استاندارد

اکثر endpointها داخل envelope زیر برمی‌گردند:

```json
{
  "success": true,
  "message": null,
  "data": {},
  "meta": null
}
```

در اسکیمای خام، فیلد `data` داخل `SuccessEnvelope` به‌صورت `[]` آمده (یعنی any)؛ در هر endpoint نوع واقعی `data` جداگانه مشخص شده است.

### احراز هویت

- **sanctum**: type=`http`, scheme=`bearer`, bearerFormat=`Sanctum Personal Access Token`
  - هدر `Authorization: Bearer {token}`. توکن از پاسخ‌های login/otp-verify/role به‌دست میاد. توجه: توکن‌های صادرشده از `/auth/role`‌ (انتخاب نقش) و `/auth/otp/verify` با purpose=password_reset «محدود» هستن و فقط ability مشخصی دارن؛ فراخوانی endpointهای دیگه با اون توکن‌ها ۴۰۳ می‌ده.

- security سراسری: `[{"sanctum": []}]`

### گروه‌ها (Tags)

- **Auth** (11) — ثبت‌نام، ورود، خروج، OTP، بازیابی رمز، انتخاب نقش، مدیریت نشست‌ها
- **System** (1) — بررسی سلامت سرویس
- **Lookup** (9) — داده‌های پایه‌ی فرم‌ها و فیلترها — استان، شهر، رشته، درخت سرویس، صلاحیت، نرم‌افزار، تگ
- **Profile** (15) — پروفایل کاربر جاری، گذرواژه، آواتار، تحصیلات/مدارک/سرویس‌ها/شهرهای مهندس
- **Professionals** (5) — جست‌وجوی عمومی متخصصان، صفحه‌ی جزئیات، نمونه‌کار و دیدگاه‌ها
- **Content** (22) — بلاگ، دانشنامه، سوالات متداول، فرم‌های قابل‌دانلود، اسلایدر، تیم، نظرات، برند، تماس، خبرنامه
- **Careers** (7) — آگهی شغلی و درخواست‌های همکاری
- **Tickets** (5) — تیکت پشتیبانی (Room/Ticket)
- **Admin** (2) — endpointهای مخصوص ادمین/دستیار (فاز ۲)

## فهرست سریع Endpointها

| Method | Path | Tag | Summary | Auth |
| --- | --- | --- | --- | --- |
| `POST` | `/auth/register` | Auth | ثبت‌نام کاربر جدید | خیر |
| `POST` | `/auth/login` | Auth | ورود با کد ملی و گذرواژه | خیر |
| `POST` | `/auth/role` | Auth | انتخاب نقش برای حساب چندنقشی | بله |
| `POST` | `/auth/otp` | Auth | درخواست کد یک‌بارمصرف پیامکی | خیر |
| `POST` | `/auth/otp/verify` | Auth | تأیید کد یک‌بارمصرف | خیر |
| `POST` | `/auth/password` | Auth | ثبت گذرواژه‌ی جدید (تکمیل بازیابی رمز) | بله |
| `GET` | `/auth/me` | Auth | اطلاعات کاربر واردشده | بله |
| `POST` | `/auth/logout` | Auth | خروج از دستگاه جاری (ابطال توکن فعلی) | بله |
| `POST` | `/auth/logout-all` | Auth | خروج از همه‌ی دستگاه‌ها (ابطال همه‌ی توکن‌ها) | بله |
| `GET` | `/auth/sessions` | Auth | فهرست نشست‌ها (دستگاه‌های واردشده) کاربر جاری | بله |
| `DELETE` | `/auth/sessions/{token}` | Auth | پایان‌دادن به یک نشست خاص | بله |
| `GET` | `/health` | System | بررسی سلامت اپلیکیشن و دیتابیس | خیر |
| `GET` | `/provinces` | Lookup | فهرست استان‌ها | خیر |
| `GET` | `/provinces/{province}/cities` | Lookup | شهرهای فعال یک استان | خیر |
| `GET` | `/cities` | Lookup | فهرست شهرهای فعال، با فیلتر اختیاری استان | خیر |
| `GET` | `/fields` | Lookup | فهرست رشته‌های تحصیلی | خیر |
| `GET` | `/services` | Lookup | درخت سرویس‌ها (فقط فعال) | خیر |
| `GET` | `/services/{slug}` | Lookup | یک سرویس به‌همراه زیرسرویس‌ها | خیر |
| `GET` | `/qualifications` | Lookup | فهرست صلاحیت‌ها/مدارک | خیر |
| `GET` | `/softwares` | Lookup | فهرست نرم‌افزارهای فعال | خیر |
| `GET` | `/tags` | Lookup | فهرست تگ‌ها | خیر |
| `GET` | `/profile` | Profile | مشاهده‌ی پروفایل کاربر جاری | بله |
| `PUT` | `/profile` | Profile | به‌روزرسانی پروفایل | بله |
| `PUT` | `/profile/password` | Profile | تغییر گذرواژه (نیازمند گذرواژه‌ی فعلی) | بله |
| `POST` | `/profile/avatar` | Profile | آپلود/جایگزینی تصویر پروفایل | بله |
| `GET` | `/profile/educations` | Profile | فهرست مدارک تحصیلی من (فقط نقش مهندس) | بله |
| `POST` | `/profile/educations` | Profile | ثبت مدرک تحصیلی جدید (در انتظار تأیید) | بله |
| `PUT` | `/profile/educations/{education}` | Profile | ویرایش مدرک تحصیلی (فقط مالک؛ دوباره در انتظار تأیید می‌رود) | بله |
| `DELETE` | `/profile/educations/{education}` | Profile | حذف مدرک تحصیلی (فقط مالک) | بله |
| `GET` | `/profile/certificates` | Profile | فهرست مدارک/گواهی‌های من (فقط نقش مهندس) | بله |
| `POST` | `/profile/certificates` | Profile | ثبت گواهی جدید (در انتظار تأیید) | بله |
| `DELETE` | `/profile/certificates/{certificate}` | Profile | حذف گواهی (فقط مالک) | بله |
| `GET` | `/profile/services` | Profile | سرویس‌های فعلیِ من (فقط نقش مهندس) | بله |
| `PUT` | `/profile/services` | Profile | جایگزینی کامل فهرست سرویس‌ها (هر سرویس جدید در انتظار تأیید می‌رود) | بله |
| `GET` | `/profile/cities` | Profile | شهرهای تحت پوشش من (فقط نقش مهندس) | بله |
| `PUT` | `/profile/cities` | Profile | جایگزینی کامل فهرست شهرهای تحت پوشش | بله |
| `GET` | `/professionals` | Professionals | جست‌وجو و فیلتر متخصصان (مهندس/مشاور/بیمه فعال) | خیر |
| `GET` | `/professionals/{professional}` | Professionals | صفحه‌ی جزئیات یک متخصص | خیر |
| `GET` | `/professionals/{professional}/portfolios` | Professionals | نمونه‌کارهای تأییدشده‌ی یک متخصص | خیر |
| `GET` | `/professionals/{professional}/comments` | Professionals | دیدگاه‌های تأییدشده‌ی یک متخصص | خیر |
| `POST` | `/professionals/{professional}/comments` | Professionals | ثبت دیدگاه (نیازمند ورود؛ در انتظار تأیید) | بله |
| `GET` | `/blogs` | Content | فهرست مقالات منتشرشده | خیر |
| `POST` | `/blogs` | Content | ثبت مقاله‌ی جدید (فاز ۲؛ فقط ادمین/دستیار؛ به‌صورت پیش‌نویس) | بله |
| `GET` | `/blogs/{slug}` | Content | جزئیات یک مقاله (بازدید +۱ اگر منتشرشده باشد) | خیر |
| `PUT` | `/blogs/{blog}` | Content | ویرایش مقاله (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `DELETE` | `/blogs/{blog}` | Content | حذف مقاله (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `PUT` | `/blogs/{blog}/publish` | Content | انتشار مقاله (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `PUT` | `/blogs/{blog}/unpublish` | Content | خارج‌کردن مقاله از انتشار (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `GET` | `/blog-categories` | Content | فهرست دسته‌های مقالات | خیر |
| `POST` | `/blog-categories` | Content | ثبت دسته‌بندی جدید (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `PUT` | `/blog-categories/{blogCategory}` | Content | ویرایش دسته‌بندی (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `DELETE` | `/blog-categories/{blogCategory}` | Content | حذف دسته‌بندی (فاز ۲؛ فقط ادمین/دستیار) | بله |
| `GET` | `/knowledges` | Content | فهرست محتوای دانشنامه (منتشرشده) | خیر |
| `GET` | `/knowledge-categories` | Content | فهرست دسته‌های دانشنامه | خیر |
| `GET` | `/faqs` | Content | سوالات متداول فعال (اختیاری بر اساس سرویس یا مقاله) | خیر |
| `GET` | `/forms` | Content | فهرست فرم‌های قابل‌دانلود فعال | خیر |
| `GET` | `/forms/{slug}/download` | Content | دانلود فایل فرم (شمارنده‌ی دانلود +۱) | خیر |
| `GET` | `/sliders` | Content | اسلایدرهای فعال صفحه‌ی اصلی | خیر |
| `GET` | `/teams` | Content | اعضای فعال تیم | خیر |
| `GET` | `/testimonials` | Content | نظرات مشتریان منتشرشده | خیر |
| `GET` | `/brands` | Content | برندهای فعال | خیر |
| `POST` | `/messages` | Content | ارسال پیام از فرم تماس با ما | خیر |
| `POST` | `/newsletter` | Content | عضویت در خبرنامه | خیر |
| `GET` | `/careers` | Careers | فهرست آگهی‌های شغلی فعال | خیر |
| `POST` | `/careers` | Careers | ثبت آگهی شغلی جدید (هر نقش واردشده مجاز است) | بله |
| `GET` | `/careers/{career}` | Careers | جزئیات یک آگهی شغلی فعال | خیر |
| `PUT` | `/careers/{career}` | Careers | ویرایش آگهی (فقط سازنده یا ادمین) | بله |
| `DELETE` | `/careers/{career}` | Careers | حذف آگهی (فقط سازنده یا ادمین) | بله |
| `GET` | `/careers/{career}/requests` | Careers | فهرست متقاضیان یک آگهی (فقط سازنده یا ادمین) | بله |
| `POST` | `/careers/{career}/apply` | Careers | درخواست همکاری برای یک آگهی (عمومی؛ بدون نیاز به ورود) | خیر |
| `GET` | `/tickets/rooms` | Tickets | فهرست تیکت‌های من (ادمین همه را می‌بیند) | بله |
| `POST` | `/tickets/rooms` | Tickets | ثبت تیکت جدید (همیشه به یکی از ادمین‌ها ارسال می‌شود) | بله |
| `GET` | `/tickets/rooms/{room}` | Tickets | جزئیات یک تیکت به‌همراه پیام‌ها (فقط طرفین یا ادمین) | بله |
| `POST` | `/tickets/rooms/{room}/reply` | Tickets | پاسخ در یک تیکت باز (فقط طرفین یا ادمین) | بله |
| `PUT` | `/tickets/rooms/{room}/close` | Tickets | بستن تیکت (فقط طرفین یا ادمین) | بله |
| `GET` | `/admin/professionals` | Admin | دایرکتوری متخصصان با شماره موبایل (فاز ۲؛ شامل حساب‌های غیرفعال) | بله |
| `GET` | `/admin/professionals/export` | Admin | خروجی اکسل از همان فهرست فیلترشده | بله |

## Auth

ثبت‌نام، ورود، خروج، OTP، بازیابی رمز، انتخاب نقش، مدیریت نشست‌ها

### `POST /auth/register`

**خلاصه:** ثبت‌نام کاربر جدید

حساب در وضعیت «غیرفعال» ساخته می‌شه و توکنی برنمی‌گرده؛ کاربر باید با `/auth/otp` (purpose=account_activation) کد بگیره و با `/auth/otp/verify` فعال‌سازی رو کامل کنه.

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `name` **(الزامی)** · string · example="علی"
- `family` **(الزامی)** · string · example="محمدی"
- `mobile` **(الزامی)** · string · example="09123456789" — شماره موبایل ایرانی
- `melli` **(الزامی)** · string · example="1234567890" — کد ملی ۱۰ رقمی
- `email` · string · format=email · nullable · example="ali@example.com"
- `password` **(الزامی)** · string · example="Passw0rd1" — حداقل ۸ کاراکتر، شامل حرف و عدد
- `password_confirmation` **(الزامی)** · string · example="Passw0rd1"

نمونه payload:

```json
{
  "name": "علی",
  "family": "محمدی",
  "mobile": "09123456789",
  "melli": "1234567890",
  "email": "ali@example.com",
  "password": "Passw0rd1",
  "password_confirmation": "Passw0rd1"
}
```

**پاسخ‌ها:**

- **201** — ثبت‌نام انجام شد؛ منتظر فعال‌سازی
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · object
    - `user` · `User` · object
    - `requires_verification` · boolean · example=true
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "user": {
      "id": 1,
      "name": "string",
      "family": "string",
      "full_name": "string",
      "mobile": "string",
      "melli": "string",
      "email": "string",
      "image": "string",
      "status": {
        "value": "active",
        "label": "فعال"
      },
      "mobile_verified": true,
      "role": {
        "id": 1,
        "name": "engineer",
        "title": "مهندس"
      },
      "created_at": "2026-01-01T00:00:00+03:30"
    },
    "requires_verification": true
  },
  "meta": {}
}
```
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/login`

**خلاصه:** ورود با کد ملی و گذرواژه

اگر کاربر بیش از یک نقش داشته باشه، پاسخ `requires_role_selection: true` برمی‌گردونه به‌همراه یک توکن محدود که فقط اجازه‌ی فراخوانی `/auth/role` رو داره؛ در غیر این‌صورت توکن کامل و اطلاعات کاربر برمی‌گرده.

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `melli` **(الزامی)** · string · example="1234567890" — کد ملی، دقیقاً ۱۰ رقم
- `password` **(الزامی)** · string · example="Passw0rd1"
- `device_name` · string — نام دستگاه؛ اگر ندید، از User-Agent گرفته می‌شه

نمونه payload:

```json
{
  "melli": "1234567890",
  "password": "Passw0rd1",
  "device_name": "string"
}
```

**پاسخ‌ها:**

- **200** — ورود موفق یا نیاز به انتخاب نقش
  - content-type: `application/json`
  - oneOf:
    - گزینه 1:
      - `LoginSuccess` · object
      - `success` · boolean · example=true
      - `message` · string · example="ورود با موفقیت انجام شد."
      - `data` · object
        - `requires_role_selection` · boolean · example=false
        - `token` · string
        - `token_type` · string · example="Bearer"
        - `user` · `User` · object
    - گزینه 2:
      - `LoginRequiresRoleSelection` · object
      - `success` · boolean · example=true
      - `message` · string · example="لطفاً نقشی که می‌خواهید با آن وارد شوید را انتخاب کنید."
      - `data` · object
        - `requires_role_selection` · boolean · example=true
        - `token` · string — توکن محدود؛ فقط برای فراخوانی /auth/role معتبر است
        - `token_type` · string · example="Bearer"
        - `available_roles` · array
          - items · `Role` · object
            - `id` · integer
            - `name` · string · example="engineer"
            - `title` · string · example="مهندس"
  - نمونه response:

```json
{
  "success": true,
  "message": "ورود با موفقیت انجام شد.",
  "data": {
    "requires_role_selection": false,
    "token": "string",
    "token_type": "Bearer",
    "user": {
      "id": 1,
      "name": "string",
      "family": "string",
      "full_name": "string",
      "mobile": "string",
      "melli": "string",
      "email": "string",
      "image": "string",
      "status": {
        "value": "active",
        "label": "فعال"
      },
      "mobile_verified": true,
      "role": {
        "id": {},
        "name": {},
        "title": {}
      },
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  }
}
```
- **401** — کد ملی یا گذرواژه نادرست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **403** — حساب غیرفعال یا مسدود است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/role`

**خلاصه:** انتخاب نقش برای حساب چندنقشی

فقط با توکن محدودی که `/auth/login` یا مسیرهای ورود پیامکی/OTP هنگام `requires_role_selection: true` برمی‌گردونن قابل‌فراخوانی‌ست.

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `role` **(الزامی)** · string · enum=["admin", "user", "assistant", "engineer", "consulter", "insurance"]
- `device_name` · string

نمونه payload:

```json
{
  "role": "admin",
  "device_name": "string"
}
```

**پاسخ‌ها:**

- **200** — نقش انتخاب شد؛ توکن کامل صادر شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · object
    - `token` · string
    - `token_type` · string · example="Bearer"
    - `user` · `User` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "token": "string",
    "token_type": "Bearer",
    "user": {
      "id": 1,
      "name": "string",
      "family": "string",
      "full_name": "string",
      "mobile": "string",
      "melli": "string",
      "email": "string",
      "image": "string",
      "status": {
        "value": "active",
        "label": "فعال"
      },
      "mobile_verified": true,
      "role": {
        "id": 1,
        "name": "engineer",
        "title": "مهندس"
      },
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/otp`

**خلاصه:** درخواست کد یک‌بارمصرف پیامکی

یک endpoint برای هر سه کاربرد: فعال‌سازی حساب، ورود پیامکی و بازیابی رمز (با فیلد `purpose`). پاسخ همیشه یکسانه چه شماره ثبت‌شده باشه چه نباشه، تا این مسیر ابزار کشف شماره‌های ثبت‌شده نشه.

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `mobile` **(الزامی)** · string · example="09123456789"
- `purpose` **(الزامی)** · string · enum=["account_activation", "login", "password_reset"]

نمونه payload:

```json
{
  "mobile": "09123456789",
  "purpose": "account_activation"
}
```

**پاسخ‌ها:**

- **200** — در صورت وجود حساب مطابق، کد ارسال شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · object
    - `resend_after` · integer · example=120 — چند ثانیه دیگر می‌توان کد را دوباره درخواست کرد
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "resend_after": 120
  },
  "meta": {}
}
```
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/otp/verify`

**خلاصه:** تأیید کد یک‌بارمصرف

بسته به `purpose`، پاسخ فرق می‌کنه: فعال‌سازی و ورود پیامکی یک نشست کامل (مثل login) برمی‌گردونن؛ بازیابی رمز فقط یک توکن محدود برای فراخوانی `/auth/password` می‌ده.

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `mobile` **(الزامی)** · string · example="09123456789"
- `purpose` **(الزامی)** · string · enum=["account_activation", "login", "password_reset"]
- `code` **(الزامی)** · string · example="123456"
- `device_name` · string

نمونه payload:

```json
{
  "mobile": "09123456789",
  "purpose": "account_activation",
  "code": "123456",
  "device_name": "string"
}
```

**پاسخ‌ها:**

- **200** — کد صحیح بود
  - content-type: `application/json`
  - oneOf:
    - گزینه 1:
      - `LoginSuccess` · object
      - `success` · boolean · example=true
      - `message` · string · example="ورود با موفقیت انجام شد."
      - `data` · object
        - `requires_role_selection` · boolean · example=false
        - `token` · string
        - `token_type` · string · example="Bearer"
        - `user` · `User` · object
    - گزینه 2:
      - `LoginRequiresRoleSelection` · object
      - `success` · boolean · example=true
      - `message` · string · example="لطفاً نقشی که می‌خواهید با آن وارد شوید را انتخاب کنید."
      - `data` · object
        - `requires_role_selection` · boolean · example=true
        - `token` · string — توکن محدود؛ فقط برای فراخوانی /auth/role معتبر است
        - `token_type` · string · example="Bearer"
        - `available_roles` · array
          - items · `Role` · object
            - `id` · integer
            - `name` · string · example="engineer"
            - `title` · string · example="مهندس"
    - گزینه 3:
      - `PasswordResetTokenIssued` · object
      - `success` · boolean · example=true
      - `message` · string · example="کد تأیید شد. اکنون گذرواژه جدید را ثبت کنید."
      - `data` · object
        - `token` · string — توکن محدود؛ فقط برای فراخوانی POST /auth/password معتبر است
        - `token_type` · string · example="Bearer"
  - نمونه response:

```json
{
  "success": true,
  "message": "ورود با موفقیت انجام شد.",
  "data": {
    "requires_role_selection": false,
    "token": "string",
    "token_type": "Bearer",
    "user": {
      "id": 1,
      "name": "string",
      "family": "string",
      "full_name": "string",
      "mobile": "string",
      "melli": "string",
      "email": "string",
      "image": "string",
      "status": {
        "value": "active",
        "label": "فعال"
      },
      "mobile_verified": true,
      "role": {
        "id": {},
        "name": {},
        "title": {}
      },
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  }
}
```
- **422** — کد نادرست یا منقضی‌شده / خطای اعتبارسنجی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/password`

**خلاصه:** ثبت گذرواژه‌ی جدید (تکمیل بازیابی رمز)

فقط با توکن محدود `password_reset` که `/auth/otp/verify` صادر می‌کنه قابل‌فراخوانی‌ست؛ این توکن به‌محض استفاده باطل می‌شه.

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `password` **(الزامی)** · string · example="NewPass1"
- `password_confirmation` **(الزامی)** · string · example="NewPass1"

نمونه payload:

```json
{
  "password": "NewPass1",
  "password_confirmation": "NewPass1"
}
```

**پاسخ‌ها:**

- **200** — گذرواژه تغییر کرد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /auth/me`

**خلاصه:** اطلاعات کاربر واردشده

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — اطلاعات کاربر جاری
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `User` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `full_name` · string
    - `mobile` · string
    - `melli` · string
    - `email` · string · nullable
    - `image` · string · nullable
    - `status` · object
    - `mobile_verified` · boolean
    - `role` · `Role` · object
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "full_name": "string",
    "mobile": "string",
    "melli": "string",
    "email": "string",
    "image": "string",
    "status": {
      "value": "active",
      "label": "فعال"
    },
    "mobile_verified": true,
    "role": {
      "id": 1,
      "name": "engineer",
      "title": "مهندس"
    },
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/logout`

**خلاصه:** خروج از دستگاه جاری (ابطال توکن فعلی)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — خروج انجام شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /auth/logout-all`

**خلاصه:** خروج از همه‌ی دستگاه‌ها (ابطال همه‌ی توکن‌ها)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — از همه‌ی دستگاه‌ها خارج شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /auth/sessions`

**خلاصه:** فهرست نشست‌ها (دستگاه‌های واردشده) کاربر جاری

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست نشست‌های فعال
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Session` · object
      - `id` · integer
      - `device` · string
      - `abilities` · array
      - `current` · boolean
      - `last_used_at` · string · format=date-time · nullable
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "device": "string",
      "abilities": [
        "string"
      ],
      "current": true,
      "last_used_at": "2026-01-01T00:00:00+03:30",
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `DELETE /auth/sessions/{token}`

**خلاصه:** پایان‌دادن به یک نشست خاص

فقط روی توکن‌های متعلق به خود کاربر؛ در غیر این‌صورت ۴۰۴.

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `token` | `path` | بله | `integer` | شناسه‌ی عددی نشست (از خروجی /auth/sessions) |

**پاسخ‌ها:**

- **200** — نشست پایان یافت
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **404** — نشستی با این شناسه (متعلق به کاربر جاری) یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## System

بررسی سلامت سرویس

### `GET /health`

**خلاصه:** بررسی سلامت اپلیکیشن و دیتابیس

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — سرویس و دیتابیس هر دو سالم‌اند
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `HealthData` · object
    - `application` · string · example="emohandes"
    - `environment` · string · example="production"
    - `api_version` · string · example="v1"
    - `database` · string · enum=["up", "down"]
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "application": "emohandes",
    "environment": "production",
    "api_version": "v1",
    "database": "up"
  },
  "meta": {}
}
```
- **503** — اپلیکیشن بالاست ولی دیتابیس در دسترس نیست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `HealthData` · object
    - `application` · string · example="emohandes"
    - `environment` · string · example="production"
    - `api_version` · string · example="v1"
    - `database` · string · enum=["up", "down"]
  - `meta` · object · nullable

---

## Lookup

داده‌های پایه‌ی فرم‌ها و فیلترها — استان، شهر، رشته، درخت سرویس، صلاحیت، نرم‌افزار، تگ

### `GET /provinces`

**خلاصه:** فهرست استان‌ها

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست استان‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Province` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `image` · string · nullable
      - `latitude` · string · nullable
      - `longitude` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /provinces/{province}/cities`

**خلاصه:** شهرهای فعال یک استان

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `province` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست شهرها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `City` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `province_id` · integer
      - `image` · string · nullable
      - `latitude` · string · nullable
      - `longitude` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /cities`

**خلاصه:** فهرست شهرهای فعال، با فیلتر اختیاری استان

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `province_id` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست شهرها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `City` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `province_id` · integer
      - `image` · string · nullable
      - `latitude` · string · nullable
      - `longitude` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /fields`

**خلاصه:** فهرست رشته‌های تحصیلی

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست رشته‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Field` · object
      - `id` · integer
      - `name` · string
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /services`

**خلاصه:** درخت سرویس‌ها (فقط فعال)

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — درخت والد/فرزند سرویس‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ServiceNode` · object
      - `id` · integer
      - `title` · string
      - `short_title` · string
      - `slug` · string
      - `description` · string
      - `image` · string · nullable
      - `parent_id` · integer · nullable
      - `children` · array
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "short_title": "string",
      "slug": "string",
      "description": "string",
      "image": "string",
      "parent_id": 1,
      "children": [
        "<ServiceNode>"
      ]
    }
  ],
  "meta": {}
}
```

---

### `GET /services/{slug}`

**خلاصه:** یک سرویس به‌همراه زیرسرویس‌ها

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `slug` | `path` | بله | `string` |  |

**پاسخ‌ها:**

- **200** — جزئیات سرویس
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `ServiceNode` · object
    - `id` · integer
    - `title` · string
    - `short_title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `parent_id` · integer · nullable
    - `children` · array
      - items
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "short_title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "parent_id": 1,
    "children": [
      "<ServiceNode>"
    ]
  },
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /qualifications`

**خلاصه:** فهرست صلاحیت‌ها/مدارک

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست صلاحیت‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Qualification` · object
      - `id` · integer
      - `title` · string
      - `slug` · string
      - `parent_id` · integer · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "slug": "string",
      "parent_id": 1
    }
  ],
  "meta": {}
}
```

---

### `GET /softwares`

**خلاصه:** فهرست نرم‌افزارهای فعال

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست نرم‌افزارها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Software` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `image` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /tags`

**خلاصه:** فهرست تگ‌ها

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست تگ‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Tag` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string"
    }
  ],
  "meta": {}
}
```

---

## Profile

پروفایل کاربر جاری، گذرواژه، آواتار، تحصیلات/مدارک/سرویس‌ها/شهرهای مهندس

### `GET /profile`

**خلاصه:** مشاهده‌ی پروفایل کاربر جاری

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — پروفایل کاربر جاری
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Profile` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `mobile` · string
    - `melli` · string
    - `email` · string · nullable
    - `image` · string · nullable
    - `role` · `Role` · object
    - `gender` · string · nullable
    - `birthday` · string · format=date · nullable
    - `bio` · string · nullable
    - `marital_status` · string · nullable
    - `working_years` · string · nullable
    - `phone_contact` · string · nullable
    - `text_contact` · string · nullable
    - `show_mobile` · string · nullable
    - `show_image` · string · nullable
    - `province` · `Province` · object
    - `city` · `City` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "mobile": "string",
    "melli": "string",
    "email": "string",
    "image": "string",
    "role": {
      "id": 1,
      "name": "engineer",
      "title": "مهندس"
    },
    "gender": "string",
    "birthday": "2026-01-01",
    "bio": "string",
    "marital_status": "string",
    "working_years": "string",
    "phone_contact": "string",
    "text_contact": "string",
    "show_mobile": "string",
    "show_image": "string",
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /profile`

**خلاصه:** به‌روزرسانی پروفایل

`mobile` و `melli` قابل‌تغییر نیستن (شناسه‌های تأییدشده‌اند). همه‌ی فیلدها اختیاری‌اند؛ فقط فیلدهای ارسالی به‌روز می‌شن.

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=خیر

فیلدها:

- object
- `name` · string
- `family` · string
- `email` · string · format=email · nullable
- `gender` · string · enum=["male", "female"]
- `birthday` · string · format=date
- `bio` · string
- `marital_status` · string · enum=["single", "married"]
- `working_years` · string · example="5"
- `phone_contact` · string
- `text_contact` · string
- `show_mobile` · string · enum=["yes", "no"]
- `show_image` · string · enum=["yes", "no"]
- `province_id` · integer
- `city_id` · integer

نمونه payload:

```json
{
  "name": "string",
  "family": "string",
  "email": "user@example.com",
  "gender": "male",
  "birthday": "2026-01-01",
  "bio": "string",
  "marital_status": "single",
  "working_years": "5",
  "phone_contact": "string",
  "text_contact": "string",
  "show_mobile": "yes",
  "show_image": "yes",
  "province_id": 1,
  "city_id": 1
}
```

**پاسخ‌ها:**

- **200** — پروفایل به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Profile` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `mobile` · string
    - `melli` · string
    - `email` · string · nullable
    - `image` · string · nullable
    - `role` · `Role` · object
    - `gender` · string · nullable
    - `birthday` · string · format=date · nullable
    - `bio` · string · nullable
    - `marital_status` · string · nullable
    - `working_years` · string · nullable
    - `phone_contact` · string · nullable
    - `text_contact` · string · nullable
    - `show_mobile` · string · nullable
    - `show_image` · string · nullable
    - `province` · `Province` · object
    - `city` · `City` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "mobile": "string",
    "melli": "string",
    "email": "string",
    "image": "string",
    "role": {
      "id": 1,
      "name": "engineer",
      "title": "مهندس"
    },
    "gender": "string",
    "birthday": "2026-01-01",
    "bio": "string",
    "marital_status": "string",
    "working_years": "string",
    "phone_contact": "string",
    "text_contact": "string",
    "show_mobile": "string",
    "show_image": "string",
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /profile/password`

**خلاصه:** تغییر گذرواژه (نیازمند گذرواژه‌ی فعلی)

پس از تغییر، همه‌ی نشست‌های دیگر باطل می‌شن؛ نشست جاری فعال می‌ماند.

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `current_password` **(الزامی)** · string
- `password` **(الزامی)** · string
- `password_confirmation` **(الزامی)** · string

نمونه payload:

```json
{
  "current_password": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

**پاسخ‌ها:**

- **200** — گذرواژه تغییر کرد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /profile/avatar`

**خلاصه:** آپلود/جایگزینی تصویر پروفایل

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- object
- `image` **(الزامی)** · string · format=binary — jpg/jpeg/png/webp — حداکثر ۲ مگابایت

نمونه payload:

```json
{
  "image": "<binary>"
}
```

**پاسخ‌ها:**

- **200** — تصویر به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Profile` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `mobile` · string
    - `melli` · string
    - `email` · string · nullable
    - `image` · string · nullable
    - `role` · `Role` · object
    - `gender` · string · nullable
    - `birthday` · string · format=date · nullable
    - `bio` · string · nullable
    - `marital_status` · string · nullable
    - `working_years` · string · nullable
    - `phone_contact` · string · nullable
    - `text_contact` · string · nullable
    - `show_mobile` · string · nullable
    - `show_image` · string · nullable
    - `province` · `Province` · object
    - `city` · `City` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "mobile": "string",
    "melli": "string",
    "email": "string",
    "image": "string",
    "role": {
      "id": 1,
      "name": "engineer",
      "title": "مهندس"
    },
    "gender": "string",
    "birthday": "2026-01-01",
    "bio": "string",
    "marital_status": "string",
    "working_years": "string",
    "phone_contact": "string",
    "text_contact": "string",
    "show_mobile": "string",
    "show_image": "string",
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /profile/educations`

**خلاصه:** فهرست مدارک تحصیلی من (فقط نقش مهندس)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Education` · object
      - `id` · integer
      - `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
      - `university` · string · nullable
      - `document` · string · nullable
      - `status` · string · enum=["yes", "no", "rejected"]
      - `field` · `Field` · object
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "level": "zire_diplom",
      "university": "string",
      "document": "string",
      "status": "yes",
      "field": {
        "id": 1,
        "name": "string"
      },
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /profile/educations`

**خلاصه:** ثبت مدرک تحصیلی جدید (در انتظار تأیید)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- object
- `level` **(الزامی)** · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `university` · string
- `field_id` **(الزامی)** · integer
- `document` · string · format=binary

نمونه payload:

```json
{
  "level": "zire_diplom",
  "university": "string",
  "field_id": 1,
  "document": "<binary>"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Education` · object
    - `id` · integer
    - `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
    - `university` · string · nullable
    - `document` · string · nullable
    - `status` · string · enum=["yes", "no", "rejected"]
    - `field` · `Field` · object
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "level": "zire_diplom",
    "university": "string",
    "document": "string",
    "status": "yes",
    "field": {
      "id": 1,
      "name": "string"
    },
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /profile/educations/{education}`

**خلاصه:** ویرایش مدرک تحصیلی (فقط مالک؛ دوباره در انتظار تأیید می‌رود)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `education` | `path` | بله | `integer` |  |

**Body:** content-type=`multipart/form-data` · الزامی=خیر

فیلدها:

- object
- `level` **(الزامی)** · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `university` · string
- `field_id` **(الزامی)** · integer
- `document` · string · format=binary

نمونه payload:

```json
{
  "level": "zire_diplom",
  "university": "string",
  "field_id": 1,
  "document": "<binary>"
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Education` · object
    - `id` · integer
    - `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
    - `university` · string · nullable
    - `document` · string · nullable
    - `status` · string · enum=["yes", "no", "rejected"]
    - `field` · `Field` · object
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "level": "zire_diplom",
    "university": "string",
    "document": "string",
    "status": "yes",
    "field": {
      "id": 1,
      "name": "string"
    },
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `DELETE /profile/educations/{education}`

**خلاصه:** حذف مدرک تحصیلی (فقط مالک)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `education` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — حذف شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /profile/certificates`

**خلاصه:** فهرست مدارک/گواهی‌های من (فقط نقش مهندس)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Certificate` · object
      - `id` · integer
      - `title` · string
      - `image` · string · nullable
      - `status` · string · enum=["yes", "no"]
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "image": "string",
      "status": "yes",
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```

---

### `POST /profile/certificates`

**خلاصه:** ثبت گواهی جدید (در انتظار تأیید)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- object
- `title` **(الزامی)** · string
- `image` · string · format=binary

نمونه payload:

```json
{
  "title": "string",
  "image": "<binary>"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Certificate` · object
    - `id` · integer
    - `title` · string
    - `image` · string · nullable
    - `status` · string · enum=["yes", "no"]
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "image": "string",
    "status": "yes",
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```

---

### `DELETE /profile/certificates/{certificate}`

**خلاصه:** حذف گواهی (فقط مالک)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `certificate` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — حذف شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /profile/services`

**خلاصه:** سرویس‌های فعلیِ من (فقط نقش مهندس)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ServiceNode` · object
      - `id` · integer
      - `title` · string
      - `short_title` · string
      - `slug` · string
      - `description` · string
      - `image` · string · nullable
      - `parent_id` · integer · nullable
      - `children` · array
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "short_title": "string",
      "slug": "string",
      "description": "string",
      "image": "string",
      "parent_id": 1,
      "children": [
        "<ServiceNode>"
      ]
    }
  ],
  "meta": {}
}
```

---

### `PUT /profile/services`

**خلاصه:** جایگزینی کامل فهرست سرویس‌ها (هر سرویس جدید در انتظار تأیید می‌رود)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `service_ids` **(الزامی)** · array
  - items · integer

نمونه payload:

```json
{
  "service_ids": [
    1
  ]
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ServiceNode` · object
      - `id` · integer
      - `title` · string
      - `short_title` · string
      - `slug` · string
      - `description` · string
      - `image` · string · nullable
      - `parent_id` · integer · nullable
      - `children` · array
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "short_title": "string",
      "slug": "string",
      "description": "string",
      "image": "string",
      "parent_id": 1,
      "children": [
        "<ServiceNode>"
      ]
    }
  ],
  "meta": {}
}
```
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /profile/cities`

**خلاصه:** شهرهای تحت پوشش من (فقط نقش مهندس)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `City` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `province_id` · integer
      - `image` · string · nullable
      - `latitude` · string · nullable
      - `longitude` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "meta": {}
}
```

---

### `PUT /profile/cities`

**خلاصه:** جایگزینی کامل فهرست شهرهای تحت پوشش

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `city_ids` **(الزامی)** · array
  - items · integer

نمونه payload:

```json
{
  "city_ids": [
    1
  ]
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `City` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `province_id` · integer
      - `image` · string · nullable
      - `latitude` · string · nullable
      - `longitude` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "meta": {}
}
```

---

## Professionals

جست‌وجوی عمومی متخصصان، صفحه‌ی جزئیات، نمونه‌کار و دیدگاه‌ها

### `GET /professionals`

**خلاصه:** جست‌وجو و فیلتر متخصصان (مهندس/مشاور/بیمه فعال)

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `role` | `query` | خیر | `string enum=["engineer", "consulter", "insurance"]` |  |
| `province_id` | `query` | خیر | `integer` |  |
| `city_ids[]` | `query` | خیر | `array` |  |
| `service_id` | `query` | خیر | `integer` |  |
| `field_id` | `query` | خیر | `integer` |  |
| `qualification_id` | `query` | خیر | `integer` |  |
| `min_experience` | `query` | خیر | `integer` | حداقل سال سابقه |
| `has_license` | `query` | خیر | `boolean` | حداقل یک گواهی تأییدشده دارد |
| `sort` | `query` | خیر | `string enum=["newest", "rating"]` |  |
| `per_page` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده‌ی متخصصان
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ProfessionalCard` · object
      - `id` · integer
      - `name` · string
      - `family` · string
      - `full_name` · string
      - `image` · string · nullable
      - `role` · string · enum=["engineer", "consulter", "insurance"]
      - `city` · string · nullable
      - `province` · string · nullable
      - `working_years` · string · nullable
      - `rating` · number · nullable · example=4.5
      - `rating_count` · integer
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "family": "string",
      "full_name": "string",
      "image": "string",
      "role": "engineer",
      "city": "string",
      "province": "string",
      "working_years": "string",
      "rating": 4.5,
      "rating_count": 1
    }
  ],
  "meta": {}
}
```

---

### `GET /professionals/{professional}`

**خلاصه:** صفحه‌ی جزئیات یک متخصص

شماره/راه ارتباطی بسته به `show_mobile` و تصویر بسته به `show_image` نمایش داده می‌شود.

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `professional` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — جزئیات
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `ProfessionalDetail` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `full_name` · string
    - `image` · string · nullable — null اگر show_image=no
    - `mobile` · string · nullable — null اگر show_mobile=no
    - `phone_contact` · string · nullable
    - `role` · string · enum=["engineer", "consulter", "insurance"]
    - `bio` · string · nullable
    - `working_years` · string · nullable
    - `province` · `Province` · object
    - `city` · `City` · object
    - `cities_covered` · array
      - items · `City` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
        - `province_id` · integer
        - `image` · string · nullable
        - `latitude` · string · nullable
        - `longitude` · string · nullable
    - `services` · array
      - items · `ServiceNode` · object
        - `id` · integer
        - `title` · string
        - `short_title` · string
        - `slug` · string
        - `description` · string
        - `image` · string · nullable
        - `parent_id` · integer · nullable
        - `children` · array
    - `qualifications` · array
      - items · `Qualification` · object
        - `id` · integer
        - `title` · string
        - `slug` · string
        - `parent_id` · integer · nullable
    - `educations` · array
      - items · `Education` · object
        - `id` · integer
        - `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
        - `university` · string · nullable
        - `document` · string · nullable
        - `status` · string · enum=["yes", "no", "rejected"]
        - `field` · `Field` · object
        - `created_at` · string · format=date-time · nullable
    - `certificates` · array
      - items · `Certificate` · object
        - `id` · integer
        - `title` · string
        - `image` · string · nullable
        - `status` · string · enum=["yes", "no"]
        - `created_at` · string · format=date-time · nullable
    - `rating` · number · nullable
    - `rating_count` · integer
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "full_name": "string",
    "image": "string",
    "mobile": "string",
    "phone_contact": "string",
    "role": "engineer",
    "bio": "string",
    "working_years": "string",
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "cities_covered": [
      {
        "id": 1,
        "name": "string",
        "slug": "string",
        "province_id": 1,
        "image": "string",
        "latitude": "string",
        "longitude": "string"
      }
    ],
    "services": [
      {
        "id": 1,
        "title": "string",
        "short_title": "string",
        "slug": "string",
        "description": "string",
        "image": "string",
        "parent_id": 1,
        "children": [
          {}
        ]
      }
    ],
    "qualifications": [
      {
        "id": 1,
        "title": "string",
        "slug": "string",
        "parent_id": 1
      }
    ],
    "educations": [
      {
        "id": 1,
        "level": "zire_diplom",
        "university": "string",
        "document": "string",
        "status": "yes",
        "field": {},
        "created_at": "2026-01-01T00:00:00+03:30"
      }
    ],
    "certificates": [
      {
        "id": 1,
        "title": "string",
        "image": "string",
        "status": "yes",
        "created_at": "2026-01-01T00:00:00+03:30"
      }
    ],
    "rating": 1.0,
    "rating_count": 1
  },
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /professionals/{professional}/portfolios`

**خلاصه:** نمونه‌کارهای تأییدشده‌ی یک متخصص

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `professional` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Portfolio` · object
      - `id` · integer
      - `image` · string · nullable
      - `suggested` · boolean
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "image": "string",
      "suggested": true
    }
  ],
  "meta": {}
}
```

---

### `GET /professionals/{professional}/comments`

**خلاصه:** دیدگاه‌های تأییدشده‌ی یک متخصص

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `professional` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ProfessionalComment` · object
      - `id` · integer
      - `title` · string
      - `comment` · string
      - `rate` · integer
      - `author` · string · nullable
      - `replies` · array
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "comment": "string",
      "rate": 1,
      "author": "string",
      "replies": [
        "<ProfessionalComment>"
      ],
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```

---

### `POST /professionals/{professional}/comments`

**خلاصه:** ثبت دیدگاه (نیازمند ورود؛ در انتظار تأیید)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `professional` | `path` | بله | `integer` |  |

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `title` **(الزامی)** · string
- `comment` **(الزامی)** · string
- `rate` **(الزامی)** · integer

نمونه payload:

```json
{
  "title": "string",
  "comment": "string",
  "rate": 1
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `ProfessionalComment` · object
    - `id` · integer
    - `title` · string
    - `comment` · string
    - `rate` · integer
    - `author` · string · nullable
    - `replies` · array
      - items
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "comment": "string",
    "rate": 1,
    "author": "string",
    "replies": [
      "<ProfessionalComment>"
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## Content

بلاگ، دانشنامه، سوالات متداول، فرم‌های قابل‌دانلود، اسلایدر، تیم، نظرات، برند، تماس، خبرنامه

### `GET /blogs`

**خلاصه:** فهرست مقالات منتشرشده

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category_id` | `query` | خیر | `integer` |  |
| `per_page` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Blog` · object
      - `id` · integer
      - `title` · string
      - `slug` · string
      - `description` · string
      - `image` · string · nullable
      - `views` · string
      - `status` · string · enum=["yes", "no"]
      - `category` · `BlogCategory` · object
      - `tags` · array
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "slug": "string",
      "description": "string",
      "image": "string",
      "views": "string",
      "status": "yes",
      "category": {
        "id": 1,
        "name": "string",
        "slug": "string",
        "parent_id": 1
      },
      "tags": [
        {
          "id": {},
          "name": {},
          "slug": {}
        }
      ],
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```

---

### `POST /blogs`

**خلاصه:** ثبت مقاله‌ی جدید (فاز ۲؛ فقط ادمین/دستیار؛ به‌صورت پیش‌نویس)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- `BlogInput` · object
- `title` **(الزامی)** · string
- `blog_category_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `image` · string · format=binary
- `tag_ids` · array
  - items · integer

نمونه payload:

```json
{
  "title": "string",
  "blog_category_id": 1,
  "description": "string",
  "image": "<binary>",
  "tag_ids": [
    1
  ]
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Blog` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `views` · string
    - `status` · string · enum=["yes", "no"]
    - `category` · `BlogCategory` · object
    - `tags` · array
      - items · `Tag` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "views": "string",
    "status": "yes",
    "category": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    },
    "tags": [
      {
        "id": 1,
        "name": "string",
        "slug": "string"
      }
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /blogs/{slug}`

**خلاصه:** جزئیات یک مقاله (بازدید +۱ اگر منتشرشده باشد)

پیش‌نویس فقط برای نویسنده یا ادمین/دستیار قابل‌مشاهده است.

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `slug` | `path` | بله | `string` |  |

**پاسخ‌ها:**

- **200** — جزئیات
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Blog` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `views` · string
    - `status` · string · enum=["yes", "no"]
    - `category` · `BlogCategory` · object
    - `tags` · array
      - items · `Tag` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "views": "string",
    "status": "yes",
    "category": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    },
    "tags": [
      {
        "id": 1,
        "name": "string",
        "slug": "string"
      }
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /blogs/{blog}`

**خلاصه:** ویرایش مقاله (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blog` | `path` | بله | `integer` |  |

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- `BlogInput` · object
- `title` **(الزامی)** · string
- `blog_category_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `image` · string · format=binary
- `tag_ids` · array
  - items · integer

نمونه payload:

```json
{
  "title": "string",
  "blog_category_id": 1,
  "description": "string",
  "image": "<binary>",
  "tag_ids": [
    1
  ]
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Blog` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `views` · string
    - `status` · string · enum=["yes", "no"]
    - `category` · `BlogCategory` · object
    - `tags` · array
      - items · `Tag` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "views": "string",
    "status": "yes",
    "category": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    },
    "tags": [
      {
        "id": 1,
        "name": "string",
        "slug": "string"
      }
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `DELETE /blogs/{blog}`

**خلاصه:** حذف مقاله (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blog` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — حذف شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /blogs/{blog}/publish`

**خلاصه:** انتشار مقاله (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blog` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — منتشر شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Blog` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `views` · string
    - `status` · string · enum=["yes", "no"]
    - `category` · `BlogCategory` · object
    - `tags` · array
      - items · `Tag` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "views": "string",
    "status": "yes",
    "category": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    },
    "tags": [
      {
        "id": 1,
        "name": "string",
        "slug": "string"
      }
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /blogs/{blog}/unpublish`

**خلاصه:** خارج‌کردن مقاله از انتشار (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blog` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — از انتشار خارج شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Blog` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `views` · string
    - `status` · string · enum=["yes", "no"]
    - `category` · `BlogCategory` · object
    - `tags` · array
      - items · `Tag` · object
        - `id` · integer
        - `name` · string
        - `slug` · string
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "views": "string",
    "status": "yes",
    "category": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    },
    "tags": [
      {
        "id": 1,
        "name": "string",
        "slug": "string"
      }
    ],
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /blog-categories`

**خلاصه:** فهرست دسته‌های مقالات

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `BlogCategory` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `parent_id` · integer · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "parent_id": 1
    }
  ],
  "meta": {}
}
```

---

### `POST /blog-categories`

**خلاصه:** ثبت دسته‌بندی جدید (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `name` **(الزامی)** · string
- `parent_id` · integer · nullable

نمونه payload:

```json
{
  "name": "string",
  "parent_id": 1
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `BlogCategory` · object
    - `id` · integer
    - `name` · string
    - `slug` · string
    - `parent_id` · integer · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "slug": "string",
    "parent_id": 1
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /blog-categories/{blogCategory}`

**خلاصه:** ویرایش دسته‌بندی (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blogCategory` | `path` | بله | `integer` |  |

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `name` **(الزامی)** · string
- `parent_id` · integer · nullable

نمونه payload:

```json
{
  "name": "string",
  "parent_id": 1
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `BlogCategory` · object
    - `id` · integer
    - `name` · string
    - `slug` · string
    - `parent_id` · integer · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "slug": "string",
    "parent_id": 1
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `DELETE /blog-categories/{blogCategory}`

**خلاصه:** حذف دسته‌بندی (فاز ۲؛ فقط ادمین/دستیار)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `blogCategory` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — حذف شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /knowledges`

**خلاصه:** فهرست محتوای دانشنامه (منتشرشده)

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category_id` | `query` | خیر | `integer` |  |
| `per_page` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Knowledge` · object
      - `id` · integer
      - `title` · string
      - `description` · string
      - `category` · `KnowledgeCategory` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "category": {
        "id": 1,
        "name": "string",
        "slug": "string",
        "image": "string",
        "description": "string"
      }
    }
  ],
  "meta": {}
}
```

---

### `GET /knowledge-categories`

**خلاصه:** فهرست دسته‌های دانشنامه

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `KnowledgeCategory` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `image` · string · nullable
      - `description` · string
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "description": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /faqs`

**خلاصه:** سوالات متداول فعال (اختیاری بر اساس سرویس یا مقاله)

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `service_id` | `query` | خیر | `integer` |  |
| `blog_id` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Faq` · object
      - `id` · integer
      - `question` · string
      - `slug` · string
      - `answer` · string
      - `receiver` · string · enum=["engineer", "user", "consulter", "insurance"]
      - `service_id` · integer · nullable
      - `blog_id` · integer · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "question": "string",
      "slug": "string",
      "answer": "string",
      "receiver": "engineer",
      "service_id": 1,
      "blog_id": 1
    }
  ],
  "meta": {}
}
```

---

### `GET /forms`

**خلاصه:** فهرست فرم‌های قابل‌دانلود فعال

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category_id` | `query` | خیر | `integer` |  |
| `province_id` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `DownloadableForm` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `downloads` · string
      - `province` · `Province` · object
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "downloads": "string",
      "province": {
        "id": 1,
        "name": "string",
        "slug": "string",
        "image": "string",
        "latitude": "string",
        "longitude": "string"
      }
    }
  ],
  "meta": {}
}
```

---

### `GET /forms/{slug}/download`

**خلاصه:** دانلود فایل فرم (شمارنده‌ی دانلود +۱)

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `slug` | `path` | بله | `string` |  |

**پاسخ‌ها:**

- **200** — فایل باینری
  - content-type: `application/octet-stream`
  - string · format=binary
  - نمونه response:

```json
"<binary>"
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /sliders`

**خلاصه:** اسلایدرهای فعال صفحه‌ی اصلی

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Slider` · object
      - `id` · integer
      - `title` · string
      - `image` · string · nullable
      - `alt` · string
      - `service_id` · integer
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "image": "string",
      "alt": "string",
      "service_id": 1
    }
  ],
  "meta": {}
}
```

---

### `GET /teams`

**خلاصه:** اعضای فعال تیم

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `TeamMember` · object
      - `id` · integer
      - `name` · string
      - `position` · string
      - `image` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "position": "string",
      "image": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /testimonials`

**خلاصه:** نظرات مشتریان منتشرشده

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Testimonial` · object
      - `id` · integer
      - `title` · string · nullable
      - `comment` · string · nullable
      - `rate` · integer · nullable
      - `author` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "comment": "string",
      "rate": 1,
      "author": "string"
    }
  ],
  "meta": {}
}
```

---

### `GET /brands`

**خلاصه:** برندهای فعال

**احراز هویت:** لازم نیست

**پاسخ‌ها:**

- **200** — فهرست
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Brand` · object
      - `id` · integer
      - `name` · string
      - `slug` · string
      - `image` · string · nullable
      - `link` · string
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "link": "string"
    }
  ],
  "meta": {}
}
```

---

### `POST /messages`

**خلاصه:** ارسال پیام از فرم تماس با ما

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `name` **(الزامی)** · string
- `family` **(الزامی)** · string
- `email` · string · format=email · nullable
- `mobile` **(الزامی)** · string
- `subject` **(الزامی)** · string
- `message` **(الزامی)** · string

نمونه payload:

```json
{
  "name": "string",
  "family": "string",
  "email": "user@example.com",
  "mobile": "string",
  "subject": "string",
  "message": "string"
}
```

**پاسخ‌ها:**

- **201** — ارسال شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /newsletter`

**خلاصه:** عضویت در خبرنامه

**احراز هویت:** لازم نیست

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- object
- `contact` **(الزامی)** · string — ایمیل یا شماره موبایل

نمونه payload:

```json
{
  "contact": "string"
}
```

**پاسخ‌ها:**

- **201** — عضویت ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **422** — این مورد قبلاً ثبت شده است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## Careers

آگهی شغلی و درخواست‌های همکاری

### `GET /careers`

**خلاصه:** فهرست آگهی‌های شغلی فعال

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `category_id` | `query` | خیر | `integer` |  |
| `province_id` | `query` | خیر | `integer` |  |
| `city_id` | `query` | خیر | `integer` |  |
| `type` | `query` | خیر | `string enum=["part_time", "full_time", "contract", "permanent"]` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Career` · object
      - `id` · integer
      - `title` · string
      - `slug` · string
      - `description` · string
      - `image` · string · nullable
      - `education` · string
      - `insurance` · boolean
      - `skill_level` · string · enum=["zero", "low", "mid", "high"]
      - `salary` · string · nullable
      - `type` · string · enum=["part_time", "full_time", "contract", "permanent"]
      - `status` · string · enum=["active", "inactive", "applied"]
      - `views` · string
      - `category` · `CareerCategoryRef` · object
      - `province` · `Province` · object
      - `city` · `City` · object
      - `owner_id` · integer
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "title": "string",
      "slug": "string",
      "description": "string",
      "image": "string",
      "education": "string",
      "insurance": true,
      "skill_level": "zero",
      "salary": "string",
      "type": "part_time",
      "status": "active",
      "views": "string",
      "category": {
        "id": 1,
        "title": "string",
        "slug": "string"
      },
      "province": {
        "id": 1,
        "name": "string",
        "slug": "string",
        "image": "string",
        "latitude": "string",
        "longitude": "string"
      },
      "city": {
        "id": 1,
        "name": "string",
        "slug": "string",
        "province_id": 1,
        "image": "string",
        "latitude": "string",
        "longitude": "string"
      },
      "owner_id": 1,
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```

---

### `POST /careers`

**خلاصه:** ثبت آگهی شغلی جدید (هر نقش واردشده مجاز است)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- `CareerInput` · object
- `title` **(الزامی)** · string
- `category_id` **(الزامی)** · integer
- `province_id` **(الزامی)** · integer
- `city_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `education` **(الزامی)** · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `insurance` **(الزامی)** · string · enum=["yes", "no"]
- `skill_level` **(الزامی)** · string · enum=["zero", "low", "mid", "high"]
- `salary` · string · nullable
- `type` **(الزامی)** · string · enum=["part_time", "full_time", "contract", "permanent"]

نمونه payload:

```json
{
  "title": "string",
  "category_id": 1,
  "province_id": 1,
  "city_id": 1,
  "description": "string",
  "education": "zire_diplom",
  "insurance": "yes",
  "skill_level": "zero",
  "salary": "string",
  "type": "part_time"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Career` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `education` · string
    - `insurance` · boolean
    - `skill_level` · string · enum=["zero", "low", "mid", "high"]
    - `salary` · string · nullable
    - `type` · string · enum=["part_time", "full_time", "contract", "permanent"]
    - `status` · string · enum=["active", "inactive", "applied"]
    - `views` · string
    - `category` · `CareerCategoryRef` · object
    - `province` · `Province` · object
    - `city` · `City` · object
    - `owner_id` · integer
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "education": "string",
    "insurance": true,
    "skill_level": "zero",
    "salary": "string",
    "type": "part_time",
    "status": "active",
    "views": "string",
    "category": {
      "id": 1,
      "title": "string",
      "slug": "string"
    },
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "owner_id": 1,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /careers/{career}`

**خلاصه:** جزئیات یک آگهی شغلی فعال

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `career` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — جزئیات
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Career` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `education` · string
    - `insurance` · boolean
    - `skill_level` · string · enum=["zero", "low", "mid", "high"]
    - `salary` · string · nullable
    - `type` · string · enum=["part_time", "full_time", "contract", "permanent"]
    - `status` · string · enum=["active", "inactive", "applied"]
    - `views` · string
    - `category` · `CareerCategoryRef` · object
    - `province` · `Province` · object
    - `city` · `City` · object
    - `owner_id` · integer
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "education": "string",
    "insurance": true,
    "skill_level": "zero",
    "salary": "string",
    "type": "part_time",
    "status": "active",
    "views": "string",
    "category": {
      "id": 1,
      "title": "string",
      "slug": "string"
    },
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "owner_id": 1,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **404** — موردی با این مشخصات یافت نشد
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /careers/{career}`

**خلاصه:** ویرایش آگهی (فقط سازنده یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `career` | `path` | بله | `integer` |  |

**Body:** content-type=`application/json` · الزامی=بله

فیلدها:

- `CareerInput` · object
- `title` **(الزامی)** · string
- `category_id` **(الزامی)** · integer
- `province_id` **(الزامی)** · integer
- `city_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `education` **(الزامی)** · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `insurance` **(الزامی)** · string · enum=["yes", "no"]
- `skill_level` **(الزامی)** · string · enum=["zero", "low", "mid", "high"]
- `salary` · string · nullable
- `type` **(الزامی)** · string · enum=["part_time", "full_time", "contract", "permanent"]

نمونه payload:

```json
{
  "title": "string",
  "category_id": 1,
  "province_id": 1,
  "city_id": 1,
  "description": "string",
  "education": "zire_diplom",
  "insurance": "yes",
  "skill_level": "zero",
  "salary": "string",
  "type": "part_time"
}
```

**پاسخ‌ها:**

- **200** — به‌روزرسانی شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Career` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `education` · string
    - `insurance` · boolean
    - `skill_level` · string · enum=["zero", "low", "mid", "high"]
    - `salary` · string · nullable
    - `type` · string · enum=["part_time", "full_time", "contract", "permanent"]
    - `status` · string · enum=["active", "inactive", "applied"]
    - `views` · string
    - `category` · `CareerCategoryRef` · object
    - `province` · `Province` · object
    - `city` · `City` · object
    - `owner_id` · integer
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "title": "string",
    "slug": "string",
    "description": "string",
    "image": "string",
    "education": "string",
    "insurance": true,
    "skill_level": "zero",
    "salary": "string",
    "type": "part_time",
    "status": "active",
    "views": "string",
    "category": {
      "id": 1,
      "title": "string",
      "slug": "string"
    },
    "province": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "city": {
      "id": 1,
      "name": "string",
      "slug": "string",
      "province_id": 1,
      "image": "string",
      "latitude": "string",
      "longitude": "string"
    },
    "owner_id": 1,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `DELETE /careers/{career}`

**خلاصه:** حذف آگهی (فقط سازنده یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `career` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — حذف شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": null,
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /careers/{career}/requests`

**خلاصه:** فهرست متقاضیان یک آگهی (فقط سازنده یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `career` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `JobRequest` · object
      - `id` · integer
      - `name` · string
      - `family` · string
      - `email` · string
      - `mobile` · string
      - `age` · integer
      - `gender` · string · enum=["male", "female"]
      - `resume` · string · nullable
      - `status` · string · enum=["pending", "accepted", "rejected", "selected"]
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "family": "string",
      "email": "string",
      "mobile": "string",
      "age": 1,
      "gender": "male",
      "resume": "string",
      "status": "pending",
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /careers/{career}/apply`

**خلاصه:** درخواست همکاری برای یک آگهی (عمومی؛ بدون نیاز به ورود)

**احراز هویت:** لازم نیست

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `career` | `path` | بله | `integer` |  |

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- object
- `name` **(الزامی)** · string
- `family` **(الزامی)** · string
- `email` **(الزامی)** · string · format=email
- `mobile` **(الزامی)** · string
- `age` **(الزامی)** · integer
- `gender` **(الزامی)** · string · enum=["male", "female"]
- `province_id` **(الزامی)** · integer
- `city_id` **(الزامی)** · integer
- `resume` · string · format=binary — pdf/doc/docx — حداکثر ۴ مگابایت

نمونه payload:

```json
{
  "name": "string",
  "family": "string",
  "email": "user@example.com",
  "mobile": "string",
  "age": 1,
  "gender": "male",
  "province_id": 1,
  "city_id": 1,
  "resume": "<binary>"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `JobRequest` · object
    - `id` · integer
    - `name` · string
    - `family` · string
    - `email` · string
    - `mobile` · string
    - `age` · integer
    - `gender` · string · enum=["male", "female"]
    - `resume` · string · nullable
    - `status` · string · enum=["pending", "accepted", "rejected", "selected"]
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "name": "string",
    "family": "string",
    "email": "string",
    "mobile": "string",
    "age": 1,
    "gender": "male",
    "resume": "string",
    "status": "pending",
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **404** — آگهی فعال نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **429** — تعداد درخواست از سقف مجاز گذشته
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## Tickets

تیکت پشتیبانی (Room/Ticket)

### `GET /tickets/rooms`

**خلاصه:** فهرست تیکت‌های من (ادمین همه را می‌بیند)

**احراز هویت:** `[{"sanctum": []}]`

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `Room` · object
      - `id` · integer
      - `number` · string
      - `subject` · string
      - `priority` · string · enum=["low", "mid", "high"]
      - `status` · string · enum=["answered", "seen", "pending", "closed"]
      - `sender_id` · integer
      - `receiver_id` · integer
      - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "number": "string",
      "subject": "string",
      "priority": "low",
      "status": "answered",
      "sender_id": 1,
      "receiver_id": 1,
      "created_at": "2026-01-01T00:00:00+03:30"
    }
  ],
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /tickets/rooms`

**خلاصه:** ثبت تیکت جدید (همیشه به یکی از ادمین‌ها ارسال می‌شود)

**احراز هویت:** `[{"sanctum": []}]`

**Body:** content-type=`multipart/form-data` · الزامی=بله

فیلدها:

- object
- `subject` **(الزامی)** · string
- `priority` · string · enum=["low", "mid", "high"]
- `message` · string — پیام یا فایل الزامی است
- `file` · string · format=binary — jpeg/jpg/png/gif — حداکثر ۲ مگابایت

نمونه payload:

```json
{
  "subject": "string",
  "priority": "low",
  "message": "string",
  "file": "<binary>"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Room` · object
    - `id` · integer
    - `number` · string
    - `subject` · string
    - `priority` · string · enum=["low", "mid", "high"]
    - `status` · string · enum=["answered", "seen", "pending", "closed"]
    - `sender_id` · integer
    - `receiver_id` · integer
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "number": "string",
    "subject": "string",
    "priority": "low",
    "status": "answered",
    "sender_id": 1,
    "receiver_id": 1,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **401** — توکن ارسال نشده یا نامعتبر است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — خطای اعتبارسنجی ورودی
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /tickets/rooms/{room}`

**خلاصه:** جزئیات یک تیکت به‌همراه پیام‌ها (فقط طرفین یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `room` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — تیکت و پیام‌ها
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · object
    - `room` · `Room` · object
    - `messages` · array
      - items · `TicketMessage` · object
        - `id` · integer
        - `room_id` · integer
        - `sender_id` · integer
        - `receiver_id` · integer
        - `message` · string · nullable
        - `file` · string · nullable
        - `seen` · boolean
        - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "room": {
      "id": 1,
      "number": "string",
      "subject": "string",
      "priority": "low",
      "status": "answered",
      "sender_id": 1,
      "receiver_id": 1,
      "created_at": "2026-01-01T00:00:00+03:30"
    },
    "messages": [
      {
        "id": 1,
        "room_id": 1,
        "sender_id": 1,
        "receiver_id": 1,
        "message": "string",
        "file": "string",
        "seen": true,
        "created_at": "2026-01-01T00:00:00+03:30"
      }
    ]
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `POST /tickets/rooms/{room}/reply`

**خلاصه:** پاسخ در یک تیکت باز (فقط طرفین یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `room` | `path` | بله | `integer` |  |

**Body:** content-type=`multipart/form-data` · الزامی=خیر

فیلدها:

- object
- `message` · string — پیام یا فایل الزامی است
- `file` · string · format=binary

نمونه payload:

```json
{
  "message": "string",
  "file": "<binary>"
}
```

**پاسخ‌ها:**

- **201** — ثبت شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `TicketMessage` · object
    - `id` · integer
    - `room_id` · integer
    - `sender_id` · integer
    - `receiver_id` · integer
    - `message` · string · nullable
    - `file` · string · nullable
    - `seen` · boolean
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "room_id": 1,
    "sender_id": 1,
    "receiver_id": 1,
    "message": "string",
    "file": "string",
    "seen": true,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable
- **422** — تیکت بسته شده است
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `PUT /tickets/rooms/{room}/close`

**خلاصه:** بستن تیکت (فقط طرفین یا ادمین)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `room` | `path` | بله | `integer` |  |

**پاسخ‌ها:**

- **200** — بسته شد
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · `Room` · object
    - `id` · integer
    - `number` · string
    - `subject` · string
    - `priority` · string · enum=["low", "mid", "high"]
    - `status` · string · enum=["answered", "seen", "pending", "closed"]
    - `sender_id` · integer
    - `receiver_id` · integer
    - `created_at` · string · format=date-time · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 1,
    "number": "string",
    "subject": "string",
    "priority": "low",
    "status": "answered",
    "sender_id": 1,
    "receiver_id": 1,
    "created_at": "2026-01-01T00:00:00+03:30"
  },
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## Admin

endpointهای مخصوص ادمین/دستیار (فاز ۲)

### `GET /admin/professionals`

**خلاصه:** دایرکتوری متخصصان با شماره موبایل (فاز ۲؛ شامل حساب‌های غیرفعال)

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `role` | `query` | خیر | `string enum=["engineer", "consulter", "insurance"]` |  |
| `status` | `query` | خیر | `string enum=["active", "inactive", "ban"]` |  |
| `province_id` | `query` | خیر | `integer` |  |
| `city_id` | `query` | خیر | `integer` |  |
| `service_id` | `query` | خیر | `integer` |  |
| `per_page` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فهرست صفحه‌بندی‌شده
  - content-type: `application/json`
  - `SuccessEnvelope` · object
  - `success` **(الزامی)** · boolean · example=true
  - `message` · string · nullable
  - `data` **(الزامی)** · array
    - items · `ProfessionalDirectoryEntry` · object
      - `id` · integer
      - `name` · string
      - `family` · string
      - `mobile` · string
      - `email` · string · nullable
      - `status` · string · enum=["active", "inactive", "ban"]
      - `role` · string · enum=["engineer", "consulter", "insurance"]
      - `province` · string · nullable
      - `city` · string · nullable
  - `meta` · object · nullable
  - نمونه response:

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 1,
      "name": "string",
      "family": "string",
      "mobile": "string",
      "email": "string",
      "status": "active",
      "role": "engineer",
      "province": "string",
      "city": "string"
    }
  ],
  "meta": {}
}
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

### `GET /admin/professionals/export`

**خلاصه:** خروجی اکسل از همان فهرست فیلترشده

**احراز هویت:** `[{"sanctum": []}]`

**پارامترها:**

| Name | In | Required | Type | Description |
| --- | --- | --- | --- | --- |
| `role` | `query` | خیر | `string enum=["engineer", "consulter", "insurance"]` |  |
| `status` | `query` | خیر | `string enum=["active", "inactive", "ban"]` |  |
| `province_id` | `query` | خیر | `integer` |  |
| `city_id` | `query` | خیر | `integer` |  |
| `service_id` | `query` | خیر | `integer` |  |

**پاسخ‌ها:**

- **200** — فایل اکسل (.xlsx)
  - content-type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  - string · format=binary
  - نمونه response:

```json
"<binary>"
```
- **403** — دسترسی مجاز نیست
  - content-type: `application/json`
  - `ErrorEnvelope` · object
  - `success` **(الزامی)** · boolean · example=false
  - `message` **(الزامی)** · string
  - `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
  - `errors` · object · nullable

---

## پیوست: اسکیماهای مشترک

### `Blog`

- object
- `id` · integer
- `title` · string
- `slug` · string
- `description` · string
- `image` · string · nullable
- `views` · string
- `status` · string · enum=["yes", "no"]
- `category` · `BlogCategory` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `parent_id` · integer · nullable
- `tags` · array
  - items · `Tag` · object
    - `id` · integer
    - `name` · string
    - `slug` · string
- `created_at` · string · format=date-time · nullable

### `BlogCategory`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `parent_id` · integer · nullable

### `BlogInput`

- object
- `title` **(الزامی)** · string
- `blog_category_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `image` · string · format=binary
- `tag_ids` · array
  - items · integer

### `Brand`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `image` · string · nullable
- `link` · string

### `Career`

- object
- `id` · integer
- `title` · string
- `slug` · string
- `description` · string
- `image` · string · nullable
- `education` · string
- `insurance` · boolean
- `skill_level` · string · enum=["zero", "low", "mid", "high"]
- `salary` · string · nullable
- `type` · string · enum=["part_time", "full_time", "contract", "permanent"]
- `status` · string · enum=["active", "inactive", "applied"]
- `views` · string
- `category` · `CareerCategoryRef` · object
  - `id` · integer
  - `title` · string
  - `slug` · string
- `province` · `Province` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable
- `city` · `City` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `province_id` · integer
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable
- `owner_id` · integer
- `created_at` · string · format=date-time · nullable

### `CareerCategoryRef`

- object
- `id` · integer
- `title` · string
- `slug` · string

### `CareerInput`

- object
- `title` **(الزامی)** · string
- `category_id` **(الزامی)** · integer
- `province_id` **(الزامی)** · integer
- `city_id` **(الزامی)** · integer
- `description` **(الزامی)** · string
- `education` **(الزامی)** · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `insurance` **(الزامی)** · string · enum=["yes", "no"]
- `skill_level` **(الزامی)** · string · enum=["zero", "low", "mid", "high"]
- `salary` · string · nullable
- `type` **(الزامی)** · string · enum=["part_time", "full_time", "contract", "permanent"]

### `Certificate`

- object
- `id` · integer
- `title` · string
- `image` · string · nullable
- `status` · string · enum=["yes", "no"]
- `created_at` · string · format=date-time · nullable

### `City`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `province_id` · integer
- `image` · string · nullable
- `latitude` · string · nullable
- `longitude` · string · nullable

### `DownloadableForm`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `downloads` · string
- `province` · `Province` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable

### `Education`

- object
- `id` · integer
- `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
- `university` · string · nullable
- `document` · string · nullable
- `status` · string · enum=["yes", "no", "rejected"]
- `field` · `Field` · object
  - `id` · integer
  - `name` · string
- `created_at` · string · format=date-time · nullable

### `ErrorEnvelope`

- object
- `success` **(الزامی)** · boolean · example=false
- `message` **(الزامی)** · string
- `code` **(الزامی)** · string · enum=["VALIDATION_FAILED", "UNAUTHENTICATED", "INVALID_CREDENTIALS", "ACCOUNT_INACTIVE", "ACCOUNT_BANNED", "FORBIDDEN", "NOT_FOUND", "METHOD_NOT_ALLOWED", "TOO_MANY_REQUESTS", "SERVER_ERROR", "SERVICE_UNAVAILABLE"]
- `errors` · object · nullable

### `Faq`

- object
- `id` · integer
- `question` · string
- `slug` · string
- `answer` · string
- `receiver` · string · enum=["engineer", "user", "consulter", "insurance"]
- `service_id` · integer · nullable
- `blog_id` · integer · nullable

### `Field`

- object
- `id` · integer
- `name` · string

### `HealthData`

- object
- `application` · string · example="emohandes"
- `environment` · string · example="production"
- `api_version` · string · example="v1"
- `database` · string · enum=["up", "down"]

### `JobRequest`

- object
- `id` · integer
- `name` · string
- `family` · string
- `email` · string
- `mobile` · string
- `age` · integer
- `gender` · string · enum=["male", "female"]
- `resume` · string · nullable
- `status` · string · enum=["pending", "accepted", "rejected", "selected"]
- `created_at` · string · format=date-time · nullable

### `Knowledge`

- object
- `id` · integer
- `title` · string
- `description` · string
- `category` · `KnowledgeCategory` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `image` · string · nullable
  - `description` · string

### `KnowledgeCategory`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `image` · string · nullable
- `description` · string

### `LoginRequiresRoleSelection`

- object
- `success` · boolean · example=true
- `message` · string · example="لطفاً نقشی که می‌خواهید با آن وارد شوید را انتخاب کنید."
- `data` · object
  - `requires_role_selection` · boolean · example=true
  - `token` · string — توکن محدود؛ فقط برای فراخوانی /auth/role معتبر است
  - `token_type` · string · example="Bearer"
  - `available_roles` · array
    - items · `Role` · object
      - `id` · integer
      - `name` · string · example="engineer"
      - `title` · string · example="مهندس"

### `LoginSuccess`

- object
- `success` · boolean · example=true
- `message` · string · example="ورود با موفقیت انجام شد."
- `data` · object
  - `requires_role_selection` · boolean · example=false
  - `token` · string
  - `token_type` · string · example="Bearer"
  - `user` · `User` · object

### `PasswordResetTokenIssued`

- object
- `success` · boolean · example=true
- `message` · string · example="کد تأیید شد. اکنون گذرواژه جدید را ثبت کنید."
- `data` · object
  - `token` · string — توکن محدود؛ فقط برای فراخوانی POST /auth/password معتبر است
  - `token_type` · string · example="Bearer"

### `Portfolio`

- object
- `id` · integer
- `image` · string · nullable
- `suggested` · boolean

### `ProfessionalCard`

- object
- `id` · integer
- `name` · string
- `family` · string
- `full_name` · string
- `image` · string · nullable
- `role` · string · enum=["engineer", "consulter", "insurance"]
- `city` · string · nullable
- `province` · string · nullable
- `working_years` · string · nullable
- `rating` · number · nullable · example=4.5
- `rating_count` · integer

### `ProfessionalComment`

- object
- `id` · integer
- `title` · string
- `comment` · string
- `rate` · integer
- `author` · string · nullable
- `replies` · array
  - items · `ProfessionalComment` · object
    - `id` · integer
    - `title` · string
    - `comment` · string
    - `rate` · integer
    - `author` · string · nullable
    - `replies` · array
    - `created_at` · string · format=date-time · nullable
- `created_at` · string · format=date-time · nullable

### `ProfessionalDetail`

- object
- `id` · integer
- `name` · string
- `family` · string
- `full_name` · string
- `image` · string · nullable — null اگر show_image=no
- `mobile` · string · nullable — null اگر show_mobile=no
- `phone_contact` · string · nullable
- `role` · string · enum=["engineer", "consulter", "insurance"]
- `bio` · string · nullable
- `working_years` · string · nullable
- `province` · `Province` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable
- `city` · `City` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `province_id` · integer
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable
- `cities_covered` · array
  - items · `City` · object
    - `id` · integer
    - `name` · string
    - `slug` · string
    - `province_id` · integer
    - `image` · string · nullable
    - `latitude` · string · nullable
    - `longitude` · string · nullable
- `services` · array
  - items · `ServiceNode` · object
    - `id` · integer
    - `title` · string
    - `short_title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `parent_id` · integer · nullable
    - `children` · array
- `qualifications` · array
  - items · `Qualification` · object
    - `id` · integer
    - `title` · string
    - `slug` · string
    - `parent_id` · integer · nullable
- `educations` · array
  - items · `Education` · object
    - `id` · integer
    - `level` · string · enum=["zire_diplom", "diplom", "kardani", "karshenasi", "arshad", "doctori"]
    - `university` · string · nullable
    - `document` · string · nullable
    - `status` · string · enum=["yes", "no", "rejected"]
    - `field` · `Field` · object
    - `created_at` · string · format=date-time · nullable
- `certificates` · array
  - items · `Certificate` · object
    - `id` · integer
    - `title` · string
    - `image` · string · nullable
    - `status` · string · enum=["yes", "no"]
    - `created_at` · string · format=date-time · nullable
- `rating` · number · nullable
- `rating_count` · integer

### `ProfessionalDirectoryEntry`

- object
- `id` · integer
- `name` · string
- `family` · string
- `mobile` · string
- `email` · string · nullable
- `status` · string · enum=["active", "inactive", "ban"]
- `role` · string · enum=["engineer", "consulter", "insurance"]
- `province` · string · nullable
- `city` · string · nullable

### `Profile`

- object
- `id` · integer
- `name` · string
- `family` · string
- `mobile` · string
- `melli` · string
- `email` · string · nullable
- `image` · string · nullable
- `role` · `Role` · object
  - `id` · integer
  - `name` · string · example="engineer" — مقدار پایدار ماشین‌خوان (RoleName)
  - `title` · string · example="مهندس"
- `gender` · string · nullable
- `birthday` · string · format=date · nullable
- `bio` · string · nullable
- `marital_status` · string · nullable
- `working_years` · string · nullable
- `phone_contact` · string · nullable
- `text_contact` · string · nullable
- `show_mobile` · string · nullable
- `show_image` · string · nullable
- `province` · `Province` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable
- `city` · `City` · object
  - `id` · integer
  - `name` · string
  - `slug` · string
  - `province_id` · integer
  - `image` · string · nullable
  - `latitude` · string · nullable
  - `longitude` · string · nullable

### `Province`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `image` · string · nullable
- `latitude` · string · nullable
- `longitude` · string · nullable

### `Qualification`

- object
- `id` · integer
- `title` · string
- `slug` · string
- `parent_id` · integer · nullable

### `Role`

- object
- `id` · integer
- `name` · string · example="engineer" — مقدار پایدار ماشین‌خوان (RoleName)
- `title` · string · example="مهندس"

### `Room`

- object
- `id` · integer
- `number` · string
- `subject` · string
- `priority` · string · enum=["low", "mid", "high"]
- `status` · string · enum=["answered", "seen", "pending", "closed"]
- `sender_id` · integer
- `receiver_id` · integer
- `created_at` · string · format=date-time · nullable

### `ServiceNode`

- object
- `id` · integer
- `title` · string
- `short_title` · string
- `slug` · string
- `description` · string
- `image` · string · nullable
- `parent_id` · integer · nullable
- `children` · array
  - items · `ServiceNode` · object
    - `id` · integer
    - `title` · string
    - `short_title` · string
    - `slug` · string
    - `description` · string
    - `image` · string · nullable
    - `parent_id` · integer · nullable
    - `children` · array

### `Session`

- object
- `id` · integer
- `device` · string — device_name ارسالی هنگام ورود، یا User-Agent
- `abilities` · array
  - items · string
- `current` · boolean — آیا همین توکنی‌ست که الان درخواست رو زده
- `last_used_at` · string · format=date-time · nullable
- `created_at` · string · format=date-time · nullable

### `Slider`

- object
- `id` · integer
- `title` · string
- `image` · string · nullable
- `alt` · string
- `service_id` · integer

### `Software`

- object
- `id` · integer
- `name` · string
- `slug` · string
- `image` · string · nullable

### `SuccessEnvelope`

- object
- `success` **(الزامی)** · boolean · example=true
- `message` · string · nullable
- `data` **(الزامی)** · example=null — any (در اسکیما به‌صورت [] آمده)
- `meta` · object · nullable

### `Tag`

- object
- `id` · integer
- `name` · string
- `slug` · string

### `TeamMember`

- object
- `id` · integer
- `name` · string
- `position` · string
- `image` · string · nullable

### `Testimonial`

- object
- `id` · integer
- `title` · string · nullable
- `comment` · string · nullable
- `rate` · integer · nullable
- `author` · string · nullable

### `TicketMessage`

- object
- `id` · integer
- `room_id` · integer
- `sender_id` · integer
- `receiver_id` · integer
- `message` · string · nullable
- `file` · string · nullable
- `seen` · boolean
- `created_at` · string · format=date-time · nullable

### `User`

- object
- `id` · integer
- `name` · string
- `family` · string
- `full_name` · string
- `mobile` · string
- `melli` · string
- `email` · string · nullable
- `image` · string · nullable
- `status` · object
  - `value` · string · enum=["active", "inactive", "banned"]
  - `label` · string · example="فعال"
- `mobile_verified` · boolean
- `role` · `Role` · object
  - `id` · integer
  - `name` · string · example="engineer" — مقدار پایدار ماشین‌خوان (RoleName)
  - `title` · string · example="مهندس"
- `created_at` · string · format=date-time · nullable
