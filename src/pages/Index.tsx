
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Download, Star, Users, FileText, Plus, Settings, Menu, X } from 'lucide-react';

// Dados dos produtos PDF (facilmente editável para iniciantes)
const initialProducts = [
  {
    id: 1,
    title: "Guia Completo de Marketing Digital",
    description: "E-book com 150 páginas sobre estratégias de marketing digital para pequenas empresas.",
    price: 29.90,
    originalPrice: 49.90,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    sales: 1250,
    category: "Marketing",
    featured: true
  },
  {
    id: 2,
    title: "Manual de Programação Python",
    description: "Curso completo em PDF para aprender Python do zero ao avançado com exercícios práticos.",
    price: 39.90,
    originalPrice: 69.90,
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    sales: 890,
    category: "Programação",
    featured: true
  },
  {
    id: 3,
    title: "Receitas Fitness Completas",
    description: "Mais de 100 receitas saudáveis com valores nutricionais e modo de preparo detalhado.",
    price: 19.90,
    originalPrice: 34.90,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&crop=center",
    rating: 4.7,
    sales: 2100,
    category: "Saúde",
    featured: false
  },
  {
    id: 4,
    title: "Gestão Financeira Pessoal",
    description: "Aprenda a organizar suas finanças, investir e alcançar a independência financeira.",
    price: 24.90,
    originalPrice: 44.90,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
    rating: 4.6,
    sales: 756,
    category: "Finanças",
    featured: false
  },
  {
    id: 5,
    title: "Design Gráfico Moderno",
    description: "Técnicas avançadas de design, teoria das cores e composição visual para designers.",
    price: 34.90,
    originalPrice: 59.90,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    rating: 4.8,
    sales: 445,
    category: "Design",
    featured: true
  },
  {
    id: 6,
    title: "Mindfulness e Meditação",
    description: "Guia prático para reduzir o estresse e aumentar o bem-estar através da meditação.",
    price: 16.90,
    originalPrice: 29.90,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    rating: 4.9,
    sales: 1678,
    category: "Bem-estar",
    featured: false
  }
];

const Index = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Categorias disponíveis
  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Funções do carrinho
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Simular compra e download
  const handlePurchase = () => {
    if (!customerInfo.name || !customerInfo.email) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Simular processamento de pagamento
    setTimeout(() => {
      // Adicionar itens comprados
      const newPurchases = cart.map(item => ({
        ...item,
        purchaseDate: new Date().toLocaleString(),
        downloadUrl: `https://example.com/download/${item.id}` // URL simulada
      }));
      
      setPurchasedItems([...purchasedItems, ...newPurchases]);
      
      // Limpar carrinho
      setCart([]);
      setShowCheckout(false);
      
      // Mostrar downloads
      alert('Compra realizada com sucesso! Seus downloads estão disponíveis.');
      
      // Simular download automático (em uma implementação real, seria um link real)
      newPurchases.forEach(item => {
        console.log(`Download iniciado para: ${item.title}`);
      });
    }, 2000);
  };

  // Componente do produto
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {product.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Destaque
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{product.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="flex items-center ml-4">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm text-gray-600">{product.sales} vendas</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-sm text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="text-sm text-green-600 font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        </div>
        
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PDF Store
              </h1>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho ({cart.length})
              </button>
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white w-80 h-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setIsAdminMode(!isAdminMode);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrinho ({cart.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Sua Biblioteca Digital
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubra e-books premium sobre negócios, tecnologia, saúde e muito mais. 
            Download instantâneo após a compra!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Download Instantâneo
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Conteúdo Premium
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              +10.000 Clientes Satisfeitos
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Produtos em Destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.filter(p => p.featured).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Todos os Produtos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Todos os Produtos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal do Carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Carrinho de Compras</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-green-600 font-bold">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total: R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all font-semibold"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Finalizar Compra</h3>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all font-semibold"
              >
                Confirmar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Downloads (Produtos Comprados) */}
      {purchasedItems.length > 0 && (
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Seus Downloads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {purchasedItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">Comprado em: {item.purchaseDate}</p>
                  <button
                    onClick={() => {
                      // Simular download (em produção, seria um link real)
                      alert(`Baixando: ${item.title}`);
                      console.log(`Download do arquivo: ${item.title}`);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all font-semibold flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-blue-400 mr-3" />
            <h4 className="text-2xl font-bold">PDF Store</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Sua loja de produtos digitais premium. Downloads instantâneos e conteúdo de qualidade.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Suporte</a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-gray-400 text-sm">
            © 2024 PDF Store. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Modo Admin - Painel Simples */}
      {isAdminMode && (
        <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-6 max-w-sm z-40">
          <h4 className="font-bold mb-4">Painel Admin</h4>
          <p className="text-sm text-gray-600 mb-4">
            Para adicionar novos produtos, edite o array `initialProducts` no código fonte.
          </p>
          <div className="text-xs text-gray-500">
            <p>• Total de produtos: {products.length}</p>
            <p>• Vendas simuladas: {products.reduce((sum, p) => sum + p.sales, 0)}</p>
            <p>• Carrinho atual: {cart.length} itens</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
