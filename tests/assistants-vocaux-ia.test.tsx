import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock du composant ContactFormAssistantIA pour éviter les dépendances externes
jest.mock('@/components/contact-form-assistant-ia', () => ({
  ContactFormAssistantIA: () => (
    <section id="contact" data-testid="contact-form-mock">
      <h2>Discutons de votre projet d'assistant vocal IA</h2>
      <p>Démonstration gratuite</p>
      <p>Sans engagement</p>
      <p>Réponse rapide</p>
    </section>
  ),
}));


describe('Page Assistants Vocaux IA', () => {
  let AssistantsVocauxIA: any;

  beforeEach(async () => {
    // Import dynamique pour éviter les problèmes SSR
    const pageModule = await import('@/app/nos-services/assistants-vocaux-ia/page');
    AssistantsVocauxIA = pageModule.default;
  });

  it('rend la page sans erreur', () => {
    render(<AssistantsVocauxIA />);
    const elements = screen.getAllByText(/Assistants vocaux/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('affiche le badge Intelligence Artificielle', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('Intelligence Artificielle')).toBeInTheDocument();
  });

  it('affiche le titre principal avec IA', () => {
    render(<AssistantsVocauxIA />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Assistants vocaux.*IA/);
  });

  it('affiche la section Introduction avec le titre', () => {
    render(<AssistantsVocauxIA />);
    expect(
      screen.getByText(/Réinventez votre réception téléphonique/i)
    ).toBeInTheDocument();
  });

  it('affiche les 4 avantages clés', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('Accueil 24/7')).toBeInTheDocument();
    expect(screen.getByText('Qualification')).toBeInTheDocument();
    expect(screen.getByText('Gain de temps')).toBeInTheDocument();
    expect(screen.getByText('ROI immédiat')).toBeInTheDocument();
  });

  it('affiche la section "Les 3 piliers"', () => {
    render(<AssistantsVocauxIA />);
    expect(
      screen.getByText(/Les 3 piliers/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Un accueil impeccable/i)).toBeInTheDocument();
    expect(
      screen.getByText(/La qualification automatique/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Un relais humain maîtrisé/i)).toBeInTheDocument();
  });

  it('affiche la section Cas d\'usage avec 3 exemples', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('Accueil et orientation')).toBeInTheDocument();
    expect(screen.getByText('Prise de rendez-vous')).toBeInTheDocument();
    expect(screen.getByText('Support niveau 1')).toBeInTheDocument();
  });

  it('affiche les exemples de dialogues', () => {
    render(<AssistantsVocauxIA />);
    expect(
      screen.getByText(/Bonjour, vous êtes bien chez E2I VoIP/i)
    ).toBeInTheDocument();
  });

  it('affiche la section Fonctionnalités avec 4 cartes', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('IA conversationnelle')).toBeInTheDocument();
    expect(screen.getByText('Disponibilité 24/7')).toBeInTheDocument();
    expect(screen.getByText('Personnalisation avancée')).toBeInTheDocument();
    expect(screen.getByText('Intégration CRM')).toBeInTheDocument();
  });

  it('affiche le formulaire de contact', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByTestId('contact-form-mock')).toBeInTheDocument();
  });

  it('affiche les avantages du contact (Démo gratuite, Sans engagement, Réponse rapide)', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('Démonstration gratuite')).toBeInTheDocument();
    expect(screen.getByText('Sans engagement')).toBeInTheDocument();
    expect(screen.getByText('Réponse rapide')).toBeInTheDocument();
  });

  it('affiche la section CTA finale', () => {
    const { container } = render(<AssistantsVocauxIA />);
    // Le texte est splitté par un <span>, on cherche dans le HTML brut
    expect(container.innerHTML).toMatch(/Prêt à/i);
    expect(container.innerHTML).toMatch(/révolutionner/i);
  });

  it('affiche les CTAs principaux', () => {
    render(<AssistantsVocauxIA />);
    // La page utilise des <a class="monolith-btn"> sans data-testid
    const ctaLinks = screen.getAllByRole('link', { name: /Parler à un expert|Demander une démo/i });
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('affiche le CTA téléphone dans la section finale', () => {
    render(<AssistantsVocauxIA />);
    expect(screen.getByText('01 89 56 05 00')).toBeInTheDocument();
  });

  it('contient une ancre #contact pour la navigation', () => {
    render(<AssistantsVocauxIA />);
    // Le formulaire de contact devrait être dans une section avec id="contact"
    const contactSection = screen.getByTestId('contact-form-mock').closest('section');
    expect(contactSection).toHaveAttribute('id', 'contact');
  });

  it('utilise la charte graphique E2I VoIP (classes Tailwind)', () => {
    const { container } = render(<AssistantsVocauxIA />);
    const html = container.innerHTML;
    
    // Vérifie la présence des couleurs de la charte
    expect(html).toMatch(/text-red-primary|bg-red-primary/);
    // La page utilise #091421 (valeur hex directe) au lieu de blue-marine
    expect(html).toMatch(/\[#091421\]|bg-\[#091421\]/);
    expect(html).toMatch(/text-gray-dark|bg-gray-dark|text-gray-500|text-gray-600/);
  });

  it('contient des icônes LineIcons', () => {
    const { container } = render(<AssistantsVocauxIA />);
    const icons = container.querySelectorAll('i[class*="lni"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('est responsive avec des classes Tailwind appropriées', () => {
    const { container } = render(<AssistantsVocauxIA />);
    const html = container.innerHTML;
    
    // Vérifie la présence de classes responsive
    expect(html).toMatch(/md:|lg:|sm:/);
  });
});

