import { allProducts } from '../data/products';

export const metadata = {
  title: "Laboratory Glassware Products - Beakers, Flasks, Test Tubes & More",
  description: "Browse our complete range of laboratory glassware products including beakers, flasks, test tubes, pipettes, burettes, condensers, and more. ISO certified scientific equipment for research, pharmaceutical, and industrial applications.",
  keywords: "laboratory glassware products, beakers, flasks, test tubes, pipettes, burettes, laboratory equipment, scientific glassware, borosilicate glass, laboratory supplies",
  alternates: {
    canonical: 'https://krishnawanshioverseas.com/products',
  },
  openGraph: {
    title: "Laboratory Glassware Products - Krishnawanshi Overseas",
    description: "Complete range of laboratory glassware products including beakers, flasks, test tubes, and more. ISO certified scientific equipment.",
    url: 'https://krishnawanshioverseas.com/products',
    type: 'website',
  },
};

export default function ProductsLayout({ children }) {
  return children;
}

