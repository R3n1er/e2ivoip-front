import { render, screen } from '@testing-library/react';
import { Header } from '@/components/header';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

// Mock des composants Next.js
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock des composants UI
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <button {...props}>{children}</button>,
}));

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  SheetContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  SheetTrigger: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
}));

describe('Header - Test d\'hydratation', () => {
  beforeEach(() => {
    // Mock de window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    
    // Mock des événements de scroll
    global.window.addEventListener = vi.fn();
    global.window.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test('Le composant Header se rend sans erreurs d\'hydratation', () => {
    // Vérifier que le composant se rend sans erreur
    expect(() => render(<Header />)).not.toThrow();
    
    // Vérifier que les éléments sont présents
    expect(screen.getByText('E')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('I')).toBeInTheDocument();
  });

  test('Les classes CSS sont correctement appliquées', () => {
    render(<Header />);
    
    // Vérifier que les classes CSS sont présentes
    const header = screen.getByText('E').closest('header');
    expect(header).toHaveClass('fixed', 'top-0', 'w-full', 'z-[100]');
    
    const logo = screen.getByText('E').closest('div');
    expect(logo).toHaveClass('text-xl', 'lg:text-2xl', 'font-bold');
  });

  test('La navigation est correctement structurée', () => {
    render(<Header />);
    
    // Vérifier que la navigation desktop a les bonnes classes
    const desktopNav = screen.getAllByText('Qui sommes-nous').find(el => 
      el.closest('nav')?.classList.contains('lg:flex')
    );
    expect(desktopNav).toBeInTheDocument();
    
    // Vérifier que le bouton mobile a les bonnes classes
    const mobileButton = screen.getAllByRole('button').find(button => 
      button.classList.contains('lg:hidden')
    );
    expect(mobileButton).toBeInTheDocument();
  });

  test('Les sous-menus sont présents dans le DOM', () => {
    render(<Header />);
    
    // Vérifier que les éléments de sous-menu sont présents
    expect(screen.getByText('Notre histoire')).toBeInTheDocument();
    expect(screen.getByText('Notre équipe')).toBeInTheDocument();
    expect(screen.getByText('Nos certifications')).toBeInTheDocument();
    expect(screen.getByText('Nos partenaires')).toBeInTheDocument();
  });

  test('Le composant gère les états de scroll', () => {
    render(<Header />);
    
    // Vérifier que l'écouteur de scroll est ajouté
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  test('La structure des liens est correcte', () => {
    render(<Header />);
    
    // Vérifier que les liens ont les bonnes URLs
    const quiSommesNousElements = screen.getAllByText('Qui sommes-nous');
    const quiSommesNousLink = quiSommesNousElements.find(el => 
      el.closest('a')?.getAttribute('href') === '/qui-sommes-nous'
    );
    expect(quiSommesNousLink).toBeInTheDocument();
    
    const mobiliteElements = screen.getAllByText('Mobilité');
    const mobiliteLink = mobiliteElements.find(el => 
      el.closest('a')?.getAttribute('href') === '/mobilite'
    );
    expect(mobiliteLink).toBeInTheDocument();
  });
});
