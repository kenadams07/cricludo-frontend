"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { API_URL } from "@/lib/config";
import { fetcher, GetRequest, DeleteRequest } from "@/lib/fetcher";

type BannerItem = {
  id: string;
  imageUrl?: string;
  purpose?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function BannerConfig() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [purpose, setPurpose] = useState("promotion");
  const [id, setId] = useState("");
  const [editing, setEditing] = useState<BannerItem | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  async function loadBanners() {
    setLoading(true);
    try {
      const res: any = await GetRequest(`${API_URL}/banners`);
      const data = res?.data ?? [];
      setBanners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBanners();
  }, []);

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!id) {
      alert("Please enter an id for the banner.");
      return;
    }

    const form = new FormData();
    form.append("id", id);
    form.append("purpose", purpose);
    if (file) form.append("file", file);

    try {
      setLoading(true);
      const res: any = await fetcher(`${API_URL}/banners`, {
        method: "POST",
        body: form,
      });
      if (res?.data) {
        setId("");
        if (fileRef.current) fileRef.current.value = "";
        await loadBanners();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add banner");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(bannerId: string) {
    if (!confirm("Delete this banner?")) return;
    setLoading(true);
    try {
      await DeleteRequest(`${API_URL}/banners/${encodeURIComponent(bannerId)}`);
      await loadBanners();
    } catch (err) {
      console.error(err);
      alert("Failed to delete banner");
    } finally {
      setLoading(false);
    }
  }

  async function startEdit(item: BannerItem) {
    setEditing(item);
    setEditFile(null);
  }

  async function handleEditSave() {
    if (!editing) return;
    try {
      setLoading(true);
      let imageUrl = editing.imageUrl || "";

      if (editFile) {
        // upload via apkConfig upload endpoint
        const form = new FormData();
        form.append("file", editFile);
        form.append("type", "image");
        const uploadRes: any = await fetcher(`${API_URL}/config-apk/upload`, {
          method: "POST",
          body: form,
        });
        imageUrl = uploadRes?.url || imageUrl;
      }

      const body = {
        imageUrl,
        purpose: editing.purpose,
        isActive: editing.isActive,
      };
      await fetcher(`${API_URL}/banners/${encodeURIComponent(editing.id)}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      setEditing(null);
      await loadBanners();
    } catch (err) {
      console.error(err);
      alert("Failed to update banner");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Banner Configuration</CardTitle>
        <CardDescription>Manage app banners and promotions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure banners that appear in the app for promotions, updates, or
          announcements.
        </p>

        <form className="mt-4 space-y-4" onSubmit={handleAdd}>
          <div>
            <label className="block text-sm font-medium">
              Banner Unique Name
            </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="banner-1"
              className="mt-1 block w-full text-sm border rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Banner Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="mt-1 block w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Banner Purpose</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="mt-1 block w-full text-sm border rounded-md"
            >
              <option value="promotion">Promotion</option>
              <option value="update">App Update</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {loading ? "Saving..." : "Add Banner"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Existing Banners</h3>
          <div className="mt-4 space-y-4">
            {loading && <div>Loading...</div>}
            {!loading && banners.length === 0 && (
              <div className="text-sm">No banners yet.</div>
            )}
            {banners.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-4 border rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.imageUrl || "/placeholder.png"}
                    alt={b.id}
                    className="w-40 h-20 object-cover rounded-md"
                  />
                  <div>
                    <div className="font-medium">{b.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {b.purpose}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm text-red-500"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm text-blue-500"
                    onClick={() => startEdit(b)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {editing && (
          <div className="mt-6 p-4 border rounded-md">
            <h4 className="font-semibold">Edit {editing.id}</h4>
            <div className="mt-2">
              <label className="block text-sm">New Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                className="mt-1"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm">Purpose</label>
              <input
                value={editing.purpose ?? ""}
                onChange={(e) =>
                  setEditing({ ...editing, purpose: e.target.value })
                }
                className="mt-1 block w-full text-sm border rounded-md px-2 py-1"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded-md"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="px-3 py-1 bg-gray-200 rounded-md"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
