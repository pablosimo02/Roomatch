"use client";
import React from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export function FraudBadge({ score }: { score: number }) {
  let level: "safe" | "moderate" | "risk";
  let label: string;
  let color: string;
  let bgColor: string;
  let Icon: typeof Shield;

  if (score >= 85) {
    level = "safe";
    label = "Verificado";
    color = "#10B981";
    bgColor = "rgba(16,185,129,0.15)";
    Icon = ShieldCheck;
  } else if (score >= 65) {
    level = "moderate";
    label = "Revisar";
    color = "#F59E0B";
    bgColor = "rgba(245,158,11,0.15)";
    Icon = Shield;
  } else {
    level = "risk";
    label = "Riesgo";
    color = "#EF4444";
    bgColor = "rgba(239,68,68,0.15)";
    Icon = ShieldAlert;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: bgColor, color, border: `1px solid ${color}30` }}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
      <span className="opacity-70">{score}%</span>
    </motion.div>
  );
}

export function getFraudLevel(score: number): "safe" | "moderate" | "risk" {
  if (score >= 85) return "safe";
  if (score >= 65) return "moderate";
  return "risk";
}
