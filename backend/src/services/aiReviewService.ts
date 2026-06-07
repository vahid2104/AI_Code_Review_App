import { IReviewIssue } from "../models/Review";

interface AnalyzeCodeInput {
  code: string;
  language: string;
}

interface AnalyzeCodeResult {
  score: number;
  issues: IReviewIssue[];
  summary: string;
}

export const analyzeCodeWithAI = async ({
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
      codeExample:
        "// Before\nvar total = 0;\n\n// After\nlet total = 0;",
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
    });
  }

  const highIssues = issues.filter((issue) => issue.severity === "high").length;
  const mediumIssues = issues.filter((issue) => issue.severity === "medium").length;
  const lowIssues = issues.filter((issue) => issue.severity === "low").length;

  const score = Math.max(20, 100 - highIssues * 18 - mediumIssues * 10 - lowIssues * 4);

  const summary = `AI review completed for ${language}. Found ${issues.length} issue(s): ${highIssues} high, ${mediumIssues} medium, and ${lowIssues} low priority.`;

  return {
    score,
    issues,
    summary,
  };
};