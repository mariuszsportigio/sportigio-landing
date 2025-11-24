import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import trophyIcon from "lucide-static/icons/trophy.svg?raw";
import sparklesIcon from "lucide-static/icons/sparkles.svg?raw";
import handHeartIcon from "lucide-static/icons/hand-heart.svg?raw";
import megaphoneIcon from "lucide-static/icons/megaphone.svg?raw";

interface PlanCard {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  totalLabel?: string;
  feesLabel?: string;
  profitLabel?: string;
  footer?: string;
}

interface Copy {
  title: string;
  subtitle: string;
  cta: string;
  modalTitle: string;
  sliderLabel: string;
  sliderHint: string;
  assumptionsTitle: string;
  assumptions: string[];
  plans: PlanCard[];
  cards?: {
    id: string;
    title: string;
    description: string;
    badge: string;
  }[];
  currency: string;
  range: { min: number; max: number; default: number };
  model: {
    conversion: number;
    aov: { basic: number; pro: number };
    fee: {
      percent: number;
      fixed?: { basic?: number; pro?: number };
    };
  };
}

interface Props {
  lang?: string;
  copy: Copy;
}

const formatMoney = (value: number, lang?: string) =>
  new Intl.NumberFormat(lang === "en" ? "en-US" : "pl-PL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const RevenueCalculatorIsland = ({ lang, copy }: Props) => {
  const [users, setUsers] = useState<number>(copy.range.default);
  const [isOpen, setIsOpen] = useState(false);

  const cardIcons: Record<string, string> = {
    tribune: trophyIcon,
    premium: sparklesIcon,
    support: handHeartIcon,
    ads: megaphoneIcon,
  };

  const data = useMemo(() => {
    const paying = users * copy.model.conversion;
    const revenueBasic = paying * copy.model.aov.basic * 12;
    const revenuePro = paying * copy.model.aov.pro * 12;

    const transactions = paying * 12;
    const fixedBasic =
      (copy.model.fee.fixed?.basic ?? 0) * transactions * -1;
    const fixedPro = (copy.model.fee.fixed?.pro ?? 0) * transactions * -1;

    const percentBasic = revenueBasic * copy.model.fee.percent * -1;
    const percentPro = revenuePro * copy.model.fee.percent * -1;

    const feesBasic = percentBasic + fixedBasic;
    const feesPro = percentPro + fixedPro;

    return {
      users,
      basic: {
        revenue: revenueBasic,
        fees: feesBasic,
        profit: revenueBasic + feesBasic,
      },
      pro: {
        revenue: revenuePro,
        fees: feesPro,
        profit: revenuePro + feesPro,
      },
    };
  }, [users, copy]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow");
  };

  const open = () => {
    setIsOpen(true);
    document.body.style.setProperty("overflow", "hidden");
    document.documentElement.style.setProperty("overflow", "hidden");
  };

  useEffect(() => () => handleClose(), []);

  const planOrder = copy.plans.length > 0 ? copy.plans : [];
  const cards = copy.cards ?? [];

  return (
    <>
      <section class="py-16 bg-[#F6F8FD]">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center max-w-3xl mx-auto mb-10">
            <h3 class="text-3xl font-bold text-[#0B2360]">{copy.title}</h3>
            <p class="mt-3 text-base text-gray-600">{copy.subtitle}</p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
              const icon = cardIcons[card.id] ?? cardIcons.tribune;
              return (
                <div class="h-full rounded-2xl bg-white border border-[#0B2360]/10 shadow-sm p-6 flex flex-col gap-4">
                  <div
                    class="w-12 h-12 rounded-xl bg-[#0B2360]/8 text-[#0B2360] flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: icon }}
                    aria-hidden="true"
                  />
                  <div>
                    <h4 class="text-lg font-semibold text-[#0B2360]">
                      {card.title}
                    </h4>
                    <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <span class="inline-flex w-fit items-center px-3 py-1 rounded-full border border-[#0B2360]/20 text-xs font-semibold text-[#0B2360]">
                    {card.badge}
                  </span>
                </div>
              );
            })}
          </div>

          <div class="mt-8 flex justify-center">
            <button
              class="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-[#0B2360]/30 text-[#0B2360] font-semibold shadow-sm hover:shadow-md hover:border-[#0B2360]/60 transition"
              onClick={open}
            >
              <span>{copy.cta}</span>
              <span class="material-symbols-rounded text-base">calculate</span>
            </button>
          </div>
        </div>
      </section>

      {isOpen && (
        <div
          class="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
        >
          <div class="relative bg-white rounded-2xl overflow-hidden max-h-[90vh] w-full max-w-3xl shadow-2xl border border-gray-200">
            <button
              class="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:text-[#0B2360] hover:bg-gray-200 flex items-center justify-center"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>

            <div class="p-6 border-b border-gray-100">
              <h3 class="text-2xl font-bold text-[#0B2360]">{copy.modalTitle}</h3>
            </div>

            <div class="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
              <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-base font-semibold text-[#0B2360]">
                    {copy.sliderLabel}
                  </h4>
                  <div class="text-lg font-semibold text-[#0B2360]">{data.users}</div>
                </div>
                <input
                  type="range"
                  min={copy.range.min}
                  max={copy.range.max}
                  step={10}
                  value={users}
                  onInput={(e) => setUsers(Number((e.target as HTMLInputElement).value))}
                  class="w-full accent-[#0B2360]"
                />
                <p class="text-xs text-gray-500 mt-2">{copy.sliderHint}</p>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                {planOrder.map((plan) => {
                  const isPro = plan.id === "pro";
                  const planData = isPro ? data.pro : data.basic;
                  return (
                    <div
                      class={`rounded-2xl border p-5 shadow-sm bg-white ${
                        isPro ? "border-[#01DFEC]/40" : "border-[#0B2360]/15"
                      }`}
                    >
                      <div class="flex items-start justify-between mb-3">
                        <div>
                          <h5 class="text-lg font-semibold text-[#0B2360]">
                            {plan.title}
                          </h5>
                          {plan.subtitle && (
                            <p class="text-sm text-gray-500">{plan.subtitle}</p>
                          )}
                        </div>
                        {plan.badge && (
                          <span
                            class={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                              isPro
                                ? "bg-[#01DFEC]/15 text-[#0B2360]"
                                : "bg-[#0B2360]/10 text-[#0B2360]"
                            }`}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <div class="space-y-1.5 text-sm text-gray-700">
                        <div class="flex justify-between">
                          <span>{plan.totalLabel}</span>
                          <span class="font-semibold">
                            {formatMoney(planData.revenue, lang)} {copy.currency}
                          </span>
                        </div>
                        <div class="flex justify-between text-[#e63946]">
                          <span>{plan.feesLabel}</span>
                          <span class="font-semibold">
                            {formatMoney(planData.fees, lang)} {copy.currency}
                          </span>
                        </div>
                      </div>

                      <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <div class="text-sm text-[#0B2360] font-semibold">
                          {plan.profitLabel}
                        </div>
                        <div class="text-2xl font-extrabold text-[#0B2360]">
                          {formatMoney(planData.profit, lang)} {copy.currency}
                        </div>
                      </div>

                      {plan.footer && (
                        <p class="mt-3 text-xs text-gray-500">{plan.footer}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {copy.assumptions.length > 0 && (
                <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h5 class="text-sm font-semibold text-[#0B2360] mb-2">
                    {copy.assumptionsTitle}
                  </h5>
                  <ul class="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {copy.assumptions.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RevenueCalculatorIsland;
