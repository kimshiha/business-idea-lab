import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { IdeaForm } from "@/components/IdeaForm";
import { IdeasDashboard } from "@/components/IdeasDashboard";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            아이디어 대시보드
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            매일 아이디어를 기록하고 AI로 확장하세요
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <IdeaForm />
          </div>
          <div className="lg:col-span-2">
            <IdeasDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
