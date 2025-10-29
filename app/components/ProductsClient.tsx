"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with your API
const allProducts = [
  {
    id: 1,
    slug: "maasai-inspired-sofa",
    name: "Maasai Inspired Sofa",
    price: 45000,
    originalPrice: 52000,
    image: "/sofa-1.jpg",
    category: "living-room",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestSeller: true,
    tags: ["sofa", "living-room", "maasai", "kenyan"],
  },
  {
    id: 2,
    slug: "modern-loveseat",
    name: "Modern Loveseat",
    price: 32000,
    image: "/loveseat-1.jpg",
    category: "living-room",
    rating: 4.6,
    reviews: 89,
    tags: ["loveseat", "living-room", "modern"],
  },
  {
    id: 3,
    slug: "savannah-bed-frame",
    name: "Savannah Bed Frame",
    price: 67000,
    originalPrice: 75000,
    image: "/bed-1.jpg",
    category: "bedroom",
    rating: 4.7,
    reviews: 156,
    isBestSeller: true,
    tags: ["bed", "bedroom", "savannah", "kenyan"],
  },
  {
    id: 4,
    slug: "nairobi-office-desk",
    name: "Nairobi Office Desk",
    price: 28900,
    image: "/desk-1.jpg",
    category: "office",
    rating: 4.6,
    reviews: 67,
    isNew: true,
    tags: ["desk", "office", "nairobi"],
  },
  {
    id: 5,
    slug: "kilimanjaro-dining-table",
    name: "Kilimanjaro Dining Table",
    price: 38500,
    originalPrice: 45000,
    image: "/dining-table-1.jpg",
    category: "dining",
    rating: 4.9,
    reviews: 89,
    isBestSeller: true,
    tags: ["dining-table", "dining", "kilimanjaro"],
  },
  {
    id: 6,
    slug: "cozy-armchair",
    name: "Cozy Armchair",
    price: 18900,
    image: "/armchair-1.jpg",
    category: "living-room",
    rating: 4.5,
    reviews: 45,
    tags: ["armchair", "living-room", "cozy"],
  },
  {
    id: 7,
    slug: "storage-cabinet",
    name: "Storage Cabinet",
    price: 24500,
    image: "/cabinet-1.jpg",
    category: "storage",
    rating: 4.4,
    reviews: 34,
    tags: ["cabinet", "storage", "organization"],
  },
  {
    id: 8,
    slug: "outdoor-patio-set",
    name: "Outdoor Patio Set",
    price: 89500,
    originalPrice: 99000,
    image: "/outdoor-1.jpg",
    category: "outdoor",
    rating: 4.7,
    reviews: 78,
    tags: ["outdoor", "patio", "garden"],
  },
  // Add more products as needed...
];

