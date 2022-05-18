var products = [
    {id: 1, id: '44', categoria: 'Perros', nombre: 'Hueso para perro', monto: '$10.000', descuentosub: '%0', descuentoofer: '%3', preciofinal: '$9700'},
  ];
  
  function findProduct (productId) {
    return products[findProductKey(productId)];
  };
  
  function findProductKey (productId) {
    for (var key = 0; key < products.length; key++) {
      if (products[key].id == productId) {
        return key;
      }
    }
  };
  
  var List = Vue.extend({
    template: '#product-list',
    data: function () {
      return {products: products, searchKey: ''};
    },
    computed: {
      filteredProducts: function () {
        return this.products.filter(function (product) {
          return this.searchKey=='' || product.name.indexOf(this.searchKey) !== -1;
        },this);
      }
    }
  });
  
  var Product = Vue.extend({
    template: '#product',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    }
  });
  
  var ProductEdit = Vue.extend({
    template: '#product-edit',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    },
    methods: {
      updateProduct: function () {
        var product = this.product;
        products[findProductKey(product.id)] = {
          id: product.id,
          categoria: product.categoria,
          nombre: product.nombre,
          monto: product.monto,
          descuentosub: product.descuentosub,
          descuentoofer: product.descuentoofer,
          preciofinal: product.preciofinal
        };
        router.push('/');
      }
    }
  });
  
  var ProductDelete = Vue.extend({
    template: '#product-delete',
    data: function () {
      return {product: findProduct(this.$route.params.product_id)};
    },
    methods: {
      deleteProduct: function () {
        products.splice(findProductKey(this.$route.params.product_id), 1);
        router.push('/');
      }
    }
  });
  
  var AddProduct = Vue.extend({
    template: '#add-product',
    data: function () {
      return {product: {id: '', categoria: '', nombre: '', monto: '', descuentosub: '', descuentoofer: '', preciofinal: ''}}
    },
    methods: {
      createProduct: function() {
        var product = this.product;
        products.push({
          id: Math.random().toString().split('.')[1],
          id: product.id,
          categoria: product.categoria,
          nombre: product.nombre,
          monto: product.monto,
          descuentosub: product.descuentosub,
          descuentoofer: product.descuentoofer,
          preciofinal: product.preciofinal
        });
        router.push('/');
      }
    }
  });
  
  var router = new VueRouter({routes:[
    { path: '/', component: List},
    { path: '/product/:product_id', component: Product, name: 'product'},
    { path: '/add-product', component: AddProduct},
    { path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
    { path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
  ]});
  app = new Vue({
    router:router
  }).$mount('#app')