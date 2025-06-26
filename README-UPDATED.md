# Portfolio Maker - منصة إنشاء البورتفوليو الاحترافي

منصة شاملة لإنشاء بورتفوليو احترافي لجميع التخصصات والمجالات المهنية.

## 🌟 المزايا الرئيسية

### لجميع التخصصات
- **التكنولوجيا والبرمجة**: مطورين، مهندسين، محللي البيانات
- **التصميم والإبداع**: مصممين جرافيك، مصممي UI/UX، فنانين، مصورين
- **التسويق والأعمال**: مسوقين، محللي أعمال، استشاريين
- **الطب والصحة**: أطباء، ممرضين، باحثين طبيين
- **التعليم**: معلمين، أساتذة جامعات، مدربين
- **الهندسة**: مهندسين معماريين، مدنيين، ميكانيكيين
- **القانون**: محامين، مستشارين قانونيين
- **الإعلام**: صحفيين، كتاب، منتجي محتوى
- **المالية**: محاسبين، محللين ماليين
- **الرياضة واللياقة**: مدربين، رياضيين
- **العمل الحر**: مستقلين في جميع المجالات

### مزايا تقنية متقدمة
- ✅ تسجيل دخول آمن عبر GitHub
- ✅ قاعدة بيانات Supabase موثوقة
- ✅ تصميم متجاوب لجميع الأجهزة
- ✅ دعم الوضع الليلي والنهاري
- ✅ رفع الملفات والصور
- ✅ روابط وسائل التواصل الاجتماعي المتعددة
- ✅ أنماط بورتفوليو متنوعة (إبداعي، مهني، أكاديمي، عصري)

## 🚀 التقنيات المستخدمة

- **Frontend**: Next.js 14, TypeScript, Chakra UI
- **Backend**: Next.js API Routes
- **قاعدة البيانات**: Supabase (PostgreSQL)
- **المصادقة**: NextAuth.js مع GitHub OAuth
- **التخزين**: Supabase Storage
- **الاستضافة**: Vercel (Frontend), Render (Backend)

## 📋 متطلبات النظام

- Node.js 18 أو أحدث
- npm أو yarn
- حساب GitHub
- حساب Supabase
- حساب Vercel (للاستضافة)

## ⚡ التثبيت والإعداد

### 1. استنساخ المشروع
```bash
git clone https://github.com/yourusername/portfolio-maker.git
cd portfolio-maker/portfolio-app
```

### 2. تثبيت التبعيات
```bash
npm install
```

### 3. إعداد متغيرات البيئة
إنشاء ملف `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. إعداد قاعدة البيانات
```bash
# تشغيل السكريبت الأساسي
psql -h your-db-host -U your-username -d your-database -f supabase_setup.sql

