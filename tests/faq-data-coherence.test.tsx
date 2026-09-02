import { render } from "@testing-library/react";
import {
  FAQ_TRUNK_ILLIMITE,
  FAQ_SMB_MUTUALISEE,
  FAQ_PBX_YEASTAR,
  GENERAL_FAQ,
  COMPTEUR_FAQ,
  AIRCALL_FAQ,
  DEVIS_FAQ,
  FAQ_3CX,
  FAQ_TELEPHONIE_ENTREPRISE,
  RichFaqItem,
} from "@/lib/faq-data";

const ALL_FAQ_SETS: Array<[string, RichFaqItem[]]> = [
  ["GENERAL_FAQ", GENERAL_FAQ],
  ["COMPTEUR_FAQ", COMPTEUR_FAQ],
  ["AIRCALL_FAQ", AIRCALL_FAQ],
  ["DEVIS_FAQ", DEVIS_FAQ],
  ["FAQ_3CX", FAQ_3CX],
  ["FAQ_TELEPHONIE_ENTREPRISE", FAQ_TELEPHONIE_ENTREPRISE],
  ["FAQ_TRUNK_ILLIMITE", FAQ_TRUNK_ILLIMITE],
  ["FAQ_SMB_MUTUALISEE", FAQ_SMB_MUTUALISEE],
  ["FAQ_PBX_YEASTAR", FAQ_PBX_YEASTAR],
];

/** Rend le JSX d'une réponse et renvoie son texte brut. */
function renderAnswerText(item: RichFaqItem): string {
  const { container } = render(<div>{item.answer}</div>);
  return container.textContent ?? "";
}

describe("Intégrité des liens téléphoniques", () => {
  test.each(ALL_FAQ_SETS)(
    "%s : tous les href tel: sont des numéros composables",
    (_name, items) => {
      items.forEach((item) => {
        const { container } = render(<div>{item.answer}</div>);
        const telLinks = container.querySelectorAll('a[href^="tel:"]');

        telLinks.forEach((link) => {
          const href = link.getAttribute("href") ?? "";
          const number = href.replace(/^tel:/, "");

          // Un lien tel: doit être exclusivement composé de chiffres,
          // précédés d'un éventuel +. Tout autre caractère (astérisque
          // de masquage, espace, tiret) casse la numérotation.
          expect(number).toMatch(/^\+?[0-9]+$/);
        });
      });
    }
  );
});

describe("Cohérence commerciale des réponses FAQ", () => {
  test("Trunk SIP illimité : ne promet pas d'illimité vers les mobiles", () => {
    // La page /telephonie-entreprise/trunk-sip-illimite facture les appels
    // mobiles au compteur. La FAQ (visible ET JSON-LD) ne doit donc jamais
    // annoncer d'illimité incluant les mobiles.
    FAQ_TRUNK_ILLIMITE.forEach((item) => {
      const visible = renderAnswerText(item);

      [item.answerText, visible].forEach((text) => {
        expect(text).not.toMatch(/illimité[^.]*mobiles/i);
        expect(text).not.toMatch(/fixes et mobiles/i);
      });
    });
  });

  test("3CX SMB mutualisée : annonce bien 3 à 10 utilisateurs", () => {
    // La page vend explicitement « De 3 à 10 utilisateurs » à 29 €/user/mois.
    FAQ_SMB_MUTUALISEE.forEach((item) => {
      const visible = renderAnswerText(item);

      [item.answerText, visible].forEach((text) => {
        expect(text).not.toMatch(/10-15 postes/i);
        expect(text).not.toMatch(/1 à 15 postes/i);
      });
    });
  });

  test("PBX Yeastar : ne référence pas de gamme absente de la page", () => {
    // La page /telephonie-entreprise/pbx-yeastar est consacrée à la P-Series
    // et ne mentionne aucune S-Series. Publier cette gamme dans le JSON-LD
    // exposerait des données structurées sans contenu visible correspondant.
    FAQ_PBX_YEASTAR.forEach((item) => {
      const visible = renderAnswerText(item);

      [item.answerText, visible].forEach((text) => {
        expect(text).not.toMatch(/S-Series/i);
      });
    });
  });
});

describe("Synchronisation answerText ↔ answer", () => {
  test.each(ALL_FAQ_SETS)(
    "%s : chaque answerText est non vide et sans balisage",
    (_name, items) => {
      items.forEach((item) => {
        expect(item.answerText.trim().length).toBeGreaterThan(0);
        // Le JSON-LD attend du texte brut, jamais du HTML.
        expect(item.answerText).not.toMatch(/<[a-z][\s\S]*>/i);
      });
    }
  );
});
