export async function hello(): Promise<string> {
  return await Promise.resolve("world");
}
