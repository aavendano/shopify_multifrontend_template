export interface LinkItem {
  label: string;
  href: string;
}

export interface LinkGroup {
  title: string;
  items: LinkItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface Filter {
  id: string;
  label: string;
  type: 'text' | 'range' | 'checkbox' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
}
