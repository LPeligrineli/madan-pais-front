function generateRandomHash(length: number = 9): string {
  const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomHash: string = '';
  
  for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      randomHash += characters.charAt(randomIndex);
  }
  
  return randomHash;
}

export default generateRandomHash;