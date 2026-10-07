const image = (file) => `/images/${file}`;

export const showroomPhones = [
  {
    id: 'iphone-17-pro-max-orange',
    title: 'iPhone 17 Pro Max',
    subtitle: 'Laranja',
    src: image('iphone-17-pro-max-orange.jpg'),
    alt: 'iPhone 17 Pro Max laranja visto pela traseira',
    objectFit: 'contain',
    summary: 'A peça principal da abertura, apresentada pela traseira e pelo conjunto de câmeras.',
  },
  {
    id: 'pro-finishes',
    title: 'Acabamentos Pro',
    subtitle: 'Quatro variações visuais',
    src: image('iphone-colors.jpg'),
    alt: 'Quatro aparelhos em acabamentos escuro, claro, azul e vinho',
    objectFit: 'contain',
    summary: 'A imagem disponível reúne quatro acabamentos, sem especificar o modelo de cada aparelho.',
  },
  {
    id: 'blue-front-and-back',
    title: 'Frente e verso',
    subtitle: 'Variação azul',
    src: image('smartphone-display-blue.webp'),
    alt: 'Render azul de um smartphone mostrado pela frente e pela traseira',
    objectFit: 'contain',
    summary: 'Uma referência visual de frente e verso em azul; o modelo não está identificado no asset.',
  },
];

export const proFinishes = [
  { id: 'midnight', name: 'Meia-noite', color: '#111313' },
  { id: 'silver', name: 'Prateado', color: '#dedbd4' },
  { id: 'blue', name: 'Azul', color: '#9bb7e5' },
  { id: 'wine', name: 'Vinho', color: '#7c344e' },
];

export const storeCategories = [
  { id: 'iphones', title: 'iPhone', note: 'A vitrine em primeiro plano', image: image('store-iphone.jpg'), alt: 'Vitrine da loja com comunicação visual de iPhone 17 Pro' },
  { id: 'accessories', title: 'Acessórios', note: 'Detalhes para acompanhar o aparelho', image: image('store-accessories.jpg'), alt: 'Parede de acessórios e capas expostos na loja' },
  { id: 'in-store', title: 'Na loja', note: 'Uma escolha para ver de perto', image: image('store-cases.jpg'), alt: 'Parede de capas coloridas expostas na loja' },
];
