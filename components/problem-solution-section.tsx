import React from "react";

interface Problem {
  icon: string;
  title: string;
  description: string;
}

interface Solution {
  icon: string;
  title: string;
  description: string;
  highlight?: string;
}

interface ProblemSolutionSectionProps {
  problems: Problem[];
  solutions: Solution[];
  problemsTitle?: string;
  solutionsTitle?: string;
}

export function ProblemSolutionSection({
  problems,
  solutions,
  problemsTitle = "Vos Défis Actuels Nous Parlent",
  solutionsTitle = "3CX PRO : Votre Standard Téléphonique Nouvelle Génération"
}: ProblemSolutionSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Section Problèmes */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {problemsTitle}
              </h2>
              <p className="text-lg text-gray-600">
                Votre entreprise grandit, vos équipes se multiplient, mais votre système téléphonique actuel vous freine ?
              </p>
            </div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className={`lni lni-${problem.icon} text-red-600 text-xl`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{problem.title}</h3>
                    <p className="text-gray-600">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-red-100 rounded-xl border border-red-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-warning text-red-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Impact sur votre entreprise</h3>
                <p className="text-gray-700">
                  Ces problèmes impactent directement votre <strong>chiffre d'affaires</strong> et l'<strong>image de votre entreprise</strong>. 
                  Il est temps d'y remédier définitivement.
                </p>
              </div>
            </div>
          </div>

          {/* Section Solutions */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {solutionsTitle}
              </h2>
              <div className="p-4 bg-gradient-to-r from-blue-100 to-red-100 rounded-lg border border-blue-200">
                <p className="text-lg text-gray-700">
                  <strong className="text-blue-800">Une Solution Cloud Dédiée</strong>, 
                  Conçue pour les Entreprises Exigeantes
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className={`lni lni-${solution.icon} text-green-600 text-xl`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {solution.title}
                      {solution.highlight && (
                        <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full">
                          {solution.highlight}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl border border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="lni lni-checkmark text-green-600 text-2xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Pourquoi 3CX PRO ?</h3>
                <p className="text-gray-700">
                  Cette solution est parfaite pour les entreprises nécessitant un minimum de <strong className="text-blue-600">8 appels simultanés</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}