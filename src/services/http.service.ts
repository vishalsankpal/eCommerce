export const getRequest = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (error) {
    console.error("Error in getRequest:", error);
    return null;
  }
};
