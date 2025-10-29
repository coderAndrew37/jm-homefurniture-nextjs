import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

// Mock data - replace with your actual data source
const categories = {
  'living-room': {
    name: 'Living Room',
    description: 'Comfortable and stylish living room furniture'
  },
  'bedroom': {
    name: 'Bedroom', 
    description: 'Create your perfect sleep sanctuary'
  },
  'dining': {
    name: 'Dining',
    description: 'Elegant dining furniture for family gatherings'
  },
  'office': {
    name: 'Office',
    description: 'Productive home office solutions'
  }
}

const products = {
  'living-room': [
    {
      id: 1,
      slug: 'maasai-inspired-sofa',
      name: 'Maasai Inspired Sofa',
      price: 45000,
      originalPrice: 52000,
      image: '/sofa-1.jpg',
      rating: 4.8,
      reviews: 124,
      description: 'Handcrafted sofa with traditional Maasai patterns',
      features: ['Premium upholstery', 'Solid wood frame', 'Easy to clean']
    },
    {
      id: 2,
      slug: 'modern-loveseat',
      name: 'Modern Loveseat',
      price: 32000,
      image: '/loveseat-1.jpg',
      rating: 4.6,
      reviews: 89,
      description: 'Compact loveseat perfect for small spaces',
      features: ['Compact design', 'Modern styling', 'Comfortable seating']
    }
  ],
  'bedroom': [
    {
      id: 3,
      slug: 'savannah-bed-frame',
      name: 'Savannah Bed Frame',
      price: 67000,
      originalPrice: 75000,
      image: '/bed-1.jpg',
      rating: 4.7,
      reviews: 156,
      description: 'King size bed frame with Savannah-inspired design',
      features: ['Solid wood construction', 'Ample storage', 'Easy assembly']
    }
  ]
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories[params.category as keyof typeof categories]
  
  if (!category) {
    return {
      title: 'Category Not Found'
    }
  }

  return {
    title: `${category.name} - Kenyan Furniture Store`,
    description: category.description
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories[params.category as keyof typeof categories]
  const categoryProducts = products[params.category as keyof typeof products] || []

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/categories" className="text-gray-500 hover:text-amber-600">
              Categories
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>
      </nav>

      {/* Category Header */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Reviews</option>
                <option>Newest Arrivals</option>
              </select>
              
              <div className="text-gray-600">
                {categoryProducts.length} products
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">View:</span>
              <button className="p-2 border border-gray-300 rounded-lg">
                📱
              </button>
              <button className="p-2 border border-amber-500 bg-amber-50 rounded-lg">
                🗂️
              </button>
            </div>
          </div>

          {/* Products */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center mb-3">
                        <div className="flex text-amber-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          <span className="text-gray-300">
                            {'★'.repeat(5 - Math.floor(product.rating))}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          KES {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            KES {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105">
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                We're working on adding more products to this category.
              </p>
              <Link
                href="/categories"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Browse All Categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Category Description */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our {category.name} Collection
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Discover our carefully curated {category.name.toLowerCase()} furniture collection, 
              designed specifically for Kenyan homes. Each piece combines modern aesthetics with 
              traditional craftsmanship, ensuring both style and durability. From contemporary 
              designs to classic pieces with local influences, find the perfect furniture to 
              transform your space.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}