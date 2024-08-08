export function createFormData(data: Record<string, any>) {
  const formData = new FormData();

  for (const key in data) {
    if(data[key] != undefined) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export function createGetParams(data: Record<string, any>) {
  const params = new URLSearchParams();

  for (const key in data) {
    const value = data[key];
    if (value !== undefined && value !== '') {
      params.append(key, value);
    }
  }

  return params;
}