import { useEffect, useState } from 'react';
import { client } from '../shopify/client';
import { QUERY_PRODUCTS } from '../graphql/products';
import { BlurFade } from '../components/magicui/blur-fade';
import { Button } from '../components/ui/button';
import ProductCard from '../components/products/product-card';
import CollectionsSlideshow from '../components/collections/collections-slideshow';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const { data } = await client.request(QUERY_PRODUCTS, {
          variables: {
            first: 4,
            sortKey: 'BEST_SELLING',
            reverse: false
          },
        });
        
        if (data?.products?.edges) {
          setFeaturedProducts(data.products.edges.map(edge => edge.node));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://frontend.co/api/photos?query=modern+fashion+store&w=800&h=600&q=90" 
            alt="Modern fashion collection" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <BlurFade delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Signature Style
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.4}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our latest collections and find pieces that speak to your unique personality
            </p>
          </BlurFade>
          
          <BlurFade delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-base h-auto">
                Shop New Arrivals
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-base h-auto bg-transparent text-white border-white hover:bg-white/10">
                Explore Collections
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
      
      {/* Featured Collections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop Our Collections</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse through our carefully curated collections to find the perfect addition to your wardrobe
              </p>
            </div>
          </BlurFade>
          
          <CollectionsSlideshow />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular styles that customers love
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {featuredProducts.map((product, idx) => (
              <BlurFade key={product.id} delay={0.1 + idx * 0.05} inView>
                <ProductCard product={product} />
              </BlurFade>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild className="px-8">
              <a href="/search">View All Products</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial, idx) => (
              <BlurFade key={idx} delay={0.1 + idx * 0.1} inView>
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="ri-star-fill text-yellow-400 text-xl"></i>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">
                    "I absolutely love the quality of the clothes. The fabrics are luxurious and the fit is perfect. Will definitely be ordering again soon!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                      <img 
                        src={`https://frontend.co/api/photos?query=person+portrait+${idx}&w=100&h=100&q=90`}
                        alt="Customer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Loyal Customer</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <BlurFade delay={0.1} inView>
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-white/80 text-lg max-w-md">
                  Subscribe to our newsletter for exclusive offers, new product announcements, and style tips.
                </p>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2} inView>
              <div className="md:w-1/2 w-full max-w-md">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                  <Button type="submit" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-white/60 mt-3">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing you with the best shopping experience
              </p>
            </div>
          </BlurFade>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-truck-line",
                title: "Free Shipping",
                description: "Free shipping on all orders over $50"
              },
              {
                icon: "ri-refresh-line",
                title: "Easy Returns",
                description: "30-day easy return policy"
              },
              {
                icon: "ri-secure-payment-line",
                title: "Secure Checkout",
                description: "Your data is protected with 256-bit SSL encryption"
              }
            ].map((feature, idx) => (
              <BlurFade key={idx} delay={0.1 + idx * 0.1} inView>
                <div className="text-center p-6">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}