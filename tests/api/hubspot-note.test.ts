/**
 * vuln-0002 et vuln-0007 (scan Strix 2026-08-20) : injection HTML stockée
 * dans les notes HubSpot.
 *
 * HubSpot affiche `hs_note_body` comme du HTML dans le CRM. Un texte de
 * visiteur écrit tel quel y deviendrait du HTML actif, vu par l'équipe
 * commerciale. Le corps de note doit donc être échappé.
 *
 * @jest-environment node
 */

import { formatHubSpotNoteBody } from "@/lib/api/hubspot-note";

describe("formatHubSpotNoteBody", () => {
  it("échappe le HTML du titre et du corps", () => {
    const html = formatHubSpotNoteBody(
      "<b>titre</b>",
      '<img src=x onerror="alert(1)">'
    );

    expect(html).not.toContain("<img");
    expect(html).not.toContain("<b>titre</b>");
    expect(html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    expect(html).toContain("&lt;b&gt;titre&lt;/b&gt;");
  });

  it("neutralise un lien de phishing", () => {
    const html = formatHubSpotNoteBody(
      "Chat site web",
      '<a href="https://phishing.example">Cliquez</a>'
    );

    expect(html).not.toContain('<a href="https://phishing.example"');
    expect(html).toContain("&lt;a href=");
  });

  it("conserve les retours ligne sous forme de <br />", () => {
    const html = formatHubSpotNoteBody("Titre", "ligne 1\nligne 2");

    expect(html).toContain("ligne 1<br />ligne 2");
  });

  it("met le titre en gras", () => {
    const html = formatHubSpotNoteBody("Chat site web", "corps");

    expect(html).toContain("<strong>Chat site web</strong>");
  });
});
