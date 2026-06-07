import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { NewReviewPage } from "./pages/NewReviewPage";
import { FeedbackResultPage } from "./pages/FeedbackResultPage";
import { ReviewHistoryPage } from "./pages/ReviewHistoryPage";
import { SettingsPage } from "./pages/SettingsPage";
import { UpgradePage } from "./pages/UpgradePage";
import  LoginPage  from "./pages/LoginPage";
import  RegisterPage  from "./pages/RegisterPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/documentation",
    Component: DocumentationPage,
  },
  {
    path: "/privacy",
    Component: PrivacyPage,
  },
  {
    path: "/terms",
    Component: TermsPage,
  },
  {
    path: "/app",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "new-review", Component: NewReviewPage },
      { path: "review/:id", Component: FeedbackResultPage },
      { path: "history", Component: ReviewHistoryPage },
      { path: "settings", Component: SettingsPage },
      { path: "upgrade", Component: UpgradePage },
    ],
  },
]);