const categories = [
  { value: "all", label: "All Categories", count: allProducts.length },
  {
    value: "living-room",
    label: "Living Room",
    count: allProducts.filter((p) => p.category === "living-room").length,
  },
  {
    value: "bedroom",
    label: "Bedroom",
    count: allProducts.filter((p) => p.category === "bedroom").length,
  },
  {
    value: "dining",
    label: "Dining",
    count: allProducts.filter((p) => p.category === "dining").length,
  },
  {
    value: "office",
    label: "Office",
    count: allProducts.filter((p) => p.category === "office").length,
  },
  {
    value: "outdoor",
    label: "Outdoor",
    count: allProducts.filter((p) => p.category === "outdoor").length,
  },
  {
    value: "storage",
    label: "Storage",
    count: allProducts.filter((p) => p.category === "storage").length,
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-15000", label: "Under KES 15,000" },
  { value: "15000-30000", label: "KES 15,000 - 30,000" },
  { value: "30000-50000", label: "KES 30,000 - 50,000" },
  { value: "50000-100000", label: "KES 50,000 - 100,000" },
  { value: "100000+", label: "Over KES 100,000" },
];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State from URL params
  const currentPage = parseInt(searchParams.get("page") || "1");
  const categoryFilter = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";
  const priceRange = searchParams.get("price") || "all";
  const searchQuery = searchParams.get("search") || "";
  const itemsPerPage = 12;

  // Filter and sort products
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let filtered = [...allProducts];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Apply price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter((product) => {
        const price = product.price;
        switch (priceRange) {
          case "0-15000":
            return price <= 15000;
          case "15000-30000":
            return price > 15000 && price <= 30000;
          case "30000-50000":
            return price > 30000 && price <= 50000;
          case "50000-100000":
            return price > 50000 && price <= 100000;
          case "100000+":
            return price > 100000;
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "featured":
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [categoryFilter, sortBy, priceRange, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Update URL parameters
  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (!updates.page) {
      params.set("page", "1");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.push("/products", { scroll: false });
  };

  const hasActiveFilters =
    categoryFilter !== "all" || priceRange !== "all" || searchQuery;

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
            <span className="text-gray-900 font-medium">All Products</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                All Products
              </h1>
              <p className="text-gray-600">
                Discover our complete collection of quality furniture
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {filteredProducts.length} products found
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* Categories Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() =>
                        updateSearchParams({ category: category.value })
                      }
                      className={`w-full flex justify-between items-center p-2 rounded-lg text-left transition-colors ${
                        categoryFilter === category.value
                          ? "bg-amber-50 text-amber-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => updateSearchParams({ price: range.value })}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        priceRange === range.value
                          ? "bg-amber-50 text-amber-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Product Status
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchParams.get("new") === "true"}
                      onChange={(e) =>
                        updateSearchParams({ new: e.target.checked.toString() })
                      }
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700">New Arrivals</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchParams.get("bestseller") === "true"}
                      onChange={(e) =>
                        updateSearchParams({
                          bestseller: e.target.checked.toString(),
                        })
                      }
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700">Best Sellers</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchParams.get("sale") === "true"}
                      onChange={(e) =>
                        updateSearchParams({
                          sale: e.target.checked.toString(),
                        })
                      }
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Sort By */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      updateSearchParams({ sort: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Options */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">View:</span>
                    <button className="p-2 border border-gray-300 rounded-lg hover:border-amber-500">
                      📱
                    </button>
                    <button className="p-2 border border-amber-500 bg-amber-50 rounded-lg">
                      🗂️
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {categoryFilter !== "all" && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Category:{" "}
                      {
                        categories.find((c) => c.value === categoryFilter)
                          ?.label
                      }
                      <button
                        onClick={() => updateSearchParams({ category: "all" })}
                        className="hover:text-amber-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Price:{" "}
                      {priceRanges.find((p) => p.value === priceRange)?.label}
                      <button
                        onClick={() => updateSearchParams({ price: "all" })}
                        className="hover:text-amber-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => updateSearchParams({ search: "" })}
                        className="hover:text-amber-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200"
                    >
                      <Link href={`/products/${product.slug}`}>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            {product.isNew && (
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                New
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Best Seller
                              </span>
                            )}
                            {product.originalPrice && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Sale
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          <div className="flex items-center mb-3">
                            <div className="flex text-amber-400 text-sm">
                              {"★".repeat(Math.floor(product.rating))}
                              <span className="text-gray-300">
                                {"★".repeat(5 - Math.floor(product.rating))}
                              </span>
                            </div>
                            <span className="text-sm text-gray-600 ml-2">
                              ({product.reviews})
                            </span>
                          </div>

                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg font-bold text-gray-900">
                              KES {product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                KES {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 text-sm">
                            Add to Cart
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        updateSearchParams({
                          page: Math.max(1, currentPage - 1).toString(),
                        })
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() =>
                            updateSearchParams({ page: pageNum.toString() })
                          }
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === pageNum
                              ? "bg-amber-500 text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        updateSearchParams({
                          page: Math.min(
                            totalPages,
                            currentPage + 1
                          ).toString(),
                        })
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your filters. Try
                  adjusting your search criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
