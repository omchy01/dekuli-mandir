"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const raised = "rounded-3xl bg-[#1A1A1A] shadow-[9px_9px_20px_#0D0D0D,-9px_-9px_20px_#272727]";
const pressed = "bg-[#1A1A1A] shadow-[inset_4px_4px_9px_#0D0D0D,inset_-4px_-4px_9px_#272727]";
const redBtn =
  "rounded-full bg-gradient-to-b from-[#E52200] to-[#C41000] px-5 py-2.5 font-semibold text-white disabled:opacity-50";
const input = `${pressed} w-full rounded-xl px-4 py-3 text-[#EDEDED] outline-none placeholder:text-[#EDEDED]/40`;

type Img = { _id: string; imgUrl: string };
type Doc = { _id: string; eventName: string; eventDate: string };

function ImageSection({
  title, endpoint, listKey, secret,
}: { title: string; endpoint: string; listKey: string; secret: string }) {
  const [items, setItems] = useState<Img[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(endpoint, { cache: "no-store" });
    const data = await res.json();
    setItems(data[listKey] ?? []);
  }, [endpoint, listKey]);

  useEffect(() => { load(); }, [load]);

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setMsg("");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "x-admin-secret": secret },
      body: new FormData(form),
    });
    const data = await res.json();
    setMsg(data.message || (res.ok ? "Uploaded" : "Upload failed"));
    if (res.ok) { form.reset(); load(); }
    setBusy(false);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": secret },
    });
    const data = await res.json();
    setMsg(data.message || "");
    if (res.ok) load();
  }

  return (
    <section className={`${raised} p-6`}>
      <h2 className="mb-4 text-xl font-semibold text-[#FF6B4A]">{title}</h2>
      <form onSubmit={onUpload} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="file" name="images" accept="image/*" multiple required className={input} />
        <button type="submit" disabled={busy} className={redBtn}>
          {busy ? "Uploading..." : "Upload"}
        </button>
      </form>
      {msg && <p className="mt-3 text-sm text-[#EDEDED]/80">{msg}</p>}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((img) => (
          <div key={img._id} className="group relative aspect-square overflow-hidden rounded-xl">
            <Image src={img.imgUrl} alt="" fill sizes="200px" className="object-cover" />
            <button
              onClick={() => onDelete(img._id)}
              className="absolute right-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white hover:bg-[#C41000]"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function EventsSection({ secret }: { secret: string }) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/docs", { cache: "no-store" });
    const data = await res.json();
    setDocs(data.docs ?? []);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/docs", {
      method: "POST",
      headers: { "x-admin-secret": secret },
      body: new FormData(form),
    });
    const data = await res.json();
    setMsg(data.message || (res.ok ? "Created" : "Failed"));
    if (res.ok) { form.reset(); load(); }
    setBusy(false);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/docs/${id}`, {
      method: "DELETE",
      headers: { "x-admin-secret": secret },
    });
    const data = await res.json();
    setMsg(data.message || "");
    if (res.ok) load();
  }

  return (
    <section className={`${raised} p-6`}>
      <h2 className="mb-4 text-xl font-semibold text-[#FF6B4A]">Events (PDF)</h2>
      <form onSubmit={onUpload} className="grid gap-3 sm:grid-cols-2">
        <input name="eventName" placeholder="Event name" required className={input} />
        <input name="eventDate" type="date" required className={input} />
        <textarea name="description" placeholder="Description" required rows={3} className={`${input} sm:col-span-2`} />
        <input name="pdf" type="file" accept="application/pdf" required className={input} />
        <button type="submit" disabled={busy} className={redBtn}>
          {busy ? "Uploading..." : "Add event"}
        </button>
      </form>
      {msg && <p className="mt-3 text-sm text-[#EDEDED]/80">{msg}</p>}
      <ul className="mt-5 space-y-3">
        {docs.map((d) => (
          <li key={d._id} className={`${pressed} flex items-center justify-between rounded-xl px-4 py-3`}>
            <span className="text-[#EDEDED]">
              {d.eventName}
              <span className="ml-2 text-xs text-[#EDEDED]/50">
                {d.eventDate ? new Date(d.eventDate).toLocaleDateString("en-IN") : ""}
              </span>
            </span>
            <button onClick={() => onDelete(d._id)} className="text-sm text-[#FF6B4A] hover:text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function AdminPage() {
  const { secret } = useParams<{ secret: string }>();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    fetch("/api/admin/verify", { headers: { "x-admin-secret": secret } })
      .then((r) => setStatus(r.ok ? "ok" : "denied"))
      .catch(() => setStatus("denied"));
  }, [secret]);

  if (status === "checking") {
    return <div className="min-h-screen bg-[#1A1A1A] pt-32 text-center text-[#EDEDED]/70">Checking...</div>;
  }
  if (status === "denied") {
    return (
      <div className="min-h-screen bg-[#1A1A1A] pt-32 text-center">
        <h1 className="text-5xl font-bold text-[#EDEDED]">404</h1>
        <p className="mt-2 text-[#EDEDED]/60">This page could not be found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] px-4 pb-16 pt-28 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-center text-4xl font-semibold text-[#EDEDED]">Admin Panel</h1>
        <EventsSection secret={secret} />
        <ImageSection title="Darshan Gallery (max 5 per upload)" endpoint="/api/gallery" listKey="images" secret={secret} />
        <ImageSection title="Hero Images" endpoint="/api/hero" listKey="heroImages" secret={secret} />
      </div>
    </main>
  );
}