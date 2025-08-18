import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/footer';

describe('Footer', () => {
  it('affiche le logo E2I', () => {
    render(<Footer />);
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('I')).toBeInTheDocument();
  });

  it('affiche les trois partenaires dans la section partenaires', () => {
    render(<Footer />);
    expect(screen.getByText('3CX')).toBeInTheDocument();
    expect(screen.getByText('Yeastar')).toBeInTheDocument();
    expect(screen.getByText('Grandstream')).toBeInTheDocument();
  });

  it('affiche le badge 3CX Bronze Partner', () => {
    render(<Footer />);
    expect(screen.getByText('Bronze Partner')).toBeInTheDocument();
  });

  it('a des liens vers les sites officiels des partenaires', () => {
    render(<Footer />);
    
    // Utiliser getAllByRole pour éviter les conflits avec les liens de services
    const allLinks = screen.getAllByRole('link');
    const partnerLinks = allLinks.filter(link => 
      link.getAttribute('href')?.startsWith('https://')
    );
    
    expect(partnerLinks).toHaveLength(3);
    
    const link3cx = partnerLinks.find(link => link.textContent?.includes('3CX'));
    const linkYeastar = partnerLinks.find(link => link.textContent?.includes('Yeastar'));
    const linkGrandstream = partnerLinks.find(link => link.textContent?.includes('Grandstream'));
    
    expect(link3cx).toHaveAttribute('href', 'https://www.3cx.fr');
    expect(linkYeastar).toHaveAttribute('href', 'https://www.yeastar.com');
    expect(linkGrandstream).toHaveAttribute('href', 'https://www.grandstream.com');
  });

  it('affiche le copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 E2I VoIP/)).toBeInTheDocument();
  });

  it('affiche les informations de contact', () => {
    render(<Footer />);
    expect(screen.getByText('contact@e2i-voip.com')).toBeInTheDocument();
    expect(screen.getByText('Paris, France')).toBeInTheDocument();
  });

  it('affiche tous les numéros de téléphone par département', () => {
    render(<Footer />);
    
    // Vérifier le titre de la section (utiliser getAllByText et prendre le premier)
    const contactTitles = screen.getAllByText('Nous contacter');
    expect(contactTitles[0]).toBeInTheDocument();
    
    // Vérifier tous les numéros
    expect(screen.getByText('Guyane :')).toBeInTheDocument();
    expect(screen.getByText('+594 594 963 500')).toBeInTheDocument();
    
    expect(screen.getByText('Guadeloupe :')).toBeInTheDocument();
    expect(screen.getByText('+590 590 173 500')).toBeInTheDocument();
    
    expect(screen.getByText('Martinique :')).toBeInTheDocument();
    expect(screen.getByText('+596 596 313 500')).toBeInTheDocument();
    
    expect(screen.getByText('La Réunion :')).toBeInTheDocument();
    expect(screen.getByText('+262 263 085 500')).toBeInTheDocument();
  });

  it('n\'affiche plus le bouton CTA "Nous contacter" (supprimé)', () => {
    render(<Footer />);
    const contactButtons = screen.queryAllByRole('link', { name: /Nous contacter/ });
    expect(contactButtons).toHaveLength(0);
  });

  it('affiche les sections de services et support', () => {
    render(<Footer />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Informations')).toBeInTheDocument();
  });
});
