export default function imageSource(image) {
  return typeof image === "string" ? image : image?.src ?? "";
}
