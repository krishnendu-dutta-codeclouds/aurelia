"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, CreditCard, MapPin, Truck, Lock } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Image from "next/image";

type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1 as Step, label: "Contact & Shipping", icon: MapPin },
  { num: 2 as Step, label: "Delivery Method", icon: Truck },
  { num: 3 as Step, label: "Payment", icon: CreditCard },
];

const shippingMethods = [
  { id: "standard", label: "Standard Shipping", desc: "5–7 business days", price: 8.95 },
  { id: "express", label: "Express Shipping", desc: "2–3 business days", price: 18.0 },
  { id: "overnight", label: "Overnight Delivery", desc: "Next business day", price: 38.0 },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);

  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", zip: "", country: "United States" });
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvc: "", name: "" });

  const sub = subtotal();
  const shippingCost = shippingMethods.find((m) => m.id === selectedShipping)?.price ?? 0;
  const total = sub + shippingCost;

  const inputClass = "w-full px-4 py-3 rounded-xl border border-black/10 text-sm bg-white text-text-title placeholder:text-text-meta/60 focus:outline-none focus:border-sage transition-colors";
  const labelClass = "block text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mb-1.5";

  const handlePlaceOrder = () => {
    clearCart();
    setDone(true);
  };

  if (done) {
    return (
      <main className="min-h-screen bg-warm-white pt-28 pb-20 flex flex-col items-center justify-center gap-6 px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 rounded-full bg-sage/15 border border-sage/25 flex items-center justify-center">
          <Check className="w-9 h-9 text-sage stroke-[1.5]" />
        </motion.div>
        <h1 className="font-serif text-5xl text-text-title italic text-center">Order Confirmed</h1>
        <p className="text-sm text-text-body font-light text-center max-w-sm leading-relaxed">
          Thank you for your order. A confirmation has been dispatched to <strong>{contact.email}</strong>.
          Your ritual will arrive in 5–7 business days.
        </p>
        <div className="flex gap-3 mt-2">
          <Link href="/" className="px-6 py-3 rounded-full border border-black/10 text-[10px] font-bold uppercase tracking-widest text-text-title hover:border-sage hover:text-sage transition-colors">
            Back to Home
          </Link>
          <Link href="/shop" className="px-6 py-3 rounded-full bg-sage text-white text-[10px] font-bold uppercase tracking-widest hover:bg-olive transition-colors">
            Shop More
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <h1 className="font-serif text-5xl text-text-title tracking-[-0.04em] leading-none mt-6 mb-10">
          Checkout
        </h1>

        {/* Progress stepper */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1 min-w-0">
              <div className="flex items-center gap-2.5 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-300 ${
                  step > s.num ? "bg-sage border-sage text-white" : step === s.num ? "border-text-title bg-white text-text-title" : "border-black/15 bg-white text-text-meta"
                }`}>
                  {step > s.num ? <Check className="w-4 h-4 stroke-[2.5]" /> : s.num}
                </div>
                <span className={`hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${step === s.num ? "text-text-title" : "text-text-meta"}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 transition-colors duration-500 ${step > s.num ? "bg-sage" : "bg-black/10"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <div className="p-7 rounded-[28px] bg-white border border-black/5 shadow-sm">
                    <h2 className="font-serif text-2xl text-text-title mb-6">Contact Information</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input className={inputClass} value={contact.firstName} onChange={(e) => setContact({...contact, firstName: e.target.value})} placeholder="Isabelle" />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input className={inputClass} value={contact.lastName} onChange={(e) => setContact({...contact, lastName: e.target.value})} placeholder="Moreau" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" className={inputClass} value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} placeholder="hello@email.com" />
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input className={inputClass} value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} placeholder="+1 555 000 0000" />
                      </div>
                    </div>

                    <h2 className="font-serif text-2xl text-text-title mb-6">Shipping Address</h2>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className={labelClass}>Address Line 1</label>
                        <input className={inputClass} value={address.line1} onChange={(e) => setAddress({...address, line1: e.target.value})} placeholder="123 Botanical Street" />
                      </div>
                      <div>
                        <label className={labelClass}>Address Line 2 (optional)</label>
                        <input className={inputClass} value={address.line2} onChange={(e) => setAddress({...address, line2: e.target.value})} placeholder="Apt, Suite, etc." />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>City</label>
                          <input className={inputClass} value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} placeholder="New York" />
                        </div>
                        <div>
                          <label className={labelClass}>State</label>
                          <input className={inputClass} value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} placeholder="NY" />
                        </div>
                        <div>
                          <label className={labelClass}>ZIP</label>
                          <input className={inputClass} value={address.zip} onChange={(e) => setAddress({...address, zip: e.target.value})} placeholder="10001" />
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setStep(2)} className="mt-8 w-full py-4 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage transition-colors">
                      Continue to Delivery
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <div className="p-7 rounded-[28px] bg-white border border-black/5 shadow-sm">
                    <h2 className="font-serif text-2xl text-text-title mb-6">Select Delivery Method</h2>
                    <div className="flex flex-col gap-3 mb-8">
                      {shippingMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedShipping(method.id)}
                          className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                            selectedShipping === method.id ? "border-text-title bg-cream/30" : "border-black/8 hover:border-black/20 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedShipping === method.id ? "border-text-title" : "border-black/20"}`}>
                              {selectedShipping === method.id && <div className="w-2.5 h-2.5 rounded-full bg-text-title" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text-title">{method.label}</p>
                              <p className="text-xs text-text-meta font-light">{method.desc}</p>
                            </div>
                          </div>
                          <span className="font-serif text-lg text-sage">${method.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-full border border-black/10 text-[11px] font-bold uppercase tracking-widest text-text-title hover:border-sage hover:text-sage transition-colors">
                        Back
                      </button>
                      <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-full bg-text-title text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sage transition-colors">
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                  <div className="p-7 rounded-[28px] bg-white border border-black/5 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                      <h2 className="font-serif text-2xl text-text-title">Payment Details</h2>
                      <Lock className="w-4 h-4 text-sage ml-1" />
                    </div>
                    <div className="flex flex-col gap-4 mb-8">
                      <div>
                        <label className={labelClass}>Name on Card</label>
                        <input className={inputClass} value={payment.name} onChange={(e) => setPayment({...payment, name: e.target.value})} placeholder="Isabelle Moreau" />
                      </div>
                      <div>
                        <label className={labelClass}>Card Number</label>
                        <input className={inputClass} value={payment.cardNumber} onChange={(e) => setPayment({...payment, cardNumber: e.target.value})} placeholder="4242 4242 4242 4242" maxLength={19} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Expiry</label>
                          <input className={inputClass} value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} placeholder="MM / YY" maxLength={7} />
                        </div>
                        <div>
                          <label className={labelClass}>CVC</label>
                          <input className={inputClass} value={payment.cvc} onChange={(e) => setPayment({...payment, cvc: e.target.value})} placeholder="123" maxLength={4} />
                        </div>
                      </div>
                    </div>

                    {/* Order review */}
                    <div className="p-5 rounded-2xl bg-cream/40 border border-soft-beige mb-8">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-meta mb-4">Order Review</h3>
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm text-text-body mb-2">
                          <span className="font-light">{item.product.name} × {item.quantity}</span>
                          <span className="font-semibold text-text-title">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-black/8 pt-3 mt-3 flex justify-between">
                        <span className="font-serif text-lg text-text-title">Total</span>
                        <span className="font-serif text-xl text-sage">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-full border border-black/10 text-[11px] font-bold uppercase tracking-widest text-text-title hover:border-sage hover:text-sage transition-colors">
                        Back
                      </button>
                      <button onClick={handlePlaceOrder} className="flex-1 py-4 rounded-full bg-sage text-white text-[11px] font-bold uppercase tracking-widest hover:bg-olive transition-colors shadow-md">
                        Place Order · ${total.toFixed(2)}
                      </button>
                    </div>
                    <p className="text-[10px] text-text-meta text-center mt-4 font-light flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3" /> SSL secured · Your payment data is never stored
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mini order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-[28px] bg-white border border-black/5 shadow-sm">
              <h3 className="font-serif text-xl text-text-title mb-5">Your Bag</h3>
              <div className="flex flex-col gap-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0 rounded-xl bg-cream/50">
                      <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${item.product.images[0].src}`} alt={item.product.name} fill className="object-contain p-1" />
                      <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-text-title text-white text-[9px] font-bold flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-text-title truncate">{item.product.name}</p>
                      <p className="text-[10px] text-text-meta">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/5 pt-4 flex flex-col gap-2 text-sm text-text-body font-light">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-text-title">${sub.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="font-semibold text-text-title">${shippingCost.toFixed(2)}</span></div>
                <div className="flex justify-between items-baseline border-t border-black/5 pt-3 mt-1">
                  <span className="font-serif text-lg text-text-title">Total</span>
                  <span className="font-serif text-2xl text-sage">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
