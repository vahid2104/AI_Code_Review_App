import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  CreditCard,
  Lock,
  Sparkles,
  Zap,
  Crown,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

type Plan = "free" | "pro" | "enterprise";

const plans = [
  {
    id: "free" as Plan,
    name: "Free",
    price: 0,
    period: "forever",
    icon: Sparkles,
    description: "Perfect for trying out AI code review",
    features: [
      "10 reviews per month",
      "Basic issue detection",
      "Community support",
      "7-day history",
    ],
    notIncluded: [
      "Advanced security analysis",
      "Team collaboration",
      "Priority support",
      "Custom rules",
    ],
    popular: false,
  },
  {
    id: "pro" as Plan,
    name: "Pro",
    price: 29,
    period: "per month",
    icon: Zap,
    description: "Best for individual developers",
    features: [
      "Unlimited reviews",
      "Advanced bug detection",
      "Security vulnerability scanning",
      "Performance analysis",
      "30-day history",
      "Email support",
      "Export reports",
      "API access",
    ],
    notIncluded: ["Team collaboration", "Custom rules"],
    popular: true,
  },
  {
    id: "enterprise" as Plan,
    name: "Enterprise",
    price: 99,
    period: "per month",
    icon: Crown,
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Team collaboration tools",
      "Custom review rules",
      "Unlimited history",
      "Priority support",
      "SSO & advanced security",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    notIncluded: [],
    popular: false,
  },
];

export function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("pro");
  const [step, setStep] = useState<"plans" | "payment" | "success">("plans");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\//g, "");
    if (value.length <= 4 && /^\d*$/.test(value)) {
      if (value.length >= 2) {
        setExpiryDate(value.slice(0, 2) + "/" + value.slice(2));
      } else {
        setExpiryDate(value);
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 2000);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900 mb-3">
            Welcome to {selectedPlanData?.name}!
          </h1>
          <p className="text-slate-400 light:text-slate-600 mb-8">
            Your subscription has been activated successfully. You now have access to all{" "}
            {selectedPlanData?.name} features.
          </p>
          <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 light:text-slate-600">Plan</span>
              <span className="text-white light:text-slate-900 font-semibold">
                {selectedPlanData?.name}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 light:text-slate-600">Amount</span>
              <span className="text-white light:text-slate-900 font-semibold">
                ${selectedPlanData?.price}/{selectedPlanData?.period.split(" ")[1] || "month"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 light:text-slate-600">Next billing</span>
              <span className="text-white light:text-slate-900 font-semibold">
                {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/app")}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <button
          onClick={() => setStep("plans")}
          className="flex items-center gap-2 text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to plans
        </button>

        <div>
          <h1 className="text-3xl font-bold text-white light:text-slate-900">Payment Details</h1>
          <p className="text-slate-400 light:text-slate-600 mt-1">
            Complete your subscription to {selectedPlanData?.name}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900/50 light:bg-white backdrop-blur border border-slate-800/50 light:border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white light:text-slate-900">
                {selectedPlanData?.name} Plan
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600">{selectedPlanData?.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white light:text-slate-900">
                ${selectedPlanData?.price}
              </div>
              <div className="text-sm text-slate-400 light:text-slate-600">{selectedPlanData?.period}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 pl-12 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white light:text-slate-900 mb-2">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="w-full px-4 py-3 bg-slate-800 light:bg-slate-100 border border-slate-700 light:border-slate-300 rounded-lg text-white light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mt-6">
              <Lock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white light:text-slate-900 mb-1">
                  Secure Payment
                </h4>
                <p className="text-xs text-slate-300 light:text-slate-700">
                  Your payment information is encrypted and secure. We never store your full card details.
                </p>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={!cardNumber || !cardName || !expiryDate || !cvv || isProcessing}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isProcessing ? "Processing..." : `Subscribe for $${selectedPlanData?.price}/${selectedPlanData?.period.split(" ")[1] || "month"}`}
            </button>

            <p className="text-xs text-slate-500 light:text-slate-600 text-center">
              By subscribing, you agree to our Terms of Service and Privacy Policy. You can cancel anytime.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white light:text-slate-900 mb-3">
          Upgrade Your Plan
        </h1>
        <p className="text-slate-400 light:text-slate-600 text-lg">
          Choose the perfect plan for your code review needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          const isFree = plan.id === "free";

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl backdrop-blur border transition-all ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 light:border-purple-400"
                  : "bg-slate-900/50 light:bg-white border-slate-800/50 light:border-slate-200"
              } ${isSelected && !plan.popular ? "ring-2 ring-purple-500" : ""} overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-br from-purple-500 to-cyan-500"
                        : "bg-slate-800 light:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${plan.popular ? "text-white" : "text-purple-400"}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white light:text-slate-900">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-400 light:text-slate-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white light:text-slate-900">${plan.price}</span>
                    <span className="text-slate-400 light:text-slate-600">/{plan.period.split(" ")[1] || "month"}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    if (!isFree) {
                      setStep("payment");
                    }
                  }}
                  disabled={isFree}
                  className={`w-full px-6 py-3 font-semibold rounded-lg transition-all mb-6 ${
                    isFree
                      ? "bg-slate-800 light:bg-slate-200 text-slate-500 light:text-slate-400 cursor-not-allowed"
                      : plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90"
                      : "bg-slate-800 light:bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  {isFree ? "Current Plan" : "Choose Plan"}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 light:text-slate-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 opacity-40">
                      <Check className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 backdrop-blur p-8 text-center">
          <h3 className="text-xl font-semibold text-white light:text-slate-900 mb-2">
            Need a custom plan?
          </h3>
          <p className="text-slate-400 light:text-slate-600 mb-4">
            Contact our sales team for custom pricing and features tailored to your organization
          </p>
          <button className="px-6 py-2.5 bg-slate-800/50 light:bg-white text-white light:text-slate-900 rounded-lg hover:bg-slate-700/50 light:hover:bg-slate-100 transition-colors border border-slate-700 light:border-slate-300">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
