'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  HardDrive,
  Star,
  Battery,
  MonitorSmartphone,
  Camera,
  ShieldAlert,
  BadgeDollarSign,
  Send,
  CheckCircle,
} from 'lucide-react';
import buybackPrices, {
  conditionOptions,
  defectPenalties,
  PRICE_MULTIPLIER,
  type Condition,
  type BuybackModel,
} from '../data/buybackPrices';

/* ─── step metadata ──────────────────────────────────────── */
const stepsMeta = [
  { label: 'Model', icon: Smartphone },
  { label: 'Úložiště', icon: HardDrive },
  { label: 'Stav', icon: Star },
  { label: 'Baterie', icon: Battery },
  { label: 'Displej', icon: MonitorSmartphone },
  { label: 'Kamera', icon: Camera },
  { label: 'Tělo', icon: ShieldAlert },
  { label: 'Cena', icon: BadgeDollarSign },
];

/* ─── reusable ANO / NE pills ────────────────────────────── */
function YesNoButtons({
  value,
  onChange,
  yesLabel = 'ANO',
  noLabel = 'NE',
  /** If true, "ANO" is the desirable (default-looking) option, otherwise "NE" */
  positiveIsYes = true,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  positiveIsYes?: boolean;
}) {
  const btn = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-primary text-white shadow-md shadow-primary/25'
          : 'bg-surface text-gray-600 hover:bg-gray-100 border border-border'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-3">
      {positiveIsYes ? (
        <>
          {btn(yesLabel, value === true, () => onChange(true))}
          {btn(noLabel, value === false, () => onChange(false))}
        </>
      ) : (
        <>
          {btn(noLabel, value === false, () => onChange(false))}
          {btn(yesLabel, value === true, () => onChange(true))}
        </>
      )}
    </div>
  );
}

/* ─── compact step indicator for 8 steps ─────────────────── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-8 h-3 bg-primary'
                  : isDone
                    ? 'w-3 h-3 bg-primary/40'
                    : 'w-3 h-3 bg-border'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ─── main wizard component ──────────────────────────────── */
