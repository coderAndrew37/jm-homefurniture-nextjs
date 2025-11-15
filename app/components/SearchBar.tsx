"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, X, Star, Clock } from "lucide-react";
import debounce from "lodash.debounce";

interface SearchResult {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  mainImage?: {
    asset?: {
      url: string;
    };
  };
  additionalImages?: Array<{
    asset?: {
      url: string;
    };
  }>;
  category?: { name?: string; slug?: { current: string } };
  rating?: { stars?: number; count?: number };
  isBestSeller?: boolean;
  tags?: string[];
}

interface RecentSearch {
  id: string;
  term: string;
  timestamp: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const isProcessingClick = useRef(false);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading recent searches:", error);
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((term: string) => {
    if (!term.trim()) return;

    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      term: term.trim(),
      timestamp: Date.now(),
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.term.toLowerCase() !== term.toLowerCase()
      );
      const updated = [newSearch, ...filtered].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove recent search
  const removeRecentSearch = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear all recent searches
  const clearAllRecentSearches = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  }, []);

  // Debounced search handler - use useCallback to prevent recreation
  const fetchResults = useCallback(
    debounce(async (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query.trim()) {
      fetchResults(query);
    } else {
      setResults([]);
    }
    return () => fetchResults.cancel();
  }, [query, fetchResults]);

  // Close dropdown when clicking outside - FIXED
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProcessingClick.current) {
        isProcessingClick.current = false;
        return;
      }

      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle product selection - FIXED
  const handleSelect = useCallback(
    (slug: string) => {
      isProcessingClick.current = true;
      saveRecentSearch(query);
      router.push(`/products/detail/${slug}`);
      // Don't reset state immediately to allow navigation to complete
      setTimeout(() => {
        setQuery("");
        setResults([]);
        setShowDropdown(false);
        setActiveIndex(-1);
        isProcessingClick.current = false;
      }, 100);
    },
    [query, saveRecentSearch, router]
  );

  // Handle view all results - FIXED
  const handleViewAllResults = useCallback(() => {
    isProcessingClick.current = true;
    saveRecentSearch(query);
    router.push(`/products?search=${encodeURIComponent(query)}`);
    // Don't reset state immediately to allow navigation to complete
    setTimeout(() => {
      setQuery("");
      setResults([]);
      setShowDropdown(false);
      setActiveIndex(-1);
      isProcessingClick.current = false;
    }, 100);
  }, [query, saveRecentSearch, router]);

  // Handle recent search selection
  const handleRecentSearchSelect = useCallback((term: string) => {
    setQuery(term);
    setShowDropdown(true);
    inputRef.current?.focus();
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation - FIXED
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDropdown) return;

      const totalItems = query ? results.length : recentSearches.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % totalItems);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < totalItems) {
            if (query) {
              handleSelect(results[activeIndex].slug.current);
            } else {
              handleRecentSearchSelect(recentSearches[activeIndex].term);
            }
          } else if (query.trim()) {
            handleViewAllResults();
          }
          break;
        case "Escape":
          setShowDropdown(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    if (showDropdown) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    showDropdown,
    activeIndex,
    results,
    recentSearches,
    query,
    handleSelect,
    handleViewAllResults,
    handleRecentSearchSelect,
  ]);

  const getEffectivePrice = (product: SearchResult) => {
    if (product.discountPercentage && product.discountPercentage > 0) {
      return Math.round(product.price * (1 - product.discountPercentage / 100));
    }
    return product.price;
  };

  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative w-full max-w-md" ref={resultsRef}>
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all duration-200">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            if (!showDropdown) setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full bg-transparent outline-none px-3 text-sm placeholder-gray-500"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
            aria-label="Search bar close"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {query ? (
              // Search Results
              <>
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mx-auto"></div>
                    <p className="text-gray-500 text-sm mt-2">Searching...</p>
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          Search Results
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {results.length} found
                        </span>
                      </div>
                    </div>

                    {results.map((item, index) => (
                      <button
                        key={item._id}
                        onClick={() => handleSelect(item.slug.current)}
                        className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors w-full text-left ${
                          index === activeIndex
                            ? "bg-amber-50"
                            : "hover:bg-gray-50"
                        }`}
                        type="button"
                      >
                        {/* Product Image */}
                        <div className="relative shrink-0">
                          {item.mainImage ? (
                            <Image
                              src={
                                item.mainImage.asset?.url ?? "/placeholder.png"
                              }
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg" />
                          )}
                          {item.isBestSeller && (
                            <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                              ★
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {item.category?.name || "General"}
                          </p>

                          {/* Rating */}
                          {item.rating?.stars && (
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(item.rating!.stars!)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                ({item.rating.count})
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {formatPrice(getEffectivePrice(item))}
                            </span>
                            {item.discountPercentage &&
                              item.discountPercentage > 0 && (
                                <>
                                  <span className="text-xs text-gray-500 line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                                    -{item.discountPercentage}%
                                  </span>
                                </>
                              )}
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* View All Results */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={handleViewAllResults}
                        className="w-full text-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors py-2"
                        type="button"
                      >
                        View All Results
                      </button>
                    </div>
                  </>
                ) : query.length >= 2 && !loading ? (
                  // No Results
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      No products found
                    </h4>
                    <p className="text-gray-500 text-xs">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : null}
              </>
            ) : (
              // Recent Searches
              recentSearches.length > 0 && (
                <>
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearAllRecentSearches}
                        className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                        type="button"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>

                  {recentSearches.map((search, index) => (
                    <button
                      key={search.id}
                      onClick={() => handleRecentSearchSelect(search.term)}
                      className={`flex items-center justify-between p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors w-full text-left ${
                        index === activeIndex
                          ? "bg-amber-50"
                          : "hover:bg-gray-50"
                      }`}
                      type="button"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">
                          {search.term}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(search.timestamp)}
                        </span>
                        <button
                          onClick={(e) => removeRecentSearch(search.id, e)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          type="button"
                          aria-label="Search bar close"
                        >
                          <X className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    </button>
                  ))}
                </>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
