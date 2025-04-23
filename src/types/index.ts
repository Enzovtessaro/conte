export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
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