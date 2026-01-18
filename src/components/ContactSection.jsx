import { useMemo, useState } from "react";
import { contact, site, serviceOptions, cityOptions } from "../data/siteData";


const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  city: "",
  message: "",
};

export default function ContactSection() {
  const services = useMemo(() => serviceOptions || [], []);
  const cities = useMemo(() => cityOptions || [], []);

  const [form, setForm] = useState(emptyForm);
  const [isSending, setIsSending] = useState(false);

  // popup state
  const [modal, setModal] = useState({
    open: false,
    type: "success", // "success" | "error"
    title: "",
    message: "",
  });

  const onChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  async function onSubmit(e) {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setModal({
          open: true,
          type: "error",
          title: "Something went wrong",
          message: data?.error || "Please try again.",
        });
        return;
      }

      // success
      setForm(emptyForm);
      setModal({
        open: true,
        type: "success",
        title: "Thank you!",
        message:
          "Thank you for reaching out to Buildara Group. Your request was submitted successfully and we will contact you within 48 Business Hours.",
      });
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        title: "Network error",
        message: "Please check your connection and try again.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT: Text + details */}
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              {contact?.title || "Contact Us"}
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-neutral-700">
              {contact?.description ||
                "Tell us what you need and we’ll get back to you as soon as possible."}
            </p>

            <div className="mt-10 space-y-3 text-[15px] text-neutral-800">
              {site?.phone ? (
                <div>
                  <span className="font-semibold">Phone:</span> {site.phone}
                </div>
              ) : null}
              {site?.email ? (
                <div>
                  <span className="font-semibold">Email:</span> {site.email}
                </div>
              ) : null}
              {site?.address ? (
                <div>
                  <span className="font-semibold">Location:</span> {site.address}
                </div>
              ) : null}
              {site?.hours ? (
                <div>
                  <span className="font-semibold">Hours:</span> {site.hours}
                </div>
              ) : null}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Full name"
                placeholder="Your name"
                value={form.fullName}
                onChange={onChange("fullName")}
                required
              />

              <Input
                label="Email"
                placeholder="you@email.com"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                required
              />

              <Input
                label="Phone"
                placeholder="(000) 000-0000"
                value={form.phone}
                onChange={onChange("phone")}
                required
              />

              <Select
                label="Service (optional)"
                value={form.service}
                onChange={onChange("service")}
                placeholder="Choose a service"
                options={services}
              />

              <Select
                label="City (optional)"
                value={form.city}
                onChange={onChange("city")}
                placeholder="Choose a city"
                options={cities}
              />

              <Textarea
                label="Brief message (optional)"
                placeholder="Tell us what you’re looking to do, timeline, budget range, etc."
                value={form.message}
                onChange={onChange("message")}
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>

              <div className="text-xs text-neutral-500">
                By submitting, you agree we can contact you back using the
                details provided.
              </div>
            </form>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-14 border-t border-neutral-200 pt-8 text-center">
          <div className="text-sm font-semibold">
            {site?.companyName || "Your Company"} •{" "}
            {site?.tagline || "Quality work, done right"}
          </div>
          <div className="mt-2 text-sm text-neutral-600">
            © {new Date().getFullYear()} {site?.companyName || "Your Company"}.
            All rights reserved.
          </div>
        </div>
      </div>

      {/* POPUP MODAL */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                modal.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {modal.type === "success" ? "Submitted" : "Error"}
            </div>

            <h3 className="mt-3 text-2xl font-extrabold text-black">
              {modal.title}
            </h3>

            <p className="mt-3 text-neutral-700">{modal.message}</p>

            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-md bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* keep your Input / Select / Textarea the same */
function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-neutral-800">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
      />
    </label>
  );
}

function Select({ label, options = [], placeholder, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-neutral-800">
        {label}
      </span>
      <select
        {...props}
        className="mt-2 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-neutral-800">
        {label}
      </span>
      <textarea
        {...props}
        rows={5}
        className="mt-2 w-full rounded-md border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black"
      />
    </label>
  );
}
