"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type FormFields = {
  name: string;
  city: string;
  address: string;
  roasters: string;
  origins: string;
  brewMethods: string[];
  amenities: string[];
  website: string;
  contact: string;
  comment: string;
};

type RequiredField = "name" | "city" | "roasters" | "contact";
type Errors = Partial<Record<RequiredField, string>>;
type TextField = Exclude<keyof FormFields, "brewMethods" | "amenities">;

const brewMethodOptions = ["V60", "Chemex", "Kalita", "AeroPress", "Batch brew"];
const amenityOptions = ["Wi-Fi", "Розетки", "Подходит для работы", "Эспрессо"];

const getInitialFormState = (): FormFields => ({
  name: "",
  city: "",
  address: "",
  roasters: "",
  origins: "",
  brewMethods: [],
  amenities: [],
  website: "",
  contact: "",
  comment: "",
});

export default function ApplyPage() {
  const [form, setForm] = useState<FormFields>(getInitialFormState());
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleTextChange =
    (field: TextField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [field]: value }));

      // Снимаем ошибку по полю, если пользователь начал исправлять ввод.
      if (errors[field as RequiredField]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as RequiredField];
          return next;
        });
      }
      setSuccessMessage("");
    };

  const toggleGroupValue = (field: "brewMethods" | "amenities", value: string) => {
    setForm((prev) => {
      const current = prev[field];
      const exists = current.includes(value);
      const updated = exists ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [field]: updated };
    });
    setSuccessMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Errors = {};

    if (!form.name.trim()) nextErrors.name = "Укажите название кофейни";
    if (!form.city.trim()) nextErrors.city = "Укажите город";
    if (!form.roasters.trim()) nextErrors.roasters = "Расскажите, чью обжарку используете";
    if (!form.contact.trim()) nextErrors.contact = "Оставьте контакт для связи";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      return;
    }

    setSuccessMessage(
      "Заявка отправлена. Это демонстрационный прототип, данные пока никуда не сохраняются."
    );
    setForm(getInitialFormState()); // Сбрасываем форму после успешной отправки.
  };

  const inputClasses =
    "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none";

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Как подать заявку</h1>
        <p className="max-w-2xl text-zinc-300">
          Эта страница для владельцев specialty кофейн, которые хотят попасть в World Wide Coffee
          Guide. Заполните форму — мы сверим её с критериями гида и свяжемся с вами.
        </p>
      </header>

      {successMessage && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-200">
              Название кофейни <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleTextChange("name")}
              placeholder="Например, Bloom Coffee"
              className={inputClasses}
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-200">
              Город <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.city}
              onChange={handleTextChange("city")}
              placeholder="Город, страна"
              className={inputClasses}
            />
            {errors.city && <p className="text-xs text-red-400">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-200">Адрес (если уже открыт)</label>
            <input
              type="text"
              value={form.address}
              onChange={handleTextChange("address")}
              placeholder="Улица, дом, ориентир"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-200">
              Обжарщики <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.roasters}
              onChange={handleTextChange("roasters")}
              placeholder="С кем работаете: местные или зарубежные обжарщики"
              className={`${inputClasses} min-h-[96px]`}
            />
            {errors.roasters && <p className="text-xs text-red-400">{errors.roasters}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-200">
              Страна происхождения зерна / регионы
            </label>
            <input
              type="text"
              value={form.origins}
              onChange={handleTextChange("origins")}
              placeholder="Например, Эфиопия, Колумбия (region-specific), Кения"
              className={inputClasses}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="text-sm font-medium text-zinc-200">Методы заваривания</div>
            <div className="flex flex-wrap gap-3">
              {brewMethodOptions.map((method) => (
                <label key={method} className="inline-flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={form.brewMethods.includes(method)}
                    onChange={() => toggleGroupValue("brewMethods", method)}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="text-sm font-medium text-zinc-200">Удобства</div>
            <div className="flex flex-wrap gap-3">
              {amenityOptions.map((item) => (
                <label key={item} className="inline-flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(item)}
                    onChange={() => toggleGroupValue("amenities", item)}
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-200">
              Ссылка на сайт или соцсети
            </label>
            <input
              type="text"
              value={form.website}
              onChange={handleTextChange("website")}
              placeholder="https://..."
              className={inputClasses}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-200">
              Контактное лицо и e-mail <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={handleTextChange("contact")}
              placeholder="Имя, роль, e-mail"
              className={inputClasses}
            />
            {errors.contact && <p className="text-xs text-red-400">{errors.contact}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-zinc-200">Дополнительный комментарий</label>
            <textarea
              value={form.comment}
              onChange={handleTextChange("comment")}
              placeholder="Формат проекта, планы, сроки открытия и т.д."
              className={`${inputClasses} min-h-[120px]`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
        >
          Отправить заявку
        </button>
      </form>
    </section>
  );
}
