/**
 * Verrou éditorial — tarifs 3CX SMB PRO.
 *
 * Arbitrage utilisateur du 2026-09-19 :
 *   15 €/utilisateur/mois = formule AU COMPTEUR (Trunk SIP au compteur à ajouter)
 *   29 €/utilisateur/mois = formule ILLIMITÉE (fixes France + DOM inclus)
 *
 * Ces deux montants sont DEUX FORMULES DISTINCTES, pas un ancien et un nouveau
 * tarif. Afficher 29 € seul (état historique de la page) ou 15 € seul est une
 * erreur factuelle : le visiteur ne peut pas savoir ce qu'il achète.
 *
 * Source de vérité : docs/ligne-editoriale.md, section
 * « Specs produit — source de vérité ».
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');

const read = (rel: string): string => readFileSync(join(ROOT, rel), 'utf8');

describe('Tarifs 3CX SMB PRO — deux formules distinctes', () => {
  describe('Page /telephonie-entreprise/3cx-smb-mutualisee', () => {
    const page = read('app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx');

    it('affiche la formule au compteur à 15 €/utilisateur/mois', () => {
      expect(page).toMatch(/15 €/);
      expect(page).toMatch(/[Ff]ormule au compteur/);
    });

    it('affiche la formule illimitée à 29 €/utilisateur/mois', () => {
      expect(page).toMatch(/29 €/);
      expect(page).toMatch(/[Ff]ormule illimit[ée]e/);
    });

    it("précise que l'illimité couvre les fixes France métropolitaine et DOM", () => {
      expect(page).toMatch(/[Ff]ixes[^.]{0,40}(France m[ée]tropolitaine|DOM)/);
    });

    it("précise que les mobiles restent au compteur dans la formule illimitée", () => {
      expect(page.toLowerCase()).toContain('mobiles restent facturés au compteur');
    });

    it('indique que le Trunk SIP se dimensionne au niveau de l\'instance, pas par utilisateur', () => {
      // Le JSX encode l'apostrophe en &apos; : on accepte les trois formes.
      expect(page).toMatch(/au niveau de l(?:&apos;|’|')instance/);
      expect(page.toLowerCase()).toContain('appels simultan');
    });

    it("n'annonce plus un tarif unique et tout compris", () => {
      expect(page).not.toMatch(/tarif unique/i);
      expect(page).not.toMatch(/tout compris, par utilisateur/i);
    });

    it("le bloc « inclus » ne présente pas l'illimité comme valable pour les deux formules", () => {
      // « Appels illimités vers les fixes » nu laisserait croire que l'illimité
      // s'applique aussi à la formule au compteur.
      expect(page).not.toMatch(/Appels illimités vers les fixes/);
      expect(page).toMatch(/factur[ée]s au compteur dans la formule au compteur/);
    });
  });

  describe('Page /telephonie-3cx', () => {
    const page = read('app/telephonie-3cx/page.tsx');

    it('met en avant 15 € comme prix d\'entrée', () => {
      expect(page).toMatch(/15 €/);
    });

    it('mentionne 29 € comme variante illimitée', () => {
      expect(page).toMatch(/29 €/);
      expect(page).toMatch(/illimit[ée]/i);
    });

    it('affiche « Dès 15 € » dans le tableau comparatif, pas 29 € seul', () => {
      expect(page).toMatch(/D[èe]s 15 €/);
    });
  });

  describe('Page /nos-services — prix d\'entrée', () => {
    const page = read('app/nos-services/page.tsx');

    it('annonce le prix d\'entrée 15 €, pas 29 € comme prix unique', () => {
      expect(page).toMatch(/D[èe]s 15 €\/utilisateur\/mois/);
    });
  });

  describe('Source de vérité — docs/ligne-editoriale.md', () => {
    const doc = read('docs/ligne-editoriale.md');

    it('documente les deux formules dans la source de vérité', () => {
      expect(doc).toMatch(/15 €\/utilisateur\/mois au compteur/);
      expect(doc).toMatch(/29 €\/utilisateur\/mois en illimité/);
    });

    it('interdit explicitement de présenter un prix unique', () => {
      expect(doc).toMatch(/Ne jamais afficher un prix unique/i);
    });

    it('précise que 15 € et 29 € sont deux formules, pas un ancien et un nouveau tarif', () => {
      expect(doc).toMatch(/deux\s+formules distinctes/i);
    });

    it('conserve l\'interdit « +50 postes » sur 3CX PRO', () => {
      expect(doc).toMatch(/Ne jamais écrire « \+50 postes »/);
    });
  });

  describe('Cohérence — aucune page n\'isole 29 € comme unique tarif SMB', () => {
    const pages = [
      'app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx',
      'app/telephonie-3cx/page.tsx',
      'app/nos-services/page.tsx',
    ];

    it.each(pages)('%s : 29 € n\'apparaît pas sans le contexte des deux formules', (rel) => {
      const content = read(rel);
      if (!content.includes('29 €')) return; // page sans mention, rien à vérifier

      // Partout où 29 € figure, la formulation « deux formules » ou « illimité »
      // doit être présente sur la page pour lever l'ambiguïté.
      const hasIllimite = /illimit[ée]/i.test(content);
      const hasCompteur = /compteur/i.test(content);
      expect(hasIllimite || hasCompteur).toBe(true);
    });
  });
});
