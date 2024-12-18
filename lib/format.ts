export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export const formatImageSize = (size: number) => {
  if (size < 1024 * 1024) {
    const sizeInKB = size / 1024;
    return new Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "kilobyte",
      maximumFractionDigits: 2,
    }).format(sizeInKB);
  } else {
    const sizeInMB = size / (1024 * 1024);
    return new Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "megabyte",
      maximumFractionDigits: 2,
    }).format(sizeInMB);
  }
}