export default function BuybackWizard() {
  /* state */
  const [step, setStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<BuybackModel | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(
    null,
  );
  const [isDamaged, setIsDamaged] = useState(false);
  const [batteryOk, setBatteryOk] = useState<boolean | null>(null);
  const [brokenDisplay, setBrokenDisplay] = useState<boolean | null>(null);
  const [brokenCamera, setBrokenCamera] = useState<boolean | null>(null);
  const [bentOrBroken, setBentOrBroken] = useState<boolean | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* derived */
  const storage =
    selectedModel && selectedStorage !== null
      ? selectedModel.storages[selectedStorage]
      : null;

  /* price calculation ── base price × multiplier minus defect penalties */
  const estimatedPrice = useMemo(() => {
    if (!storage || !selectedCondition || isDamaged) return 0;
    let price = storage.prices[selectedCondition] * PRICE_MULTIPLIER;
    if (batteryOk === false) price -= price * defectPenalties.batteryBelow85;
    if (brokenDisplay === true) price -= price * defectPenalties.brokenDisplay;
    if (brokenCamera === true) price -= price * defectPenalties.brokenCamera;
    if (bentOrBroken === true) price -= price * defectPenalties.bentOrBroken;
    // round to nearest 500
    return Math.round(price / 500) * 500;
  }, [
    storage,
    selectedCondition,
    batteryOk,
    brokenDisplay,
    brokenCamera,
    bentOrBroken,
  ]);

  /* can advance? */
  const canProceed = (() => {
    switch (step) {
      case 0:
        return selectedModel !== null;
      case 1:
        return selectedStorage !== null;
      case 2:
        return selectedCondition !== null || isDamaged;
      case 3:
        return batteryOk !== null;
      case 4:
        return brokenDisplay !== null;
      case 5:
        return brokenCamera !== null;
      case 6:
        return bentOrBroken !== null;
      default:
        return false;
    }
  })();

  const handleNext = () => {
    if (!canProceed) return;
    if (step === 2 && isDamaged) {
      setStep(7);
      return;
    }
    setStep((s) => Math.min(s + 1, stepsMeta.length - 1));
  };
  const handleBack = () => {
    if (isDamaged && step === 7) {
      setStep(2);
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !phone) return;
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wizard',
          name,
          email,
          phone,
          model: selectedModel?.name ?? '',
          storage: storage?.label ?? '',
          condition: isDamaged
            ? 'Poškozený'
            : (conditionOptions.find((c) => c.key === selectedCondition)
                ?.label ?? ''),
          batteryOk: isDamaged ? null : batteryOk,
          brokenDisplay: isDamaged ? null : brokenDisplay,
          brokenCamera: isDamaged ? null : brokenCamera,
          bentOrBroken: isDamaged ? null : bentOrBroken,
          estimatedPrice: isDamaged ? null : estimatedPrice,
        }),
      });
    } catch {
      // pokud se email nepošle, přesto zobrazíme potvrzení
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedModel(null);
    setSelectedStorage(null);
    setSelectedCondition(null);
    setIsDamaged(false);
    setBatteryOk(null);
    setBrokenDisplay(null);
    setBrokenCamera(null);
    setBentOrBroken(null);
    setName('');
    setEmail('');
    setPhone('');
    setSubmitted(false);
  };

  /* step title */
  const stepTitle: Record<number, string> = {
    0: 'Zjisti cenu za svůj iPhone',
    1: 'Jaká je kapacita úložiště?',
    2: 'V jakém stavu je telefon?',
    3: 'Je kondice baterie nad 85 %?',
    4: 'Má telefon rozbitý displej?',
    5: 'Je kamera poškozená či nefunkční?',
    6: 'Je telefon ohnutý, prasklý či nefunkční?',
    7: isDamaged ? 'Individuální nacenění' : 'Odhadovaná výkupní cena',
  };

  /* ─── render step content ──────────────────────────────── */
  const renderStep = () => {
    switch (step) {
      /* ── 0  Model ── */
      case 0:
        return (
          <div className="space-y-4">
            {/* Custom dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-left text-sm font-medium text-dark flex justify-between items-center hover:border-primary/50 transition"
              >
                {selectedModel
                  ? selectedModel.name
                  : 'Vyberte svůj model iPhonu'}
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    dropdownOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-56 overflow-y-auto">
                  {buybackPrices.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => {
                        setSelectedModel(m);
                        setSelectedStorage(null);
                        setSelectedCondition(null);
                        setBatteryOk(null);
                        setBrokenDisplay(null);
                        setBrokenCamera(null);
                        setBentOrBroken(null);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-surface transition ${
                        selectedModel?.name === m.name
                          ? 'text-primary font-semibold bg-accent-light'
                          : 'text-gray-700'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      /* ── 1  Storage ── */
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedModel!.storages.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSelectedStorage(i)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedStorage === i
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'bg-surface text-gray-600 hover:bg-gray-100 border border-border'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-text-secondary text-xs leading-relaxed">
              Velikost úložiště zjistíš v:{' '}
              <span className="text-dark font-medium">
                Nastavení › Obecné › Úložiště
              </span>
            </p>
          </div>
        );

      /* ── 2  Condition ── */
      case 2:
        return (
          <div className="space-y-2">
            {conditionOptions.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => {
                  setSelectedCondition(c.key);
                  setIsDamaged(false);
                }}
                className={`w-full text-left rounded-xl px-4 py-3 transition-all ${
                  selectedCondition === c.key
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-surface text-dark hover:bg-gray-100 border border-border'
                }`}
              >
                <span className="font-semibold text-sm">{c.label}</span>
                <span
                  className={`block text-xs mt-0.5 ${
                    selectedCondition === c.key
                      ? 'text-white/80'
                      : 'text-text-secondary'
                  }`}
                >
                  {c.description}
                </span>
              </button>
            ))}
            {/* Poškozený – přeskočí detailní otázky */}
            <button
              type="button"
              onClick={() => {
                setSelectedCondition(null);
                setIsDamaged(true);
                setStep(7);
              }}
              className={`w-full text-left rounded-xl px-4 py-3 transition-all ${
                isDamaged
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-surface text-dark hover:bg-gray-100 border border-border'
              }`}
            >
              <span className="font-semibold text-sm">Poškozený</span>
              <span
                className={`block text-xs mt-0.5 ${
                  isDamaged ? 'text-white/80' : 'text-text-secondary'
                }`}
              >
                Zařízení je výrazně poškozené, nefunkční nebo má prasklý
                displej.
              </span>
            </button>
          </div>
        );

      /* ── 3  Battery ── */
      case 3:
        return (
          <div className="space-y-4">
            <YesNoButtons
              value={batteryOk}
              onChange={setBatteryOk}
              positiveIsYes
            />
            <p className="text-text-secondary text-xs leading-relaxed">
              Kapacitu baterie zjistíš v:{' '}
              <span className="text-dark font-medium">
                Nastavení › Baterie › Stav baterie
              </span>
            </p>
          </div>
        );

      /* ── 4  Display ── */
      case 4:
        return (
          <YesNoButtons
            value={brokenDisplay}
            onChange={setBrokenDisplay}
            positiveIsYes={false}
          />
        );

      /* ── 5  Camera ── */
      case 5:
        return (
          <YesNoButtons
            value={brokenCamera}
            onChange={setBrokenCamera}
            positiveIsYes={false}
          />
        );

      /* ── 6  Bent / broken ── */
      case 6:
        return (
          <div className="space-y-4">
            <YesNoButtons
              value={bentOrBroken}
              onChange={setBentOrBroken}
              positiveIsYes={false}
            />
            <p className="text-text-secondary text-xs leading-relaxed">
              Jedná se o jakékoliv fyzické poškození, které znemožňuje běžné
              používání telefonu.
            </p>
          </div>
        );

      /* ── 7  Result ── */
      case 7:
        /* ── Poškozené zařízení – individuální nacenění ── */
        if (isDamaged) {
          return submitted ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
              <h3 className="text-dark text-xl font-bold">Děkujeme!</h3>
              <p className="text-text-secondary text-sm">
                Ozveme se vám co nejdříve a domluvíme se na osobní návštěvě.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 text-primary text-sm font-semibold hover:underline"
              >
                Nacenit další zařízení
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl bg-surface border border-border px-5 py-4 text-sm text-dark leading-relaxed">
                <p className="font-semibold mb-1">Výkup poškozeného zařízení</p>
                <p className="text-text-secondary">
                  Cena závisí na konkrétním poškození a může se výrazně lišit.
                  Zařízení přineste osobně na naši provozovnu — nacenění
                  provedeme okamžitě a zdarma.
                </p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Jméno a příjmení"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!name || !email || !phone || sending}
                  className="w-full bg-accent hover:bg-accent/90 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'Odesílám…' : 'Nezávazně se ozvěte'}
                </button>
              </div>
            </div>
          );
        }

        return submitted ? (
          /* ─ Thank-you state ─ */
          <div className="text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h3 className="text-dark text-xl font-bold">Děkujeme!</h3>
            <p className="text-text-secondary text-sm">
              Ozveme se vám co nejdříve s&nbsp;finální nabídkou.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 text-primary text-sm font-semibold hover:underline"
            >
              Nacenit další zařízení
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Summary chips */}
            <div className="flex flex-wrap gap-2">
              {[
                selectedModel?.name,
                storage?.label,
                conditionOptions.find((c) => c.key === selectedCondition)
                  ?.label,
                batteryOk === false ? 'Baterie pod 85 %' : null,
                brokenDisplay ? 'Rozbitý displej' : null,
                brokenCamera ? 'Poškozená kamera' : null,
                bentOrBroken ? 'Ohnutý / prasklý' : null,
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface border border-border text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* Price */}
            <div className="text-center">
              <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">
                Odhadovaná cena
              </p>
              <p className="text-text-secondary text-xs font-medium mb-0.5">
                Maximálně až
              </p>
              <p className="text-primary text-4xl font-extrabold">
                {estimatedPrice.toLocaleString('cs-CZ')}&nbsp;Kč
              </p>
              <p className="text-text-secondary text-[11px] mt-2 leading-relaxed">
                *&nbsp;Jedná se o <strong>orientační strop</strong> výkupní
                ceny. Finální částka bude stanovena až po{' '}
                <strong>osobní diagnostice zařízení</strong> v naší provozovně.
              </p>
            </div>

            {/* Contact form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Jméno a příjmení"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name || !email || !phone || sending}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Odesílám…' : 'Odeslat poptávku'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ─── ui ───────────────────────────────────────────────── */
  return (
    <div className="relative rounded-2xl bg-white border border-border shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 sm:p-8 overflow-hidden min-h-[520px]">
      {/* Background decoration */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col h-full min-h-[460px]">
        {/* Step indicator */}
        <StepIndicator current={step} total={stepsMeta.length} />

        {/* Step title */}
        <h3 className="text-dark font-bold text-lg sm:text-xl text-center mb-5">
          {stepTitle[step]}
        </h3>

        {/* Animated step content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step + (submitted ? '-done' : '')}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation — pinned to bottom */}
        <div className="mt-auto pt-6">
          {step < 7 && (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-1 text-text-secondary hover:text-dark text-sm font-medium disabled:opacity-0 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Zpět
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-1 bg-primary hover:bg-primary-hover disabled:opacity-30 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                Pokračovat
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 7 && !submitted && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-text-secondary hover:text-dark text-sm font-medium transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Zpět
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
