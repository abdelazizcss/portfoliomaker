# GitHub OAuth App Setup Instructions

## إعداد GitHub OAuth App

لإعداد GitHub OAuth App للمشروع، اتبع الخطوات التالية:

### 1. إنشاء OAuth App على GitHub

1. اذهب إلى GitHub.com وسجل الدخول
2. اذهب إلى Settings > Developer settings > OAuth Apps
3. اضغط على "New OAuth App"
4. املأ النموذج كالتالي:

```
Application name: Portfolio Maker
Homepage URL: http://localhost:3000
Application description: Create professional portfolios easily
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

### 2. نسخ البيانات

بعد إنشاء التطبيق، ستحصل على:
- **Client ID**: `Ov23liHP6MPl20Mb4m2a`
- **Client Secret**: `51ddab2cd22404cc19a57b9aca430d5432c706ed`

### 3. التحقق من الإعدادات

تأكد من أن:
- ✅ Client ID صحيح في `.env.local`: `Ov23liHP6MPl20Mb4m2a`
- ✅ Client Secret صحيح في `.env.local`: `51ddab2cd22404cc19a57b9aca430d5432c706ed` 
- ✅ Authorization callback URL هو: `http://localhost:3000/api/auth/callback/github`

### 4. إعادة تشغيل الخادم

بعد إضافة متغيرات البيئة، أعد تشغيل خادم التطوير:

```bash
# أوقف الخادم الحالي (Ctrl+C)
# ثم شغله مرة أخرى
npm run dev
```

### 5. اختبار تسجيل الدخول

1. اذهب إلى http://localhost:3000
2. اضغط على "تسجيل الدخول" أو "Get Started"
3. يجب أن يتم توجيهك إلى GitHub للمصادقة
4. بعد الموافقة، ستعود إلى التطبيق مسجل الدخول

## استكشاف الأخطاء

### خطأ "OAuth App not found"
- تحقق من صحة GITHUB_ID في `.env.local`

### خطأ "Bad verification code"
- تحقق من صحة GITHUB_SECRET في `.env.local`
- تأكد من أن callback URL صحيح

### خطأ "Invalid redirect_uri"
- تأكد من أن Authorization callback URL في GitHub App هو:
  `http://localhost:3000/api/auth/callback/github`

## للإنتاج (Production)

عند نشر التطبيق على Vercel:

1. أنشئ OAuth App جديد أو حدث الموجود
2. غير Homepage URL إلى: `https://your-domain.vercel.app`
3. غير Authorization callback URL إلى: `https://your-domain.vercel.app/api/auth/callback/github`
4. أضف متغيرات البيئة في Vercel Dashboard
