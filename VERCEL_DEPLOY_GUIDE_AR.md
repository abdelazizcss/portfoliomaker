# دليل نشر تطبيق Portfolio Maker على Vercel

هذا الدليل يشرح كيفية نشر تطبيق Portfolio Maker على منصة Vercel.

## متطلبات النشر

1. حساب على [Vercel](https://vercel.com)
2. حساب على [GitHub](https://github.com)
3. مشروع [Supabase](https://supabase.com) مع قاعدة بيانات مُعدة

## خطوات النشر

### 1. رفع المشروع إلى GitHub

1. قم بإنشاء مستودع جديد على GitHub
2. قم برفع كود المشروع إلى المستودع:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. نشر المشروع على Vercel

1. قم بتسجيل الدخول إلى [Vercel](https://vercel.com)
2. انقر على "Add New" ثم "Project"
3. اختر المستودع الذي رفعت إليه المشروع
4. في إعدادات النشر، قم بتعيين متغيرات البيئة التالية:

| المتغير | الوصف |
|---------|-------|
| `NEXTAUTH_URL` | عنوان URL للموقع المنشور (مثل: https://your-project.vercel.app) |
| `NEXTAUTH_SECRET` | مفتاح سري للتشفير (يمكنك إنشاؤه باستخدام `openssl rand -base64 32`) |
| `GITHUB_ID` | معرف تطبيق GitHub OAuth الخاص بك |
| `GITHUB_SECRET` | السر الخاص بتطبيق GitHub OAuth |
| `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروع Supabase الخاص بك |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام لمشروع Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح الخدمة لمشروع Supabase |

5. انقر على "Deploy"

### 3. إعداد مصادقة GitHub OAuth للإنتاج

1. انتقل إلى [GitHub Developer Settings](https://github.com/settings/developers)
2. حدد تطبيق OAuth الخاص بك
3. قم بتحديث "Authorization callback URL" ليكون:
   ```
   https://your-project.vercel.app/api/auth/callback/github
   ```
4. احفظ التغييرات

## ملاحظات هامة

- تأكد من تمكين Row Level Security (RLS) في Supabase لحماية البيانات
- قم بإنشاء تطبيق OAuth جديد على GitHub مخصص للإنتاج (مختلف عن بيئة التطوير)
- استخدم مفاتيح آمنة وفريدة لمتغيرات البيئة

## نعم، يمكنك استضافة الواجهة والخلفية معًا على Vercel

تطبيق Next.js يمكن أن يستضيف كلا من:
- واجهة المستخدم (الصفحات والمكونات)
- واجهة برمجة التطبيقات (API Routes)

هذا يعني أنه يمكنك نشر التطبيق بالكامل على Vercel دون الحاجة إلى خدمة استضافة منفصلة للخلفية. خدمات API تعمل كوظائف خادمية (Serverless Functions) على Vercel.

## استكشاف الأخطاء وإصلاحها

إذا واجهت مشاكل في النشر، تحقق من:
- سجلات النشر في لوحة تحكم Vercel
- متغيرات البيئة أنها صحيحة ومضبوطة بشكل صحيح
- إعدادات مصادقة GitHub OAuth أنها صحيحة
- أن قاعدة بيانات Supabase تعمل وإعدادات الأمان صحيحة
