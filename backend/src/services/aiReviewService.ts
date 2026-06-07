import OpenAI from "openai";
import { IReviewIssue } from "../models/Review";

interface AnalyzeCodeInput {
  code: string;
  language: string;
  forceMock?: boolean;
}

interface AnalyzeCodeResult {
  score: number;
  issues: IReviewIssue[];
  summary: string;
}

const analyzeCodeWithMock = async ({
  code,
  language,
}: AnalyzeCodeInput): Promise<AnalyzeCodeResult> => {
  const issues: IReviewIssue[] = [];

  const lowerCode = code.toLowerCase();

  if (lowerCode.includes("select") && code.includes("+")) {
    issues.push({
      title: "Possible SQL Injection Vulnerability",
      severity: "high",
      category: "security",
      line: 1,
      explanation:
        "The code appears to build a SQL query using string concatenation. This can allow attackers to inject malicious SQL commands.",
      suggestedFix:
        "Use parameterized queries or prepared statements instead of directly concatenating user input into SQL queries.",
      codeExample:
        "// Safer example\nconst query = 'SELECT * FROM users WHERE id = ?';\ndb.execute(query, [userId]);",
    });
  }

  if (
    lowerCode.includes("fetch(") &&
    !lowerCode.includes("catch") &&
    !lowerCode.includes("try")
  ) {
    issues.push({
      title: "Missing Error Handling",
      severity: "high",
      category: "bug",
      line: 1,
      explanation:
        "The code performs an API request but does not appear to handle possible network or server errors.",
      suggestedFix:
        "Wrap the request in a try-catch block or add a catch handler to manage failed requests gracefully.",
      codeExample:
        "try {\n  const response = await fetch(url);\n  const data = await response.json();\n} catch (error) {\n  console.error('Request failed:', error);\n}",
    });
  }

  if (lowerCode.includes("var ")) {
    issues.push({
      title: "Use const or let instead of var",
      severity: "medium",
      category: "readability",
      line: 1,
      explanation:
        "Using var can create confusing scope behavior. Modern JavaScript code usually prefers const or let.",
      suggestedFix:
        "Replace var with const when the value does not change, or let when reassignment is needed.",
      codeExample: "// Before\nvar total = 0;\n\n// After\nlet total = 0;",
    });
  }

  if (code.length > 800) {
    issues.push({
      title: "Large Code Block",
      severity: "medium",
      category: "maintainability",
      explanation:
        "The submitted code is relatively long. Large blocks can be harder to review, test, and maintain.",
      suggestedFix:
        "Consider splitting the logic into smaller functions or components with clear responsibilities.",
      codeExample: "",
    });
  }

  if (
    lowerCode.includes("for (") &&
    lowerCode.includes(".length") &&
    !lowerCode.includes("map(") &&
    !lowerCode.includes("reduce(")
  ) {
    issues.push({
      title: "Consider Using Array Methods",
      severity: "low",
      category: "maintainability",
      line: 1,
      explanation:
        "Manual loops are valid, but array methods such as map, filter, or reduce can sometimes make the code more readable.",
      suggestedFix:
        "Consider using array methods when they make the intention clearer.",
      codeExample:
        "const total = items.reduce((sum, item) => sum + item.price, 0);",
    });
  }

  if (issues.length === 0) {
    issues.push({
      title: "No Major Issues Detected",
      severity: "low",
      category: "readability",
      explanation:
        "The submitted code does not match the current predefined issue patterns.",
      suggestedFix:
        "Review the code manually as well, because automated analysis may miss context-specific problems.",
      codeExample: "",
    });
  }

  const highIssues = issues.filter((issue) => issue.severity === "high").length;
  const mediumIssues = issues.filter(
    (issue) => issue.severity === "medium"
  ).length;
  const lowIssues = issues.filter((issue) => issue.severity === "low").length;

  const score = Math.max(
    20,
    100 - highIssues * 18 - mediumIssues * 10 - lowIssues * 4
  );

  const summary = `AI review completed for ${language}. Found ${issues.length} issue(s): ${highIssues} high, ${mediumIssues} medium, and ${lowIssues} low priority.`;

  return {
    score,
    issues,
    summary,
  };
};

const analyzeCodeWithOpenAI = async ({
  code,
  language,
}: AnalyzeCodeInput): Promise<AnalyzeCodeResult> => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const openai = new OpenAI({
    apiKey,
  });

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const response = await openai.responses.create({
    model,
    input: [
      {
        role: "system",
        content:
          "You are an expert senior software engineer and security-focused code reviewer. Review code carefully and return practical, concise feedback. Do not invent line numbers if unsure. Return only valid JSON matching the schema.",
      },
      {
        role: "user",
        content: `Review this ${language} code. Focus on security, bugs, readability, maintainability, and performance.

Code:
${code}`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "code_review_result",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            score: {
              type: "number",
              minimum: 0,
              maximum: 100,
            },
            summary: {
              type: "string",
            },
            issues: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  title: {
                    type: "string",
                  },
                  severity: {
                    type: "string",
                    enum: ["high", "medium", "low"],
                  },
                  category: {
                    type: "string",
                    enum: [
                      "security",
                      "bug",
                      "readability",
                      "maintainability",
                      "performance",
                    ],
                  },
                  explanation: {
                    type: "string",
                  },
                  suggestedFix: {
                    type: "string",
                  },
                  codeExample: {
                    type: "string",
                  },
                  line: {
                    type: ["number", "null"],
                  },
                },
                required: [
                  "title",
                  "severity",
                  "category",
                  "explanation",
                  "suggestedFix",
                  "codeExample",
                  "line",
                ],
              },
            },
          },
          required: ["score", "summary", "issues"],
        },
      },
    },
  });

  const outputText = response.output_text;

  if (!outputText) {
    throw new Error("OpenAI returned empty response");
  }

  const parsed = JSON.parse(outputText) as AnalyzeCodeResult;

  return {
    score: Math.min(100, Math.max(0, parsed.score)),
    summary: parsed.summary,
    issues: parsed.issues.map((issue) => ({
      title: issue.title,
      severity: issue.severity,
      category: issue.category,
      explanation: issue.explanation,
      suggestedFix: issue.suggestedFix,
      codeExample: issue.codeExample || "",
      line: issue.line || undefined,
    })),
  };
};

export const analyzeCodeWithAI = async (
  input: AnalyzeCodeInput
): Promise<AnalyzeCodeResult> => {
  const useOpenAI = process.env.USE_OPENAI === "true";

  if (input.forceMock) {
    console.log("OpenAI limit reached. Using mock AI analysis...");
    return analyzeCodeWithMock(input);
  }

  if (!useOpenAI || !process.env.OPENAI_API_KEY) {
    console.log("Using mock AI analysis...");
    return analyzeCodeWithMock(input);
  }

  try {
    console.log("Using OpenAI analysis...");
    return await analyzeCodeWithOpenAI(input);
  } catch (error) {
    console.error(
      "OpenAI analysis failed. Falling back to mock analysis:",
      error
    );

    return analyzeCodeWithMock(input);
  }
};