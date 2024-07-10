const hostname = "https://tourguide-react-project-001.onrender.com";
// const hostname = 'http://localhost:3000';

async function request(url, option) {
  try {
    const response = await fetch(hostname + url, option);

    if (response.ok !== true) {
      const err = await response.json();
      throw new Error(err.message);
    }

    if (response.status === 204) {
      return response;
    } else if (response.headers.has("content-type") && response.headers.get("content-type").includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  } catch (error) {
    // alert(error.message);
    throw error;
  }
}

function createOptions(method = "GET", data) {
  const option = {
    method,
    headers: {}
  };

  if (data !== undefined) {
    option.headers["Content-Type"] = "Application/json";
    option.body = JSON.stringify(data);
  }
  return option;
}
export async function get(url) {
  return request(url, createOptions());
}
export async function post(url, data) {
  return request(url, createOptions("post", data));
}
export async function put(url, data) {
  return request(url, createOptions("put", data));
}
export async function del(url) {
  return request(url, createOptions("delete"));
}
