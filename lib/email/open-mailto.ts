/** Ouvre un lien mailto — isolé pour les tests. */
export function openMailto(email: string): void {
  window.location.href = `mailto:${email}`;
}
