import { render, screen } from '@testing-library/react';
import { GradientButton } from '@/components/ui/gradient-button';

describe('GradientButton', () => {
  it('rend le bouton avec le texte fourni', () => {
    render(<GradientButton>Cliquez ici</GradientButton>);
    expect(screen.getByRole('button', { name: 'Cliquez ici' })).toBeInTheDocument();
  });

  it('applique la variante primaire par défaut', () => {
    render(<GradientButton>Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-red-600', 'to-blue-700');
  });

  it('applique la variante secondaire correctement', () => {
    render(<GradientButton variant="secondary">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-blue-700', 'to-gray-500');
  });

  it('applique la variante accent correctement', () => {
    render(<GradientButton variant="accent">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-br', 'from-red-600', 'to-green-600');
  });

  it('applique la variante success correctement', () => {
    render(<GradientButton variant="success">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-br', 'from-blue-700', 'to-green-600');
  });

  it('applique la variante warning correctement', () => {
    render(<GradientButton variant="warning">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gradient-to-r', 'from-red-600', 'to-orange-500');
  });

  it('applique la taille par défaut (md)', () => {
    render(<GradientButton>Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4', 'py-2', 'text-base');
  });

  it('applique la taille small correctement', () => {
    render(<GradientButton size="sm">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('applique la taille large correctement', () => {
    render(<GradientButton size="lg">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('applique les classes CSS personnalisées', () => {
    render(<GradientButton className="custom-class">Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applique les classes de base requises', () => {
    render(<GradientButton>Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'font-medium',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'gradient-hover'
    );
  });

  it('gère l\'état disabled correctement', () => {
    render(<GradientButton disabled>Bouton</GradientButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('passe les props HTML standard', () => {
    render(
      <GradientButton 
        type="submit" 
        form="test-form"
        data-testid="test-button"
      >
        Bouton
      </GradientButton>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('form', 'test-form');
    expect(button).toHaveAttribute('data-testid', 'test-button');
  });
});
