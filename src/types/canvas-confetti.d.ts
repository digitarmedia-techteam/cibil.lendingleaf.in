declare module 'canvas-confetti' {
  type ConfettiOptions = any;
  interface ConfettiStatic {
    (opts?: ConfettiOptions): void;
  }
  const confetti: ConfettiStatic;
  export default confetti;
  export * from 'canvas-confetti';
}

