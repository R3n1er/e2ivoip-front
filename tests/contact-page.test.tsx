import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

// Mock HubSpotContactFormGlobal
vi.mock('@/components/hubspot-contact-form-global', () => ({
  HubSpotContactFormGlobal: ({ portalId, formId, region, className }: any) => (
    <div data-testid="hubspot-form" data-portal-id={portalId} data-form-id={formId} data-region={region} className={className}>
      HubSpot Form Mock
    </div>
  ),
}));

describe('ContactPage', () => {
  it('affiche le titre de la page', () => {
    render(<ContactPage />);
    
    // Utiliser getAllByText car il y a plusieurs éléments avec "Contactez-"
    const contactezElements = screen.getAllByText(/Contactez-/);
    expect(contactezElements.length).toBeGreaterThan(0);
    expect(screen.getByText('nous')).toBeInTheDocument();
  });



  it('affiche WhatsApp au lieu du téléphone', () => {
    render(<ContactPage />);
    
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Réponse rapide par message')).toBeInTheDocument();
  });

  it('affiche l\'email sécurisé', () => {
    render(<ContactPage />);
    
    // L'email doit être présent mais masqué par des points
    expect(screen.getByText(/••••••••••••••••••••••••/)).toBeInTheDocument();
  });

  it('affiche les numéros par département', () => {
    render(<ContactPage />);
    
    // Vérifier que tous les départements sont présents
    expect(screen.getByText('Guadeloupe')).toBeInTheDocument();
    expect(screen.getByText('Martinique')).toBeInTheDocument();
    expect(screen.getByText('Guyane')).toBeInTheDocument();
    expect(screen.getByText('La Réunion')).toBeInTheDocument();
    expect(screen.getByText('France métropolitaine')).toBeInTheDocument();
  });

  it('affiche les numéros de téléphone corrects', () => {
    render(<ContactPage />);
    
    // Vérifier les numéros de téléphone
    expect(screen.getByText('0590 96 35 00')).toBeInTheDocument(); // Guadeloupe
    expect(screen.getByText('0596 96 35 00')).toBeInTheDocument(); // Martinique
    
    // Utiliser getAllByText pour Guyane car il y a plusieurs éléments avec ce numéro
    const guyaneNumbers = screen.getAllByText('0594 96 35 00');
    expect(guyaneNumbers.length).toBeGreaterThan(0);
    
    expect(screen.getByText('0262 96 35 00')).toBeInTheDocument(); // La Réunion
    expect(screen.getByText('01 96 35 00')).toBeInTheDocument(); // France métropolitaine
  });

  it('affiche le formulaire HubSpot', () => {
    render(<ContactPage />);
    
    const hubspotForm = screen.getByTestId('hubspot-form');
    expect(hubspotForm).toBeInTheDocument();
    expect(hubspotForm).toHaveAttribute('data-portal-id', '26878201');
    expect(hubspotForm).toHaveAttribute('data-form-id', '312a9f67-e613-4651-9690-4586646554a0');
  });
});
