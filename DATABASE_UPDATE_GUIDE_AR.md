# تعليمات تحديث قاعدة البيانات لدعم جميع المجالات المهنية

هذا الملف يحتوي على تعليمات لتحديث قاعدة بيانات Supabase لدعم جميع المجالات المهنية والتخصصات في منصة Portfolio Maker.

## الخطوات المطلوبة

1. **تنفيذ SQL لتحديث قاعدة البيانات**:
   - قم بفتح لوحة تحكم Supabase الخاصة بمشروعك
   - انتقل إلى SQL Editor
   - قم بنسخ محتوى ملف `update_schema_for_all_fields.sql` وتنفيذه
   - تأكد من عدم ظهور أي أخطاء أثناء التنفيذ

2. **تنفيذ أداة فحص التوافق**:
   للتأكد من أن جميع التغييرات تم تطبيقها بنجاح:
   ```bash
   node check_database_compatibility.js
   ```

3. **تحديث متغيرات البيئة** (إذا لزم الأمر):
   تأكد من وجود ملف `.env.local` يحتوي على المتغيرات التالية:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## التغييرات التي تم إجراؤها

1. **جدول المستخدمين (users)**:
   - إضافة حقول لمنصات التواصل الاجتماعي: Instagram, Behance, Dribbble, YouTube, Facebook
   - إضافة حقل `field_of_work` لتحديد مجال العمل
   - إضافة حقل `years_of_experience` لسنوات الخبرة

2. **جدول المشاريع (projects)**:
   - تغيير اسم `github_link` إلى `url` ليكون أكثر عمومية
   - إضافة حقول: `project_type`, `start_date`, `end_date`, `client`

3. **جداول جديدة**:
   - `experiences`: لتخزين الخبرات العملية
   - `education`: للمؤهلات التعليمية
   - `certifications`: للشهادات المهنية
   - `languages`: للغات

## الواجهات الجديدة

تم تحديث ملف `src/types/index.ts` ليشمل واجهات (interfaces) جديدة:
- `Experience`
- `Education`
- `Certification`
- `Language`

كما تم تحديث واجهة `DatabaseUser` و `UserProfile` و `Project` لتدعم الحقول الجديدة.

## ملاحظات مهمة

- تم تصميم التحديثات لتكون متوافقة للخلف (backward compatible)
- يمكن للمستخدمين الحاليين الاستمرار في استخدام المنصة دون أي تغييرات
- الميزات الجديدة ستظهر تلقائيًا لجميع المستخدمين
