"use client";

export function HubSpotFormSimple() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-gradient-to-r from-red-primary to-blue-marine text-white rounded-t-xl p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
          Contactez notre équipe
        </h2>
        <p className="text-white/90">
          Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
        </p>
      </div>
      <div className="flex flex-col p-8">
        <div id="hubspot-form-container" className="min-h-[400px]">
          <div 
            dangerouslySetInnerHTML={{
              __html: `
                <script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/embed/v2.js"></script>
                <script>
                  hbspt.forms.create({
                    portalId: "26878201",
                    formId: "312a9f67-e613-4651-9690-4586646554a0",
                    region: "eu1"
                  });
                </script>
              `
            }}
          />
        </div>
      </div>
    </div>
  );
}