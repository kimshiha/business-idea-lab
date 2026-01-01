import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
        },
      },
    }
  );

  // IMPORTANT: 세션을 새로고침하여 만료된 세션을 업데이트합니다
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 보호된 경로에 대한 리다이렉트 로직은 여기에 추가할 수 있습니다
  // 예: if (!user && request.nextUrl.pathname.startsWith('/dashboard')) { ... }

  return supabaseResponse;
}

