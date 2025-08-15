import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/footer';

describe('Footer', () => {
  it('affiche le titre "Partenaires certifiés"', () => {
    render(<Footer />);
    
    expect(screen.getByText('Partenaires certifiés :')).toBeInTheDocument();
  });

  it('affiche les trois partenaires', () => {
    render(<Footer />);
    
    expect(screen.getByText('3CX')).toBeInTheDocument();
    expect(screen.getByText('Yeastar')).toBeInTheDocument();
    expect(screen.getByText('Grandstream')).toBeInTheDocument();
  });

  it('affiche le badge 3CX Bronze Partner', () => {
    render(<Footer />);
    
    expect(screen.getByText('Bronze Partner')).toBeInTheDocument();
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  it('a des liens vers les sites officiels des partenaires', () => {
    render(<Footer />);
    
    // Vérifier le lien 3CX
    const link3cx = screen.getByText('3CX').closest('a');
    expect(link3cx).toHaveAttribute('href', 'https://www.3cx.fr');
    expect(link3cx).toHaveAttribute('target', '_blank');
    expect(link3cx).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Vérifier le lien Yeastar
    const linkYeastar = screen.getByText('Yeastar').closest('a');
    expect(linkYeastar).toHaveAttribute('href', 'https://www.yeastar.com');
    expect(linkYeastar).toHaveAttribute('target', '_blank');
    expect(linkYeastar).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Vérifier le lien Grandstream
    const linkGrandstream = screen.getByText('Grandstream').closest('a');
    expect(linkGrandstream).toHaveAttribute('href', 'https://www.grandstream.com');
    expect(linkGrandstream).toHaveAttribute('target', '_blank');
    expect(linkGrandstream).toHaveAttribute('rel', 'noopener noreferrer');
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
    
    // Vérifier le titre de la section
    expect(screen.getByText('Nos numéros par département :')).toBeInTheDocument();
    
    // Vérifier tous les numéros
    expect(screen.getByText('Guadeloupe :')).toBeInTheDocument();
    expect(screen.getByText('0590 96 35 00')).toBeInTheDocument();
    
    expect(screen.getByText('Martinique :')).toBeInTheDocument();
    expect(screen.getByText('0596 96 35 00')).toBeInTheDocument();
    
    expect(screen.getByText('Guyane :')).toBeInTheDocument();
    expect(screen.getByText('0594 96 35 00')).toBeInTheDocument();
    
    expect(screen.getByText('La Réunion :')).toBeInTheDocument();
    expect(screen.getByText('0262 96 35 00')).toBeInTheDocument();
    
    expect(screen.getByText('France métropolitaine :')).toBeInTheDocument();
    expect(screen.getByText('01 96 35 00')).toBeInTheDocument();
  });
});
