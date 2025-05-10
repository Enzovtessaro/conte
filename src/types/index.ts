export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface ComparisonItemProps {
  text: string;
  isPositive: boolean;
}