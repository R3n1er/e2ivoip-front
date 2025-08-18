import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from '../app/contact/page';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region: string;
  className: string;
}

// Mock des composants externes
vi.mock('@/components/hubspot-contact-form-global', () => ({
  HubSpotContactFormGlobal: ({ portalId, formId, region, className }: HubSpotFormProps) => (
    <div data-testid="hubspot-form" data-portal-id={portalId} data-form-id={formId} data-region={region} className={className}>
      HubSpot Form Mock
    </div>
  ),
}));

vi.mock('@/components/secure-email', () => ({
  SecureEmail: ({ email }: { email: string }) => <span data-testid="secure-email">{email}</span>,
}));

describe('ContactPage - Section Nos Implantations', () => {
  it('affiche la section "Nos implantations" avec le titre correct', () => {
    render(<ContactPage />);
    
    const title = screen.getByText('Nos implantations');
    expect(title).toBeInTheDocument();
  });

  it('affiche la description de la section', () => {
    render(<ContactPage />);
    
    const description = screen.getByText('Présents aux Antilles, en Guyane, à la Réunion et en France Métropolitaine');
    expect(description).toBeInTheDocument();
  });

  it('affiche les 4 implantations avec leurs numéros de téléphone', () => {
    render(<ContactPage />);
    
    // Vérifier que les 4 implantations sont présentes
    expect(screen.getByText('Guyane')).toBeInTheDocument();
    expect(screen.getByText('Guadeloupe')).toBeInTheDocument();
    expect(screen.getByText('Martinique')).toBeInTheDocument();
    expect(screen.getByText('La Réunion')).toBeInTheDocument();
    
    // Vérifier les numéros de téléphone
    expect(screen.getByText('+594 594 963 500')).toBeInTheDocument();
    expect(screen.getByText('+590 590 173 500')).toBeInTheDocument();
    expect(screen.getByText('+596 596 313 500')).toBeInTheDocument();
    expect(screen.getByText('+262 263 085 500')).toBeInTheDocument();
  });

  it('affiche les liens téléphoniques cliquables', () => {
    render(<ContactPage />);
    
    const phoneLinks = screen.getAllByRole('link', { name: /\+594 594 963 500/ });
    expect(phoneLinks).toHaveLength(1);
    expect(phoneLinks[0]).toHaveAttribute('href', 'tel:+594594963500');
  });

  it('applique le style dégradé correct à la section', () => {
    render(<ContactPage />);
    
    const section = document.querySelector('section.bg-gradient-to-r.from-red-primary.to-blue-marine');
    expect(section).toBeInTheDocument();
  });
});
