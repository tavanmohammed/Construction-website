import { useMemo, useState } from "react";
import { serviceOptions, cityOptions } from "../data/siteData";

const initial = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  city: "",
  message: "",
  website: "", // honeypot (bots fill it)
};

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | loading | success | error
  const [showSuccess, setShowSuccess] = useState(false);

  const isValid = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return (
      form.fullName.trim().length >= 2 &&
      emailOk &&
      form.phone.trim().length >= 7 &&
      form.service.trim().length > 0 &&
      form.city.trim().length > 0 &&
      form.message.trim().length >= 10
    );
  }, [form]);

  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isValid || status.state === "loading") return;

    setStatus({ state: "loading", msg: "Sending..." });

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to send message.");

      setForm(initial);
      setStatus({ state: "success", msg: "" });

      // show popup (no redirect)
      setShowSuccess(true);

      // optional auto-close after 4s
      // setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      setStatus({
        state: "error",
        msg: err?.message || "Something went wrong.",
      });
    }
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:py-20">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-700">
            Tell us what you need. Choose a service and we’ll reply with next
            steps.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* FORM */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* honeypot hidden */}
            <input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Your name"
                  required
                />
              </Field>

              <Field label="Email">
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="you@email.com"
                  type="email"
                  required
                />
              </Field>

              <Field label="Phone">
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="(647) 000-0000"
                  required
                />
              </Field>

              <Field label="Service (required)">
                <select
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                  required
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="City (required)">
                <select
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                  required
                >
                  <option value="">Select your city</option>
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="min-h-[140px] w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="Tell us about your project..."
                    required
                  />
                </Field>
              </div>
            </div>

            <button
              disabled={!isValid || status.state === "loading"}
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              {status.state === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status.state === "error" && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-800">
                <p className="text-sm font-semibold">Something went wrong</p>
                <p className="mt-1 text-sm">{status.msg}</p>
              </div>
            )}
          </form>

          {/* SIDE INFO */}
          <aside className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-black">Quick Contact</h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-semibold text-black">Phone:</span>{" "}
                (647) 000-0000
              </p>
              <p>
                <span className="font-semibold text-black">Email:</span>{" "}
                info@builda.ca
              </p>
              <p>
                <span className="font-semibold text-black">Location:</span>{" "}
                Toronto, Ontario
              </p>
              <p>
                <span className="font-semibold text-black">Hours:</span> Mon–Sat:
                8am–6pm
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* SUCCESS POPUP MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-extrabold text-black">Thank you!</h2>
            <p className="mt-3 text-neutral-700">
              Thank you for reaching out to{" "}
              <span className="font-semibold">Buildara Group</span>. Your request
              was submitted successfully and we will contact you shortly.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full rounded-md bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-semibold text-black">{label}</div>
      {children}
    </label>
  );
}
