import { Leaf, ShieldAlert, CheckCircle } from 'lucide-react';

export function detectFraud(listing: {
  price: number;
  description: string;
  neighborhood: string;
  avgPrice: number;
}) {
  const flags: string[] = [];
  let score = 0;

  // 1. Price Deviation (>30% below neighborhood average)
  if (listing.price < listing.avgPrice * 0.7) {
    flags.push("Precio inusualmente bajo para el barrio");
    score += 0.4;
  }

  // 2. Suspicious keywords
  const suspiciousKeywords = ['transferencia anticipada', 'depósito previo', 'whatsapp solo', 'fuera de la plataforma'];
  suspiciousKeywords.forEach(kw => {
    if (listing.description.toLowerCase().includes(kw)) {
      flags.push(`Uso de lenguaje sospechoso: "${kw}"`);
      score += 0.3;
    }
  });

  // 3. Generic description length
  if (listing.description.length < 50) {
    flags.push("Descripción demasiado genérica");
    score += 0.1;
  }

  return {
    score: Math.min(score, 1),
    flags,
    isSafe: score < 0.5,
  };
}
