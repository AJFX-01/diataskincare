import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '../contexts/auth';
import { RenderResult } from '@testing-library/react';


const renderWithContext = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AuthProvider, ...options });
    
export * from '@testing-library/react';


export { renderWithContext as render };