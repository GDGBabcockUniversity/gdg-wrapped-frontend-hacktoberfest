export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? (JSON.parse(serializedValue) as T) : defaultValue;
  } catch (error) {
    console.error("Error reading from local storage", error);
    return defaultValue;
  }
}
