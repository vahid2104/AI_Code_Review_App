import { useEffect, useState } from "react";
import { Shield, Palette, Bell, Save, Trash2, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

type StoragePreference = "none" | "summary" | "full";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, updateUserSettings } = useAuth();

  const [storagePreference, setStoragePreference] =
    useState<StoragePreference>("summary");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [criticalIssuesOnly, setCriticalIssuesOnly] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.codeStoragePreference) {
      setStoragePreference(user.codeStoragePreference);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      await updateUserSettings({
        codeStoragePreference: storagePreference,
      });

      setSuccessMessage("Settings saved successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save settings.";

      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    setStoragePreference("summary");
    setEmailNotifications(true);
    setCriticalIssuesOnly(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleDeleteHistory = () => {
    if (
      confirm(
        "Are you sure you want to delete all review history? This action cannot be undone."
      )
    ) {
      console.log("History deleted");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white light:text-slate-900">
          Settings
        </h1>
        <p className="text-slate-400 light:text-slate-600 mt-1">
          Manage your preferences and configuration
        </p>
      </div>

      {successMessage && (
        <div className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <div className="space-y-6">
        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white light:text-slate-900">
                Privacy Options
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-3">
                Code Storage Preferences
              </label>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="storage"
                    value="none"
                    checked={storagePreference === "none"}
                    onChange={(e) =>
                      setStoragePreference(e.target.value as StoragePreference)
                    }
                    className="mt-1 w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                      Do not store submitted code
                    </div>
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                      Code is analyzed but not saved. Only review statistics are
                      kept.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="storage"
                    value="summary"
                    checked={storagePreference === "summary"}
                    onChange={(e) =>
                      setStoragePreference(e.target.value as StoragePreference)
                    }
                    className="mt-1 w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                      Store only feedback summary
                    </div>
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                      Keep review results and issue summaries, but not the
                      original code.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="storage"
                    value="full"
                    checked={storagePreference === "full"}
                    onChange={(e) =>
                      setStoragePreference(e.target.value as StoragePreference)
                    }
                    className="mt-1 w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                      Store code and feedback
                    </div>
                    <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                      Store both code and review results for future reference.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/50 light:border-slate-200">
              <button
                onClick={handleDeleteHistory}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
                Delete All Review History
              </button>
              <p className="text-xs text-slate-500 light:text-slate-600 mt-2">
                Permanently remove all stored reviews and feedback. This action
                cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white light:text-slate-900">
                Appearance
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-3">
                Theme
              </label>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === "light"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 light:border-slate-300 bg-slate-800/30 light:bg-slate-100/30 hover:border-slate-600"
                  }`}
                  type="button"
                >
                  <div className="w-full h-16 bg-white border border-slate-200 rounded mb-2" />
                  <p className="text-sm font-medium text-white light:text-slate-900">
                    Light Mode
                  </p>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === "dark"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 light:border-slate-300 bg-slate-800/30 light:bg-slate-100/30 hover:border-slate-600"
                  }`}
                  type="button"
                >
                  <div className="w-full h-16 bg-slate-900 rounded mb-2" />
                  <p className="text-sm font-medium text-white light:text-slate-900">
                    Dark Mode
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-800/50 light:border-slate-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white light:text-slate-900">
                Notification Preferences
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <div className="text-sm font-medium text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                  Email Notifications
                </div>
                <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                  Receive email updates about your code reviews
                </p>
              </div>

              <div
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-11 h-6 rounded-full transition-all cursor-pointer ${
                  emailNotifications
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                    : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    emailNotifications ? "translate-x-5.5" : "translate-x-0.5"
                  } mt-0.5`}
                />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <div className="text-sm font-medium text-white light:text-slate-900 group-hover:text-purple-400 transition-colors">
                  Critical Issues Only
                </div>
                <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                  Only notify me about high-priority security and bug issues
                </p>
              </div>

              <div
                onClick={() => setCriticalIssuesOnly(!criticalIssuesOnly)}
                className={`w-11 h-6 rounded-full transition-all cursor-pointer ${
                  criticalIssuesOnly
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                    : "bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    criticalIssuesOnly ? "translate-x-5.5" : "translate-x-0.5"
                  } mt-0.5`}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleResetToDefaults}
            className="px-6 py-2.5 bg-slate-800/50 light:bg-slate-200 text-white light:text-slate-900 rounded-lg hover:bg-slate-700/50 light:hover:bg-slate-300 transition-colors"
            type="button"
          >
            Reset to Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}