"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";

type Field = "name" | "email";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const validate = () => {
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!name.trim()) nextErrors.name = "Введите имя";
    if (!email.trim()) nextErrors.email = "Введите e-mail";
    else if (!email.includes("@")) nextErrors.email = "Нужен корректный e-mail с «@»";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    login({ name: name.trim(), email: email.trim() });
    router.push("/account");
  };

  const inputClasses =
    "w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none";

  const handleChange =
    (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (field === "name") setName(value);
      if (field === "email") setEmail(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Вход</h1>
        <p className="text-zinc-300">
          Демонстрационный логин без настоящего бэкенда. Введите имя и e-mail, чтобы продолжить.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-200">Имя</label>
          <input
            type="text"
            value={name}
            onChange={handleChange("name")}
            className={inputClasses}
            placeholder="Как к вам обращаться"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-200">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            className={inputClasses}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
        >
          Войти
        </button>
      </form>
    </section>
  );
}
