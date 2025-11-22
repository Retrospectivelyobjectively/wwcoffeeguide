"use client";

import Link from "next/link";
import { useAuth } from "@/auth/AuthProvider";

export default function AccountPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Личный кабинет</h1>
        <p className="text-zinc-300">
          Вы не авторизованы. Перейдите на страницу входа, чтобы продолжить.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex w-fit items-center justify-center rounded-md border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
        >
          Перейти к входу
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Привет, {currentUser.name}!</h1>
        <p className="text-zinc-300">Ваш e-mail: {currentUser.email}</p>
      </div>

      <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <h2 className="text-xl font-semibold">Что появится здесь позже</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-300">
          <li>Избранные кофейни.</li>
          <li>Посещённые кофейни и отзывы.</li>
        </ul>
        <p className="text-sm text-zinc-400">
          Это демонстрационный кабинет без реального бэкенда. Список функций будет расширяться.
        </p>
      </div>
    </section>
  );
}
