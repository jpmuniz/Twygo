export const brToIso = (br: string): string | null => {
  const m = br.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`; 
}

export const isoToBr = (iso: string): string => {
  const m = iso.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const [, yyyy, mm, dd] = m;
  return `${dd}/${mm}/${yyyy}`;
}


export const  formatBytes = (bytes: number, decimals = 2): string => {
  if (!bytes || bytes <= 0) return "0 B";

  const k = 1024; 
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
  return `${value} ${sizes[i]}`;
}

export const formatDate = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let value = e.target.value.replace(/\D/g, ""); 

  if (value.length > 8) value = value.slice(0, 8);

  if (value.length > 4) {
    value = value.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
  } else if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
  }

  return value;
}; 
