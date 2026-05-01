export function optimizeImage(url: string, transformations = "f_auto,q_auto") {
  if (!url || !url.includes("cloudinary.com/")) return url;
  if (url.includes(transformations)) return url;
  return url.replace("/upload/", `/upload/${transformations}/`);
}
