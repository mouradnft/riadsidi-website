// app/[locale]/about/page.tsx — About page
// Tells the story of Riad Sidi — history, philosophy, team, and location details

import { getTranslations } from 'next-intl/server'
import { MapPin, Clock, Car, Train, Plane } from 'lucide-react'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: `${t('title')} — Riad Sidi`,
    description: 'Learn about Riad Sidi — a luxury traditional riad in Fes, Morocco.',
  }
}

interface PageProps {
  params: { locale: string }
}

export default async function AboutPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'about' })

  // How to get there — distances from key points
  // These are static facts about the location that don't need to be in Sanity
  const directions = [
    { icon: Car,   label: locale === 'fr' ? 'Parking & Bus/Taxi' : locale === 'ar' ? 'مواقف السيارات والحافلات' : 'Parking & Bus/Taxi', detail: '< 1 min walk' },
    { icon: MapPin, label: locale === 'fr' ? 'Médina de Fès' : locale === 'ar' ? 'مدينة فاس القديمة' : 'Fes Medina', detail: '< 5 min walk' },
    { icon: Train,  label: locale === 'fr' ? 'Gare / Terminal Ferry' : locale === 'ar' ? 'محطة القطار' : 'Train / Ferry Station', detail: '~10 min' },
    { icon: Plane,  label: locale === 'fr' ? 'Aéroport Fès–Saïss' : locale === 'ar' ? 'مطار فاس سايس' : 'Fes–Saïss Airport', detail: '~20 min' },
  ]

  // The property highlights — key selling points
  const highlights = [
    { fr: 'Riad entièrement rénové avec architecture marocaine traditionnelle', en: 'Fully renovated riad with traditional Moroccan architecture', ar: 'رياض مُجدَّد بالكامل بالهندسة المعمارية المغربية التقليدية' },
    { fr: 'Mosaïques colorées et bois de cèdre sculpté', en: 'Colorful mosaic tiles and carved cedar wood', ar: 'بلاط فسيفساء ملون وخشب أرز منحوت' },
    { fr: 'Vues panoramiques spectaculaires sur la ville', en: 'Spectacular panoramic views of the city', ar: 'مناظر بانورامية خلابة على المدينة' },
    { fr: 'WiFi gratuit dans tout le riad', en: 'Complimentary WiFi throughout', ar: 'واي فاي مجاني في كل أرجاء الرياض' },
    { fr: 'Personnel professionnel, accueillant et discret', en: 'Professional, friendly, and discreet staff', ar: 'طاقم محترف وودود ومنضبط' },
    { fr: 'Terrasse panoramique avec service de thé', en: 'Rooftop terrace with tea service', ar: 'شرفة علوية بانورامية مع خدمة الشاي' },
    { fr: 'Convient aux groupes, familles et voyages d\'affaires', en: 'Ideal for groups, families, and business travelers', ar: 'مثالي للمجموعات والعائلات ورجال الأعمال' },
  ]

  return (
    <>
      {/* ── Page hero banner ─────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-moroccan-dark pattern-overlay">
        <div className="container-custom text-center">
          <p className="text-gold font-body text-sm tracking-widest uppercase mb-3">About Us</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <div className="divider-gold" />
          <p className="text-gold/80 font-heading text-xl italic mt-4">{t('subtitle')}</p>
        </div>
      </section>

      {/* ── Story section ─────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-moroccan-dark mb-4">{t('storyTitle')}</h2>
              <div className="w-10 h-0.5 bg-gold mb-6" />
              <div className="space-y-4 text-moroccan-muted leading-relaxed">
                <p>
                  {locale === 'fr'
                    ? 'Niché dans le quartier résidentiel et paisible d\'Ain Azliten à Fès, le Riad Sidi est un havre de sérénité alliant le charme de l\'architecture marocaine traditionnelle au confort moderne. Entièrement rénové, il préserve l\'âme authentique des maisons andalouses tout en offrant toutes les commodités contemporaines.'
                    : locale === 'ar'
                    ? 'يقع رياض سيدي في حي عين أزليتن الهادئ والراقي بمدينة فاس، ويمثّل واحةً من السكينة تجمع بين سحر العمارة المغربية التقليدية والراحة العصرية. مُجدَّد بالكامل، يحتفظ بروح المنازل الأندلسية الأصيلة مع توفير جميع وسائل الراحة الحديثة.'
                    : 'Nestled in the quiet and prestigious Ain Azliten neighborhood of Fes, Riad Sidi is a haven of serenity that blends the charm of traditional Moroccan architecture with modern comfort. Fully renovated, it preserves the authentic soul of Andalusian houses while offering all contemporary amenities.'
                  }
                </p>
                <p>
                  {locale === 'fr'
                    ? 'Avec seulement 4 chambres soigneusement décorées, le Riad Sidi offre une expérience intime et personnalisée. Nos mosaïques colorées, notre bois de cèdre sculpté et notre terrasse panoramique vous plongeront dans l\'essence de la culture fassi.'
                    : locale === 'ar'
                    ? 'مع أربع غرف فقط مُزيَّنة بعناية فائقة، يُقدِّم رياض سيدي تجربة حميمة وشخصية. فسيفساؤنا الملونة وخشب الأرز المنحوت وشرفتنا البانورامية ستُغرقكم في جوهر الثقافة الفاسية.'
                    : 'With only 4 carefully decorated rooms, Riad Sidi offers an intimate and personalized experience. Our colorful mosaics, carved cedar wood, and panoramic rooftop terrace will immerse you in the essence of Fassi culture.'
                  }
                </p>
              </div>
            </div>

            {/* Highlights list */}
            <div className="bg-white rounded-sm p-8 shadow-md">
              <h3 className="font-heading text-xl font-semibold text-moroccan-dark mb-6">
                {t('philosophyTitle')}
              </h3>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-moroccan-muted text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    {h[locale as 'fr' | 'en' | 'ar'] || h.en}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location / Getting there section ─────────────────────── */}
      <section className="section-padding bg-moroccan-dark pattern-overlay">
        <div className="container-custom">
          <h2 className="section-title text-white mb-2">{t('locationTitle')}</h2>
          <p className="text-white/60 text-center mb-12">60 Bis Ain Azliten, Fes 30110, Morocco</p>

          {/* Distance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {directions.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 border border-white/10 rounded-sm hover:border-gold/40 transition-colors">
                <item.icon size={28} className="text-gold mb-3" />
                <p className="text-white font-body text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-gold font-heading text-lg font-bold">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Google Maps embed */}
          <div className="text-center">
            <a
              href="https://goo.gl/z3d9QjnSZYRjMExB9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MapPin size={16} />
              {locale === 'fr' ? 'Voir sur Google Maps' : locale === 'ar' ? 'عرض على خرائط جوجل' : 'View on Google Maps'}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
