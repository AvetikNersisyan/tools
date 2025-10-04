import { Product, Review, Comment, Feature } from '../types';

/**
 * Sample product data
 */
export const PRODUCT: Product = {
  id: 'product-drill-001',
  title: 'Հզոր էլեկտրական դռել',
  subtitle: 'Հզորություն և ճշգրտություն Ձեր վերանորոգման աշխատանքների համար',
  price: 19900,
  originalPrice: 34900,
  sku: 'DRL-PWR-ARM01',
  description: 'Հզոր էլեկտրական դռել վերանորոգման և շինարարական աշխատանքների համար',
  images: [
    'https://tse4.mm.bing.net/th/id/OIP.U7_J3E6d5xW9OiqlLPR-XQHaHa?pid=Api',
    'https://tse1.mm.bing.net/th/id/OIP.LAM0x4cDR7niTlm4mynRWQHaHa?pid=Api',
    'https://tse2.mm.bing.net/th/id/OIP.5WjZLgUwtgs06W5ckrd3EgHaHZ?pid=Api',
    'https://tse4.mm.bing.net/th/id/OIP.B6eFzEiOmyOyJKuwf9RUQgHaHa?pid=Api',
  ],
};

/**
 * Sample reviews data
 */
export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Անի',
    rating: 5,
    text: 'Շատ հարմար է տան վերանորոգման համար։ Հզոր է և հեշտ օգտագործման։ Խորհուրդ եմ տալիս։',
    date: '2025-09-20T12:30:00Z',
  },
  {
    id: 'r2',
    name: 'Արման',
    rating: 4,
    text: 'Լավն է, մի քիչ աղմկոտ է, բայց իր գործը գերազանց կատարում է։',
    date: '2025-09-21T09:15:00Z',
  },
  {
    id: 'r3',
    name: 'Լուսինե',
    rating: 5,
    text: 'Հայրիկիս նվեր էի առել, շատ գոհ է։ Որակը բարձր է։',
    date: '2025-09-22T14:45:00Z',
  },
  {
    id: 'r4',
    name: 'Տիգրան',
    rating: 4,
    text: 'Առաքումը արագ էր, աշխատում է հիանալի։ Գինը էլ շատ լավ է։',
    date: '2025-09-23T11:00:00Z',
  },
  {
    id: 'r5',
    name: 'Մարինե',
    rating: 5,
    text: 'Իմ ամուսինը ասում է՝ լավագույն գործիքն է, որ ունեցել է։',
    date: '2025-09-24T08:25:00Z',
  },
  {
    id: 'r6',
    name: 'Սուրեն',
    rating: 3,
    text: 'Չնայած լավն է, բայց տուփը վնասված էր։ Գործիքը ամբողջությամբ աշխատում է։',
    date: '2025-09-25T16:10:00Z',
  },
];

/**
 * Sample comments data (for social proof)
 */
export const COMMENTS: Comment[] = [
  {
    id: 'c1',
    name: 'Գևորգ',
    text: 'Ինչքան է հզորությունը՝ Վատտերով?',
    date: '2025-09-26T10:00:00Z',
  },
  {
    id: 'c2',
    name: 'Նարինե',
    text: 'Քարի վրա կարելի՞ է օգտագործել։',
    date: '2025-09-26T11:30:00Z',
  },
  {
    id: 'c3',
    name: 'Հրաչյա',
    text: 'Առաքումը Երևանում քանի՞ օրում է։',
    date: '2025-09-27T09:45:00Z',
  },
  {
    id: 'c4',
    name: 'Լևոն',
    text: 'Լիցքավորվո՞ւմ է, թե միայն լարով է աշխատում։',
    date: '2025-09-27T14:20:00Z',
  },
  {
    id: 'c5',
    name: 'Արփի',
    text: 'Հնարավո՞ր է ապառիկով գնել։',
    date: '2025-09-28T08:55:00Z',
  },
  {
    id: 'c6',
    name: 'Դավիթ',
    text: 'Կա՞ երաշխիք։ Եթե այո՝ քանի ամիս։',
    date: '2025-09-28T16:35:00Z',
  },
  {
    id: 'c7',
    name: 'Տամարա',
    text: 'Սա նվերի համար հարմար է։ Շնորհակալություն մանրամասների համար։',
    date: '2025-09-29T12:40:00Z',
  },
  {
    id: 'c8',
    name: 'Սերգեյ',
    text: 'Այս պահի դրությամբ քանի հատ է մնացել։',
    date: '2025-09-30T18:15:00Z',
  },
];

/**
 * Product features/benefits
 */
export const FEATURES: Feature[] = [
  {
    id: 'feature-001',
    title: 'Բարձր հզորություն',
    description: 'Հզոր շարժիչ 1200Վտ՝ ամենաամուր նյութերի հետ աշխատելու համար։',
    icon: 'premium-materials',
  },
  {
    id: 'feature-002',
    title: '2 տարվա երաշխիք',
    description: 'Ամբողջական երաշխիք և անվճար սպասարկում 2 տարի ընթացքում։',
    icon: 'warranty',
  },
  {
    id: 'feature-003',
    title: 'Էրգոնոմիկ ձևավորում',
    description: 'Հարմար բռնակ և թեթև քաշ՝ երկար ժամանակ աշխատելու համար։',
    icon: 'ergonomic',
  },
  {
    id: 'feature-004',
    title: 'Մասնագիտական որակ',
    description: 'Օգտագործվում է հազարավոր մասնագետների և վարպետների կողմից։',
    icon: 'professional',
  },
  {
    id: 'feature-005',
    title: 'Ճշգրիտ կատարում',
    description: 'Բարձր ճշգրտություն և կայուն աշխատանք՝ կատարյալ արդյունքների համար։',
    icon: 'precision',
  },
  {
    id: 'feature-006',
    title: 'Անվճար առաքում',
    description: 'Արագ և անվճար առաքում ամբողջ Հայաստանում։',
    icon: 'shipping',
  },
];

/**
 * Calculate average rating from reviews
 */
export const getAverageRating = (reviews: Review[] = REVIEWS): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
};

/**
 * Get discount percentage
 */
export const getDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};