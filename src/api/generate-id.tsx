export default function generateID() {
    function randStr(length: number) {
      const chars = [
        ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      ];
      return [...Array(length)]
        .map(() => chars[Math.trunc(Math.random() * chars.length)])
        .join("");
    }
    const time: string = String(Date.now());
    const timeEnd = time.slice(Math.ceil(time.length / 2));
    const timeStart = time.slice(0, Math.ceil(time.length / 2));
  
    const ID: string = `TODO-${timeEnd}-${randStr(6)}-${timeStart}`;
    return ID;
  }