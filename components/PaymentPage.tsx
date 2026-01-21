"use client";

import { useState } from "react";
import { Check, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    highlight: true,
    description: "Perfect for individuals getting started",
    features: [
      "Core features access",
      "Basic analytics",
      "Email support",
      "Secure payments",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 999,
    description: "Best for professionals & teams",
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Priority support",
      "Team collaboration",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 1999,
    description: "For scaling businesses",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated manager",
      "Performance insights",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 3999,
    description: "Custom solutions for enterprises",
    features: [
      "Unlimited access",
      "Enterprise security",
      "24/7 premium support",
      "Custom SLAs",
    ],
  },
];

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h1>
          <p className="text-lg text-white/80">
            Simple, transparent pricing. Upgrade anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl rounded-2xl ${
                selectedPlan.id === plan.id
                  ? "ring-4 ring-indigo-500"
                  : ""
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.highlight && (
                <Badge className="absolute top-4 right-4 bg-indigo-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-extrabold">
                  ₹{plan.price}
                  <span className="text-base font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        <Card className="rounded-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-indigo-600" />
              Secure Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="flex justify-between">
                <span>Plan</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing</span>
                <span className="font-medium">Monthly</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                100% secure & encrypted payment
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center space-y-4">
              <Button size="lg" className="rounded-xl text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Pay ₹{selectedPlan.price} Now
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By proceeding, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//tHIS PAGE IS FOR PAYMENT OPTIONS FOR SUBSCRIPTION PLANS
//fufvfgfvhgvcghvghvcghvghvghvghcvghcghcghc
