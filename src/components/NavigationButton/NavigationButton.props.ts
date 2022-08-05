import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface NavigationButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type: 'next' | 'prev'
}