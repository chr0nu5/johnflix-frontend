export default function storage() {
  const getItem = (item) => {
    return localStorage.getItem(item);
  };

  const saveItem = (item, data) => {
    localStorage.setItem(item, data);
    return true;
  };

  const removeItem = (item) => {
    localStorage.removeItem(item);
    return true;
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
}
