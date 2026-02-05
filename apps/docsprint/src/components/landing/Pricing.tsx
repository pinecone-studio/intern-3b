'use client';

import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const plans = [
  {
    name: 'Үнэгүй',
    price: '0',
    description: 'Жижиг бизнест тохиромжтой',
    features: [
      '10 хүртэлх ажилтан',
      'Үндсэн гэрээний загвар',
      'И-мэйл дэмжлэг',
    ],
    popular: false,
  },
  {
    name: 'Стандарт',
    price: '99,000',
    description: 'Өсөж буй компанид',
    features: [
      '100 хүртэлх ажилтан',
      'Бүх гэрээний загвар',
      'Гэрээ засварлах',
      'Тайлан статистик',
      'Утасны дэмжлэг',
    ],
    popular: true,
  },
  {
    name: 'Премиум',
    price: '299,000',
    description: 'Том байгууллагад',
    features: [
      'Хязгааргүй ажилтан',
      'Захиалгат гэрээний загвар',
      'API холболт',
      '24/7 дэмжлэг',
      'Тусгай менежер',
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Танд тохирох багцыг сонгоорой
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Бүх багц 14 хоногийн үнэгүй туршилттай. Картын мэдээлэл
            шаардлагагүй.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-blue-600 shadow-2xl shadow-blue-100 scale-105 z-10'
                  : 'bg-white border border-slate-200 hover:border-blue-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg shadow-indigo-200">
                  Түгээмэл
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 font-medium">₮/сар</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <div className="h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-blue-600 stroke-[3px]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/login?tab=register" className="block">
                <Button
                  className={`w-full h-12 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200'
                  }`}
                >
                  Эхлэх
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
