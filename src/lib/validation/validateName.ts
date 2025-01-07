export const validateName = (name: string): string => {
  if (name.length > 12) {
    return "Name should not be longer than 12 characters";
  }
  return "";
};
