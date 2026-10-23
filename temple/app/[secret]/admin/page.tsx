
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const raised =
  "shadow-[5px_5px_12px_rgba(0,0,0,0.5),-3px_-3px_8px_rgba(255,255,255,0.03)]";

const pressed =
  "shadow-[inset_4px_4px_9px_rgba(0,0,0,0.45),inset_-3px_-3px_8px_rgba(255,255,255,0.03)]";

const redBtn =
  "rounded-xl bg-gradient-to-b from-[#E52200] to-[#C41000] px-5 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50";

const input =
  "w-full rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-[#EDEDED] outline-none placeholder:text-white/40 focus:border-[#E52200]";

type Img = {
  _id: string;
  imgUrl: string;
};

type Doc = {
  _id: string;
  eventName: string;
  eventDate: string;
};

async function readResponse(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function ImageSection({
  title,
  endpoint,
  listKey,
  secret,
}: {
  title: string;
  endpoint: string;
  listKey: string;
  secret: string;
}) {
  const [items, setItems] = useState<Img[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Images load nahi ho paaye.");
      }

      setItems(Array.isArray(data[listKey]) ? data[listKey] : []);
    } catch (error) {
      setMsg(
        error instanceof Error ? error.message : "Images load nahi ho paaye."
      );
    }
  }, [endpoint, listKey]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    setBusy(true);
    setMsg("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-admin-secret": secret,
        },
        body: new FormData(form),
      });

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      setMsg(data.message || "Upload successful.");
      form.reset();
      await load();
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm("Delete this image?")) return;

    setMsg("");

    try {
      const res = await fetch(
        `${endpoint}/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "x-admin-secret": secret,
          },
        }
      );

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Delete failed.");
      }

      setMsg(data.message || "Image deleted.");
      await load();
    } catch (error) {
      setMsg(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  return (
    <section className={`rounded-2xl bg-[#1A1A1A] p-5 sm:p-7 ${raised}`}>
      <h2 className="mb-5 text-xl font-bold text-[#EDEDED]">{title}</h2>

      <form onSubmit={onUpload} className="mb-6 space-y-4">
        <input
          className={input}
          type="file"
          name="image"
          accept="image/*"
          required
        />

        <button type="submit" disabled={busy} className={redBtn}>
          {busy ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {msg && (
        <p
          role="status"
          className="mb-4 break-words text-sm text-[#FF8A70]"
        >
          {msg}
        </p>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-white/50">No images found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item._id}
              className={`overflow-hidden rounded-xl bg-[#202020] p-2 ${pressed}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={item.imgUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => void onDelete(item._id)}
                className="mt-3 w-full rounded-lg bg-red-950/70 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-900"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function EventsSection({ secret }: { secret: string }) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/docs", { cache: "no-store" });
      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Events load nahi ho paaye.");
      }

      setDocs(Array.isArray(data.docs) ? data.docs : []);
    } catch (error) {
      setMsg(
        error instanceof Error ? error.message : "Events load nahi ho paaye."
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    setBusy(true);
    setMsg("");

    try {
      const res = await fetch("/api/docs", {
        method: "POST",
        headers: {
          "x-admin-secret": secret,
        },
        body: new FormData(form),
      });

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Document upload failed.");
      }

      setMsg(data.message || "Document uploaded successfully.");
      form.reset();
      await load();
    } catch (error) {
      setMsg(
        error instanceof Error ? error.message : "Document upload failed."
      );
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm("Delete this event document?")) return;

    setMsg("");

    try {
      const res = await fetch(
        `/api/docs/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "x-admin-secret": secret,
          },
        }
      );

      const data = await readResponse(res);

      if (!res.ok) {
        throw new Error(data.message || "Document delete failed.");
      }

      setMsg(data.message || "Document deleted.");
      await load();
    } catch (error) {
      setMsg(
        error instanceof Error ? error.message : "Document delete failed."
      );
    }
  }

  return (
    <section className={`rounded-2xl bg-[#1A1A1A] p-5 sm:p-7 ${raised}`}>
      <h2 className="mb-5 text-xl font-bold text-[#EDEDED]">
        Events / Documents
      </h2>

      <form onSubmit={onUpload} className="mb-6 space-y-4">
        <input
          className={input}
          type="text"
          name="eventName"
          placeholder="Event name"
          required
        />

        <input
          className={input}
          type="date"
          name="eventDate"
          required
        />

        <input
          className={input}
          type="file"
          name="file"
          accept="application/pdf,.pdf"
          required
        />

        <button type="submit" disabled={busy} className={redBtn}>
          {busy ? "Uploading..." : "Upload Document"}
        </button>
      </form>

      {msg && (
        <p
          role="status"
          className="mb-4 break-words text-sm text-[#FF8A70]"
        >
          {msg}
        </p>
      )}

      {docs.length === 0 ? (
        <p className="text-sm text-white/50">No event documents found.</p>
      ) : (
        <div className="space-y-3">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className={`flex flex-col gap-3 rounded-xl bg-[#202020] p-4 sm:flex-row sm:items-center sm:justify-between ${pressed}`}
            >
              <div className="min-w-0">
                <p className="break-words font-semibold text-[#EDEDED]">
                  {doc.eventName}
                </p>

                <p className="mt-1 text-sm text-white/50">
                  {doc.eventDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void onDelete(doc._id)}
                className="rounded-lg bg-red-950/70 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AdminPageContent() {
  const { secret } = useParams<{ secret: string }>();

  const [status, setStatus] = useState<"checking" | "ok" | "denied">(
    "checking"
  );

  useEffect(() => {
    let cancelled = false;

    async function verifyAdmin() {
      try {
        const res = await fetch("/api/admin/verify", {
          headers: {
            "x-admin-secret": secret,
          },
          cache: "no-store",
        });

        if (!cancelled) {
          setStatus(res.ok ? "ok" : "denied");
        }
      } catch {
        if (!cancelled) {
          setStatus("denied");
        }
      }
    }

    void verifyAdmin();

    return () => {
      cancelled = true;
    };
  }, [secret]);

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-[#1A1A1A] px-4 pt-32 text-center text-[#EDEDED]/70">
        Verifying admin access...
      </main>
    );
  }

  if (status === "denied") {
    return (
      <main className="min-h-screen bg-[#1A1A1A] px-4 pt-32 text-center">
        <h1 className="text-3xl font-bold text-[#E52200]">404</h1>
        <p className="mt-3 text-[#EDEDED]/70">
          Admin page not found or access denied.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] px-4 pb-16 pt-28 text-[#EDEDED] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6B4A]">
            Temple Management
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage event documents and temple images.
          </p>
        </header>

        <div className="space-y-8">
          <EventsSection secret={secret} />

          <ImageSection
            title="Gallery Images"
            endpoint="/api/gallery"
            listKey="images"
            secret={secret}
          />

          <ImageSection
            title="Hero Images"
            endpoint="/api/hero"
            listKey="images"
            secret={secret}
          />
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#1A1A1A] px-4 pt-32 text-center text-[#EDEDED]/70">
          Loading admin dashboard...
        </main>
      }
    >
      <AdminPageContent />
    </Suspense>
  );
}
