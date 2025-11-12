export async function fetcher(url: string, options: RequestInit = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers ?? {});

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function PostRequest(url: string, { arg }: { arg: any }) {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export async function GetRequest(url: string) {
  return fetcher(url, {
    method: "GET",
  });
}

export async function DeleteRequest(url: string) {
  return fetcher(url, {
    method: "DELETE",
  });
}

export async function PutRequest(url: string, { arg }: { arg: any }) {
  return fetcher(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  });
}
