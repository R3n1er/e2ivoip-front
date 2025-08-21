import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from '../app/contact/page';

// Mock du composant HubSpotScript
vi.mock('../components/hubspot-script', () => ({
  HubSpotScript: () => <div data-testid="hubspot-script">HubSpot Script Mock</div>
}));

describe('ContactPage HubSpot Integration', () => {
  it('should display the HubSpot form container', () => {
    render(<ContactPage />);
    
    // Vérifier que le conteneur du formulaire existe
    const formContainer = screen.getByTestId('hubspot-script');
    expect(formContainer).toBeInTheDocument();
  });

  it('should have the correct HubSpot form container ID', () => {
    render(<ContactPage />);
    
    // Vérifier que l'ID du conteneur est correct
    const formContainer = screen.getByTestId('hubspot-script');
    expect(formContainer.parentElement).toHaveAttribute('id', 'hubspot-form-container');
  });

  it('should display the contact form card', () => {
    render(<ContactPage />);
    
    // Vérifier que la carte du formulaire est présente
    const formCard = screen.getByText('Demande de contact');
    expect(formCard).toBeInTheDocument();
  });

  it('should display contact information', () => {
    render(<ContactPage />);
    
    // Vérifier que les informations de contact sont présentes
    expect(screen.getByText('Nos coordonnées')).toBeInTheDocument();
    expect(screen.getByText('0189 560 500')).toBeInTheDocument();
    expect(screen.getByText('0594 96 35 00')).toBeInTheDocument();
  });
});
