import { allProducts } from '../../data/products';

export function generateMetadata({ params }) {
  const product = allProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Generate SEO-friendly keywords from product data
  const keywords = [
    product.name.toLowerCase(),
    `${product.name.toLowerCase()} manufacturer`,
    `${product.name.toLowerCase()} supplier`,
    `${product.name.toLowerCase()} India`,
    'laboratory glassware',
    'scientific equipment',
    'borosilicate glass',
    'ISO certified glassware',
    'laboratory equipment',
    ...product.specifications.map(spec => spec.toLowerCase().split(' ').slice(0, 3).join(' ')),
    ...product.applications.map(app => app.toLowerCase().split(' ').slice(0, 3).join(' ')),
  ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates

  const description = `Buy ${product.name} - ${product.desc} from Krishnawanshi Overseas. ${product.specifications[0]}. ${product.applications[0]}. ISO certified laboratory glassware. Worldwide shipping available.`;

  return {
    title: `${product.name} - Laboratory Glassware | Krishnawanshi Overseas`,
    description: description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${product.name} - Premium Laboratory Glassware`,
      description: description,
      url: `https://krishnawanshioverseas.com/products/${product.slug}`,
      siteName: 'Krishnawanshi Overseas',
      images: [
        {
          url: product.img,
          width: 1200,
          height: 630,
          alt: `${product.name} - Laboratory Glassware`,
        },
      ],
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - Laboratory Glassware`,
      description: description,
      images: [product.img],
    },
    alternates: {
      canonical: `https://krishnawanshioverseas.com/products/${product.slug}`,
    },
  };
}