# تشغيل التحديثات للمجالات الجديدة
psql -h your-db-host -U your-username -d your-database -f update_schema_for_all_fields.sql
```

### 5. تشغيل التطبيق
```bash
npm run dev
```

## 🗃️ هيكل قاعدة البيانات

### جداول رئيسية
- **users**: معلومات المستخدمين الشخصية والمهنية
- **projects**: المشاريع والأعمال لجميع التخصصات
- **experiences**: الخبرات المهنية والتطوعية
- **education**: المؤهلات التعليمية
- **certifications**: الشهادات والإنجازات
- **languages**: اللغات ومستوى الإتقان
- **social_links**: روابط وسائل التواصل الاجتماعي

### حقول جديدة للدعم الشامل
- `field_of_work`: مجال العمل (تصميم، طب، هندسة، إلخ)
- `years_of_experience`: سنوات الخبرة
- `project_type`: نوع المشروع (مهني، شخصي، أكاديمي، تطوعي)
- منصات اجتماعية إضافية: Instagram, Behance, Dribbble, YouTube, Facebook

## 📁 هيكل المجلدات

```
portfolio-app/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   ├── dashboard/        # لوحة التحكم
│   │   ├── portfolio/        # صفحات البورتفوليو
│   │   └── auth/            # صفحات المصادقة
│   ├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── lib/                 # المكتبات والأدوات
│   ├── theme/               # إعدادات التصميم
│   └── types/               # تعريفات TypeScript
├── public/                  # الملفات العامة
└── supabase/               # ملفات قاعدة البيانات
```

## 🎨 أنماط البورتفوليو

### 1. Modern (عصري)
- تصميم نظيف ومبسط
- مناسب لجميع المجالات
- ألوان هادئة وخطوط حديثة

### 2. Creative (إبداعي)
- تصميم جريء وملفت
- مثالي للمصممين والفنانين
- ألوان زاهية وحركات متقدمة

### 3. Professional (مهني)
- تصميم رسمي ومحافظ
- مناسب للمجالات المؤسسية
- تركيز على المحتوى والخبرات

### 4. Academic (أكاديمي)
- تصميم منظم ومفصل
- مثالي للباحثين والأكاديميين
- تركيز على النشر والبحوث

## 🌐 المنصات المدعومة

### للمطورين والتقنيين
- GitHub, GitLab, Stack Overflow
- LinkedIn, Twitter
- Personal Website

### للمصممين والمبدعين
- Behance, Dribbble, Adobe Portfolio
- Instagram, Pinterest
- Personal Website

### للمسوقين ومنشئي المحتوى
- LinkedIn, Twitter, Facebook
- YouTube, Instagram, TikTok
- Personal Website/Blog

### للمهنيين العامين
- LinkedIn (الأهم لجميع المجالات)
- Website/Portfolio الشخصي
- منصات متخصصة حسب المجال

## 🚀 الاستضافة والنشر

### Frontend (Vercel)
```bash
# ربط المشروع بـ Vercel
vercel --prod
```

### إعداد متغيرات البيئة في Vercel
1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. Settings > Environment Variables
4. أضف جميع المتغيرات من `.env.local`

### Backend API (Next.js API Routes)
- مضمن مع Frontend في Vercel
- لا حاجة لإعداد منفصل

## 🔧 الصيانة والتطوير

### إضافة مجالات جديدة
1. تحديث `field_of_work` options في `ProfileEditModal.tsx`
2. إضافة فئات مشاريع جديدة في `ProjectModal.tsx`
3. تحديث قاعدة البيانات حسب الحاجة

### إضافة منصات اجتماعية جديدة
1. تحديث `DatabaseUser` interface في `types/index.ts`
2. إضافة الحقول في `ProfileEditModal.tsx`
3. تحديث `portfolio/[username]/page.tsx` لعرض الروابط
4. تحديث API routes

## 📚 الدعم والمساعدة

### مشاكل شائعة
- **خطأ في المصادقة**: تأكد من إعداد GitHub OAuth بشكل صحيح
- **مشاكل قاعدة البيانات**: تحقق من متغيرات Supabase
- **أخطاء Build**: تأكد من تثبيت جميع التبعيات

### الوثائق المفيدة
- [دليل إعداد GitHub OAuth](GITHUB_OAUTH_SETUP.md)
- [دليل حل مشاكل GitHub](GITHUB_TROUBLESHOOTING_AR.md)
- [دليل المستخدم العربي](USER_GUIDE_AR.md)

## 🤝 المساهمة

نرحب بالمساهمات! الرجاء:
1. عمل Fork للمشروع
2. إنشاء branch جديد للميزة
3. تطبيق التغييرات
4. إجراء اختبارات
5. إرسال Pull Request

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT. انظر ملف `LICENSE` للمزيد من التفاصيل.

## 📞 التواصل

- **المطور**: [اسمك]
- **البريد الإلكتروني**: your-email@example.com
- **GitHub**: https://github.com/yourusername
- **LinkedIn**: https://linkedin.com/in/yourprofile

---

🎯 **Portfolio Maker** - اصنع بورتفوليو احترافي يمثل خبرتك ومهاراتك بأفضل شكل ممكن، مهما كان مجال عملك!
