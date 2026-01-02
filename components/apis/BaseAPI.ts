export function GetBaseURL() {
  return process.env.NEXT_PUBLIC_API_URL || "http://192.168.1.71:3001";
}

export function GetMyURL(){
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}