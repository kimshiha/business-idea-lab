import { GoogleGenerativeAI } from "@google/generative-ai";

export function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.");
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Gemini를 사용하여 아이디어 분석 및 확장
 * @param ideas - 분석할 아이디어 배열
 * @returns AI 분석 결과
 */
export async function analyzeIdeasWithGemini(ideas: Array<{ title: string; content: string; category?: string | null }>) {
  const genAI = createGeminiClient();
  // gemini-2.5-flash 모델 사용
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const ideasText = ideas
    .map((idea, index) => {
      return `아이디어 ${index + 1}:
제목: ${idea.title}
내용: ${idea.content}
${idea.category ? `카테고리: ${idea.category}` : ""}`;
    })
    .join("\n\n");

  const prompt = `당신은 비즈니스 아이디어 분석 전문가입니다. 다음 아이디어들을 분석해주세요.

${ideasText}

다음 형식으로 응답해주세요:

1. **카테고리 분류**: 유사한 아이디어들을 카테고리별로 그룹화하고, 각 카테고리에 적절한 이름을 부여하세요.

2. **새로운 사업 모델 제안**: 서로 다른 카테고리의 아이디어 2개를 결합하여 혁신적인 새로운 사업 모델을 제안하세요. 각 제안에는 다음을 포함하세요:
   - 결합된 아이디어들
   - 새로운 사업 모델 설명
   - 잠재적 시장 가치
   - 실행 가능성 평가

응답은 한국어로 작성해주세요.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error("AI로부터 응답을 받지 못했습니다.");
    }
    
    return text;
  } catch (error: any) {
    console.error("Gemini API 오류:", error);
    
    // 더 자세한 에러 메시지 제공
    if (error.message?.includes("API_KEY")) {
      throw new Error("Gemini API 키가 유효하지 않습니다. GEMINI_API_KEY 환경 변수를 확인해주세요.");
    }
    
    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      throw new Error("Gemini API 사용량 한도에 도달했습니다. 나중에 다시 시도해주세요.");
    }
    
    throw new Error(
      error.message || "아이디어 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

