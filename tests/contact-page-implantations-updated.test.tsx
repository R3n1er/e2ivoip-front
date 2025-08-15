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

describe('ContactPage - Section Nos Implantations (Style mis à jour)', () => {
  it('affiche la section "Nos implantations" avec le titre correct', () => {
    render(<ContactPage />);
    
    const title = screen.getByText('Nos implantations');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'text-white');
  });

  it('affiche les 4 implantations avec le style Card de qui-sommes-nous', () => {
    render(<ContactPage />);
    
    // Vérifier que les 4 implantations sont présentes
    expect(screen.getByText('Guyane')).toBeInTheDocument();
    expect(screen.getByText('Guadeloupe')).toBeInTheDocument();
    expect(screen.getByText('Martinique')).toBeInTheDocument();
    expect(screen.getByText('La Réunion')).toBeInTheDocument();
  });

  it('affiche les numéros de téléphone cliquables', () => {
    render(<ContactPage />);
    
    // Vérifier que les numéros sont des liens cliquables
    const guyanePhone = screen.getByText('+594 594 963 500');
    const guadeloupePhone = screen.getByText('+590 590 173 500');
    const martiniquePhone = screen.getByText('+596 596 313 500');
    const reunionPhone = screen.getByText('+262 263 085 500');
    
    expect(guyanePhone).toHaveAttribute('href', 'tel:+594594963500');
    expect(guadeloupePhone).toHaveAttribute('href', 'tel:+590590173500');
    expect(martiniquePhone).toHaveAttribute('href', 'tel:+596596313500');
    expect(reunionPhone).toHaveAttribute('href', 'tel:+262263085500');
  });

  it('utilise le gradient de fond correct (from-red-primary to-blue-marine)', () => {
    render(<ContactPage />);
    
    const section = screen.getByText('Nos implantations').closest('section');
    expect(section).toHaveClass('bg-gradient-to-r', 'from-red-primary', 'to-blue-marine');
  });

  it('utilise le layout en grille responsive', () => {
    render(<ContactPage />);
    
    const gridContainer = screen.getByText('Guyane').closest('div')?.parentElement;
    expect(gridContainer).toHaveClass('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6');
  });
});
