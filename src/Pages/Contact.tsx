import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Reveal from "../Components/Reveal";

const STORE_EMAIL = "hello@sneakers.ng";

const TOPICS = [
  "Order status",
  "Returns & exchanges",
  "Sizing help",
  "Product question",
  "Something else",
];

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  orderNumber: string;
  message: string;
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  topic: TOPICS[0],
  orderNumber: "",
  message: "",
};

const details = [
  { icon: FiMail, label: "Email", value: STORE_EMAIL, href: `mailto:${STORE_EMAIL}` },
  { icon: FiPhone, label: "Phone", value: "+234 803 123 4567", href: "tel:+2348031234567" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+234 803 123 4567", href: "https://wa.me/2348031234567" },
  { icon: FiClock, label: "Hours", value: "Mon–Sat, 9am–6pm WAT" },
  { icon: FiMapPin, label: "Store", value: "15 Admiralty Way, Lekki Phase 1, Lagos" },
];

const faqs: Array<[string, string]> = [
  ["When will my order ship?", "Same day if you order before 2pm on a weekday. Delivery takes about 2 days."],
  ["How do returns work?", "You have 30 days to send them back, and we pay the postage."],
  ["Not sure about your size?", "Tell us what you usually wear and the pair you're looking at, and we'll help."],
];

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500";
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [opened, setOpened] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = formData.orderNumber
      ? `${formData.topic} — order ${formData.orderNumber}`
      : formData.topic;
    const body = `${formData.message}\n\n${formData.name}\n${formData.email}`;

    window.location.href = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-14 pb-24 lg:px-20 lg:pt-20">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 text-balance sm:text-5xl">
          Questions about a pair? Ask us.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-gray-500">
          A real person reads every message, and we usually reply within one
          working day.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-gray-200 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="topic" className={labelClasses}>
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`${inputClasses} bg-white`}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="orderNumber" className={labelClasses}>
                  Order number <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="orderNumber"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                rows={6}
                className={`${inputClasses} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600 cursor-pointer"
            >
              Send message
            </button>

            {opened && (
              <p className="text-center text-sm text-gray-500" role="status">
                Your email app should have opened with the message ready to
                send. If it didn't, email us at{" "}
                <a href={`mailto:${STORE_EMAIL}`} className="font-medium text-red-500 hover:underline">
                  {STORE_EMAIL}
                </a>
                .
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={120} className="space-y-10">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Icon size={18} />
                </span>
                <div>
                  <dt className="text-sm text-gray-500">{label}</dt>
                  <dd className="mt-0.5 font-semibold text-gray-900">
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
                        className="hover:text-red-500"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Quick answers
            </h2>
            <div className="mt-4 divide-y divide-gray-100">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-gray-900">
                    {question}
                    <span className="text-xl leading-none text-gray-400 transition-transform group-open:rotate-45 motion-reduce:transition-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-gray-500">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Contact;
