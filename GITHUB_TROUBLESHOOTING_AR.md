# دليل استكشاف أخطاء تكامل GitHub وإصلاحها

إذا كنت تواجه مشاكل في تكامل GitHub في تطبيق Portfolio Maker، فإليك بعض المشكلات الشائعة وحلولها.

## المشكلات الشائعة

### 1. خطأ: "Failed to parse URL from /api/projects"

**السبب**: يحدث هذا الخطأ عندما يحاول كود الخادم استخدام عنوان URL نسبي.

**الحل**:
- تم تنفيذ الإصلاح باستخدام عميل Supabase مباشرة في مكون الخادم بدلاً من إجراء مكالمة API.
- إذا رأيت هذا الخطأ، تأكد من أنك تستخدم أحدث إصدار من الكود.

### 2. خطأ: "Database permission error: Row Level Security is blocking access"

**السبب**: سياسات أمان الصفوف (RLS) في Supabase تمنع الوصول إلى جداول قاعدة البيانات.

**الحل**:
- قم بتشغيل برنامج SQL لإصلاح سياسات RLS: `fix_all_rls.sql`
- بدلاً من ذلك، قم بتعطيل RLS مؤقتًا للاختبار:
  ```sql
  ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
  ALTER TABLE users DISABLE ROW LEVEL SECURITY;
  ```

### 3. خطأ: "User not found in database"

**السبب**: لم يتم إنشاء ملف تعريف المستخدم في قاعدة البيانات بعد.

**الحل**:
- تأكد من أن المستخدم قد أكمل إعداد ملفه الشخصي أولاً
- تحقق مما إذا كان المستخدم موجودًا في جدول `users` في قاعدة البيانات
- قم بتحديث ملف تعريف المستخدم قبل محاولة استيراد مستودعات GitHub

### 4. خطأ: "The projects table does not exist"

**السبب**: لم تتم تهيئة مخطط قاعدة البيانات بشكل صحيح.

**الحل**:
- قم بتشغيل برنامج إعداد قاعدة البيانات: `create_tables.sql`
- تحقق من وحدة تحكم Supabase للتحقق من وجود جميع الجداول

## خطوات التصحيح

1. **تحقق من اسم مستخدم GitHub**:
   - تأكد من تعيين اسم مستخدم GitHub للمستخدم بشكل صحيح في ملفه الشخصي
   - تحقق من أن حساب GitHub لديه مستودعات عامة

2. **تحقق من استجابات API**:
   - انظر إلى وحدة تحكم المطور في المتصفح لمعرفة أخطاء API
   - تحقق من سجلات الخادم للحصول على معلومات أكثر تفصيلاً عن الأخطاء

3. **تحقق من اتصال قاعدة البيانات**:
   - تأكد من تعيين بيانات اعتماد Supabase بشكل صحيح في متغيرات البيئة
   - اختبر اتصال قاعدة البيانات باستخدام أدوات التشخيص

4. **تحقق من حدود معدل API GitHub**:
   - تحتوي API GitHub على حدود معدل قد تؤثر على جلب المستودع
   - فكر في استخدام رمز GitHub لزيادة حدود المعدل

## إصلاحات سريعة

إذا كنت تتلقى أخطاء عند استيراد مستودعات GitHub، فجرب هذه الإصلاحات السريعة:

1. **قم بتحديث معلومات ملف التعريف أولاً**: أكمل إعداد ملفك الشخصي قبل استيراد المستودعات
2. **قم بتعطيل RLS مؤقتًا**: قم بتشغيل `ALTER TABLE projects DISABLE ROW LEVEL SECURITY;`
3. **تحقق من إعداد قاعدة البيانات**: تأكد من إنشاء جميع الجداول
4. **تحقق من اتصال GitHub**: تحقق مما إذا كان بإمكانك الوصول إلى API GitHub مباشرة

إذا استمرت المشكلات، فتحقق من سجلات الأخطاء واطلب الدعم.
