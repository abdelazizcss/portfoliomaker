# حل مشكلة "Row Level Security" في تطبيق Portfolio Maker

## المشكلة الأولى: خطأ عند حفظ البروفايل
```
new row violates row-level security policy for table "users"
```

## المشكلة الثانية: خطأ عند إنشاء مشروع
```
new row violates row-level security policy for table "projects"
```

## سبب المشكلة
سياسات أمان الصفوف (Row Level Security) في Supabase تمنع المستخدم المجهول (anon) من إضافة صفوف جديدة في الجداول.

## الحل
قم باتباع الخطوات التالية:

### 1. الدخول إلى لوحة تحكم Supabase
- افتح https://app.supabase.io
- اختر مشروعك

### 2. انتقل إلى محرر SQL
- من القائمة الجانبية، اختر "SQL Editor"

### 3. قم بتنفيذ الأوامر التالية:
```sql
-- تعطيل سياسات أمان الصفوف (RLS) على جميع الجداول الرئيسية
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;

-- منح جميع الصلاحيات للمستخدم المجهول (للتطوير فقط!)
GRANT ALL PRIVILEGES ON TABLE users TO anon;
GRANT ALL PRIVILEGES ON TABLE projects TO anon;
GRANT ALL PRIVILEGES ON TABLE social_links TO anon;
GRANT USAGE ON SCHEMA public TO anon;
```

### 4. إعادة تشغيل التطبيق
بعد تنفيذ الأوامر السابقة، قم بإعادة تشغيل التطبيق وتجربة الميزات مرة أخرى.

## ملاحظة مهمة
هذا الحل هو لبيئة التطوير فقط! في بيئة الإنتاج، يجب إعادة تفعيل سياسات RLS وإعدادها بشكل صحيح لتأمين البيانات.

## للإنتاج (لاحقًا)
عندما تكون جاهزًا للنشر للإنتاج، قم بتنفيذ الأوامر التالية:

```sql
-- إعادة تفعيل RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- إضافة سياسات مناسبة
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = github_id);
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = github_id);
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid()::text = github_id);

-- مثل ذلك للجداول الأخرى...
```

## ملفات مفيدة في المشروع
- `fix_all_rls.sql`: حل شامل لجميع مشاكل RLS
- `test-supabase-fixed.js`: اختبار الاتصال بـ Supabase
- `create_tables.sql`: إنشاء الجداول إذا لم تكن موجودة

## تحسينات تم إضافتها للتطبيق
1. تحسين معالجة الأخطاء في `/api/user/route.ts`
2. تحسين معالجة الأخطاء في `/api/projects/route.ts`
3. تحسين واجهة برمجة التطبيقات في `src/lib/api.ts`
4. إضافة رسائل تصحيح أكثر تفصيلاً للمساعدة في تحديد المشاكل
