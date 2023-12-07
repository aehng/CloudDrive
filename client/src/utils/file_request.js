import cookie from "cookie";

export async function fileRequest(uri, method = "get", formData) {
  const parsedCookie = cookie.parse(document.cookie)
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-CSRFToken": parsedCookie.csrftoken // protects against CSRF attacks
    },
    credentials: "include", // includes cookies in the request
  }

  if (method === "post") {
    options.body = formData
  }
  const result = await fetch(uri, options);
  const json = await result.json()
  return json;
}


const response = await fetch(url, {
  method,
  credentials: 'same-origin', // include cookies!
  
});

if (response.ok) {
  const data = await response;
  return data;
} 