import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // OAuth 에러 처리
  if (error) {
    console.error("OAuth 에러:", error, errorDescription);
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(errorDescription || error)}`,
        requestUrl.origin
      )
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/auth/login?error=인증 코드를 받지 못했습니다.", requestUrl.origin)
    );
  }

  try {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("세션 교환 오류:", exchangeError);
      return NextResponse.redirect(
        new URL(
          `/auth/login?error=${encodeURIComponent(exchangeError.message || "인증에 실패했습니다.")}`,
          requestUrl.origin
        )
      );
    }

    return NextResponse.redirect(new URL("/", requestUrl.origin));
  } catch (error: any) {
    console.error("콜백 처리 예외:", error);
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=${encodeURIComponent(error.message || "인증 처리 중 오류가 발생했습니다.")}`,
        requestUrl.origin
      )
    );
  }
}

