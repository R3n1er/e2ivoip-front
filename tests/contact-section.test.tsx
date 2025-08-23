// Jest mocks
;
import { render, screen } from '@testing-library/react';
import { ContactSection } from '@/components/contact-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

describe('ContactSection', () => {
  it('affiche le titre de la section', () => {
    render(<ContactSection />);
    
    expect(screen.getByText(/Contactez-/)).toBeInTheDocument();
    expect(screen.getByText('nous')).toBeInTheDocument();
  });

  it('affiche les informations de contact en deux colonnes', () => {
    render(<ContactSection />);
    
    // Vérifier que les 4 cartes d'information sont présentes
    expect(screen.getByText('Téléphone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Adresse')).toBeInTheDocument();
    expect(screen.getByText('Horaires')).toBeInTheDocument();
  });

  it('affiche le bon numéro de téléphone', () => {
    render(<ContactSection />);
    
    // Il y a deux éléments avec ce numéro (carte + bouton CTA), donc on utilise getAllByText
    const phoneNumbers = screen.getAllByText('0594 96 35 00');
    expect(phoneNumbers).toHaveLength(2);
  });

  it('affiche l\'adresse email sécurisée avec lien vers la page de contact', () => {
    render(<ContactSection />);
    
    // L'email doit être présent mais masqué par des points
    const emailLink = screen.getByText(/••••••••••••••••••••••••/);
    expect(emailLink).toBeInTheDocument();
    
    // Vérifier que c'est un lien vers la page de contact
    expect(emailLink.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('n\'affiche pas de formulaire de contact', () => {
    render(<ContactSection />);
    
    // Vérifier qu'il n'y a pas de formulaire
    expect(screen.queryByText('Demande de devis')).not.toBeInTheDocument();
    expect(screen.queryByText('Remplissez ce formulaire')).not.toBeInTheDocument();
  });

  it('affiche le CTA urgent', () => {
    render(<ContactSection />);
    
    expect(screen.getByText('Besoin d\'une réponse rapide ?')).toBeInTheDocument();
    expect(screen.getByText('Appelez-nous directement pour un conseil personnalisé')).toBeInTheDocument();
  });
});
