export function printObject(obj: Record<string, any>) {
  const keys = Object.keys(obj);

  keys.forEach((keyCur: string) => {
    const valueCur = obj[keyCur];

    console.log(`${keyCur}: ${valueCur}`);
  });
}
