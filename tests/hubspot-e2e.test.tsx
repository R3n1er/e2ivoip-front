import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactPage from '../app/contact/page';

// Mock du composant HubSpotScript
vi.mock('../components/hubspot-script', () => ({
  HubSpotScript: () => (
    <div data-testid="hubspot-script">
      <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
        <strong>Debug HubSpot:</strong> ✅ Formulaire HubSpot créé avec succès
      </div>
      <div data-testid="hubspot-form" className="hubspot-form">
        <iframe 
          title="HubSpot Form"
          src="about:blank"
          data-testid="hubspot-iframe"
        />
      </div>
    </div>
  )
}));

describe('HubSpot E2E Integration', () => {
  it('should display the complete contact page with HubSpot form', () => {
    render(<ContactPage />);
    
    // Vérifier que la page se charge complètement (texte divisé en plusieurs éléments)
    expect(screen.getByText(/Contactez nos/)).toBeInTheDocument();
    expect(screen.getByText(/experts VoIP/)).toBeInTheDocument();
    expect(screen.getByText('Demande de contact')).toBeInTheDocument();
    
    // Vérifier que le composant HubSpot est présent
    const hubspotScript = screen.getByTestId('hubspot-script');
    expect(hubspotScript).toBeInTheDocument();
    
    // Vérifier que le formulaire HubSpot est affiché
    const hubspotForm = screen.getByTestId('hubspot-form');
    expect(hubspotForm).toBeInTheDocument();
    
    // Vérifier que l'iframe HubSpot est présent
    const hubspotIframe = screen.getByTestId('hubspot-iframe');
    expect(hubspotIframe).toBeInTheDocument();
  });

  it('should have proper HubSpot form container structure', () => {
    render(<ContactPage />);
    
    // Vérifier que le conteneur du formulaire a le bon ID
    const formContainer = screen.getByTestId('hubspot-script').parentElement;
    expect(formContainer).toHaveAttribute('id', 'hubspot-form-container');
    
    // Vérifier que le conteneur est dans la bonne section
    const cardContent = formContainer?.closest('[class*="p-8"]');
    expect(cardContent).toBeInTheDocument();
  });

  it('should display contact information alongside the form', () => {
    render(<ContactPage />);
    
    // Vérifier que les informations de contact sont présentes
    expect(screen.getByText('Nos coordonnées')).toBeInTheDocument();
    expect(screen.getByText('0189 560 500')).toBeInTheDocument();
    expect(screen.getByText('0594 96 35 00')).toBeInTheDocument();
    
    // Vérifier que le formulaire est dans la même section
    expect(screen.getByTestId('hubspot-script')).toBeInTheDocument();
  });

  it('should have proper responsive layout', () => {
    render(<ContactPage />);
    
    // Vérifier que la grille responsive est en place
    const gridContainer = screen.getByTestId('hubspot-script').closest('[class*="grid"]');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('lg:grid-cols-2');
  });
});
