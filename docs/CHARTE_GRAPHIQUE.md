# Charte Graphique Officielle E2I VoIP (Version Stitch 2026)

Ce document définit l'identité visuelle exclusive applicable à partir du Redesign B2B 2026 élaboré sur Google Stitch. Toute l'interface doit s'y conformer strictement.

> [!NOTE]
> Ce document se concentre exclusivement sur les couleurs, la typographie et l'organisation visuelle basique.
> Pour des informations structurelles et des détails d'interface plus poussés, veuillez obligatoirement vous référer au document **[Design.md](./Design.md)**.
> 
> **Vous retrouverez dans `Design.md` :**
> - 🟩 L'application détaillée de la **"Philosophie Carrée"** (standards et exceptions pour les bordures).
> - 🍱 La logique et les classes css des **Grilles Asymétriques (Bento Box)**.
> - 📐 Les concepts de **Hero Asymétrique** (Web 2026) et les décors B2B à utiliser.
> - 🪞 L'usage strict des effets de **Glassmorphism unifié**.
> - 🔵 La narration visuelle régissant l'alternance des **fonds Blanc ou Bleu Marine**.
## 🎨 Couleurs Principales

### Rouge Principal

- **Code hexadécimal** : #E53E3E
- **RGB** : 229, 62, 62
- **Utilisation** :
  - Chiffre "2" dans E2I
  - Lettres "IP" dans VOIP
  - Hover sur les lettres E/I
  - Boutons CTA
  - Liens au survol
  - Éléments d'accent

### Bleu Marine

- **Code hexadécimal** : #2D3848
- **RGB** : 45, 56, 72

---

## 🎨 1. Palette de Couleurs (Design System Stitch)

La nouvelle charte s'appuie sur des contrastes binaires forts (Bleu Marine/Gris Foncé VS Blanc) couplés à un Rouge d'action percutant. **Aucun dégradé n'est autorisé.**

### 🔴 Rouge Principal d'Action ("Primary Red")
- **Code Hexadécimal** : `#E53E3E`
- **Rôle** : Couleur de conversion et d'accentuation.
- **Utilisation** :
  - Boutons d'action principaux (CTA) sur fond blanc ou bleu marine (ex: "Découvrir nos offres", "Contact").
  - Mots-clés en surbrillance dans les titres.
  - Cartes de services spécifiques nécessitant une attention immédiate (ex: "Studio d'enregistrement").
  - Chiffres clés dans la barre de statistiques (ex: `0€`, `+12k`).
  - Lignes décoratives d'accentuation (ex: ligne rouge à droite du titre "NOS SOLUTIONS PHARES").
  - Lettres E et I dans E2I
  - Éléments d'accent secondaires
  - Informations importantes

### 🌑 Bleu Marine / Gris Foncé ("Dark Background")
- **Code Hexadécimal** : `#1F2937` (ou fondation `#2D3848` assombrie).
- **Rôle** : Couleur de fond statutaire et institutionnelle.
- **Utilisation** :
  - Arrière-plan de la section **Hero** (Haut de page).
  - Arrière-plan des grandes cartes de services (ex: "3CX PRO", "Assistants Vocaux IA").
  - Section de Call-To-Action pré-footer ("PRÊT À MODERNISER...").
  - Typographie principale sur fond blanc.
   - Lettres "VO" dans VOIP
  - Baseline et textes secondaires
  - Éléments de navigation secondaires

### ⚪ Blanc Pur ("Solid White")
- **Code Hexadécimal** : `#FFFFFF`
- **Rôle** : Espace de respiration, clarté et lecture B2B.
- **Utilisation** :
  - Arrière-plan global du site, de la barre de navigation (Header) et du Footer.
  - Fond de la section "Ils nous font confiance" et de la barre de KPIs.
  - Boutons d'action (CTA) positionnés à l'intérieur des cartes à fond foncé (ex: bouton "En savoir plus" texto noir sur fond blanc).
  - Typographie principale sur fond Bleu Marine / Gris Foncé.

---

## 📐 2. Lignes Directrices de Forme : "Philosophie Carrée"

En totale opposition avec les tendances "génériques" d'Internet (qui favorisent les angles ronds `rounded-xl`), l'identité E2I VoIP repose sur des angles tranchés pour affirmer sa solidité d'opérateur Télécom.

- **Boutons (CTA)** : Toujours des rectangles parfaits (`rounded-none`).
- **Cartes & Conteneurs** : Coins à 0 pixels de rayon de courbure.
- **Menus Déroulants (Dropdowns)** : Des blocs rectangulaires vifs, avec une ombre légère (`shadow-lg`) pour la profondeur.

