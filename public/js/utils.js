function removeEmptyStrings(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== "")
  );
}
