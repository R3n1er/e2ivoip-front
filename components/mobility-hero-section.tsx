"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Wifi, Signal, ArrowRight } from "lucide-react";
import Link from "next/link";

export function MobilityHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-red-100 text-red-600 border-red-200">
              <Signal className="w-4 h-4 mr-2" />
              Solutions Mobilité 4G/5G
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connectivité mobile
              <br />
              <span className="text-red-600">sans limites</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Solutions complètes de téléphonie mobile 4G/5G pour entreprises : 
              voix, data, backups internet avec modems routeurs haute performance. 
              Restez connecté partout, tout le temps.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#services">
                <Button size="lg" variant="outline" className="border-gray-300">
                  Découvrir nos solutions
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">99.9%</div>
                <div className="text-sm text-gray-600">Couverture réseau</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-gray-600">Support technique</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">5G</div>
                <div className="text-sm text-gray-600">Technologie</div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
              <div className="relative z-10 text-center text-white">
                <Wifi className="w-20 h-20 mx-auto mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-4">Connectivité Entreprise</h3>
                <p className="text-red-100 mb-6">
                  Solutions 4G/5G adaptées aux besoins professionnels
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-semibold">Voix HD</div>
                    <div className="text-red-100">Qualité cristalline</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="font-semibold">Data Illimitée</div>
                    <div className="text-red-100">Forfaits pro</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}