---

## 🔤 3. Typographie

L'interface utilise une police sans-serif géométrique, moderne et très lisible (comme **Inter** ou **Roboto**).

- **Titres (H1, H2)** : Graisse très forte (`font-extrabold` ou `font-bold`), sans empattement. Les interlignes sont serrés pour un impact bloc (`leading-tight`).
- **Textes Courants (Body)** : Plus clairs et fins, favorisant la lecture fluide des descriptions de services complexes.

---

## 🏗️ 4. Organisation de la Page (Structure Stitch)

D'après les maquettes de référence validées, l’organisation asymétrique et aérée s'articule ainsi :

### A. Navigation (Header) & Menus
- Fond blanc pur.
- Logo E2I Solutions à gauche.
- Liens de navigation au centre (Typographie majuscule légère).
- Les menus déroulants liés à "Téléphonie d'entreprise" ou "Nos Services" s'ouvrent en blocs rectangulaires blancs avec textes noirs, comportant parfois une indication rouge au survol.
- À l'extrême droite : un bouton d'action rectangulaire Rouge (`#E53E3E`).

### B. Hero Section (Haut de page)
- Fond sombre (Bleu Marine/Gris foncé).
- **Asymétrie** :
  - À gauche : Le grand titre ("La téléphonie d'entreprise, simple et évolutive") et le bouton CTA rouge.
  - À droite : Des blocs imbriqués textuels soulignés de lignes rouges, exposant les métriques clés ("Plus de 100", "+15 ans").

### C. Réassurance
- Bandeau "ILS NOUS FONT CONFIANCE" centré sur fond blanc avec des grisés rectangulaires pour les logos clients.

### D. Nos Solutions Phares (Bento Grid)
- Un titre de section aligné à gauche sur fond blanc, suivi d'une ligne fine rouge.
- Une **Grille Asymétrique** composée de "tuiles" à bords bruts :
  - Tuile Large format paysage (Fond sombre) : 3CX PRO & ENTREPRISE (Bouton interne : rectangle blanc).
  - Tuile Standard carrée (Fond sombre) : TRUNK SIP (Bouton interne : rectangle blanc).
  - Tuile Large format paysage (Fond sombre) : ASSISTANTS VOCAUX IA.
  - Tuile Standard carrée (Fond Rouge) : STUDIO D'ENREGISTREMENT (Bouton interne : rectangle blanc avec texte rouge ou inversement).

### E. Bandeau KPI
- Sur fond blanc, présentation des statistiques ("99.9%", "0€", "24/7", "+12k") avec une typographie de grande taille, où une alternance de couleurs Noir/Rouge vient ponctuer la lecture. De petites lignes rouges séparent ou soulignent ces données.

### F. Pre-Footer & Footer
- **Pre-Footer** : Un bloc massif sombre (Bleu/Gris) avec un CTA central invitant à l'action ("PRÊT À MODERNISER VOS COMMUNICATIONS ?") suivi d'un bouton rouge.
- **Footer final** : Fond blanc, arborant les colonnes liens grisés et un design clair. Le champ de newsletter intègre un minuscule bouton carré rouge d'envoi.

---

## 🗨️ 5. Widget Chat (Position & Couleurs)

Le bouton de livechat et son formulaire de pre-qualification sont des elements flottants permanents du site. Leur charte colorimetrique est strictement alignee sur les composants principaux :

- **Bouton** : Rouge Principal plein (`bg-[#E53E3E]`), texte/icone blanc, ombre dure `shadow-[4px_4px_0_0_#1F2937]`. Aucun gradient.
- **Formulaire** : Carte blanche (`bg-white`), ombre dure `shadow-[6px_6px_0_0_#1F2937]`, inputs `bg-gray-50`.
- **Texte "Une question ?"** : Fond blanc, ombre dure legere, typographie industrielle majuscule.
- **Position** : `fixed bottom-6 right-6` — entre le Footer et le bord de l'ecran, toujours visible.

> Pour les specifications completes du widget (animation, formulaire, integration HubSpot), voir **[Design.md — Section 7.5bis](./Design.md)**.

---

> [!WARNING]
> Tout composant (React ou HTML) introduit dans l'application doit impérativement respecter ces tokens (ex: pas de ombres douces `shadow-soft`, pas de coins arrondis `rounded-md`, pas de dégradés `bg-gradient-to-r`). L'usage des classes Tailwind se limitera à `bg-white`, `bg-[#1F2937]`, `bg-[#E53E3E]` et `rounded-none`.
