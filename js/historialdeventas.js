var products = [
    {id: 1, nrofactura: '23', fecha: '11/1/2022', nombre: 'Juan Valdez', subscrito: 'Si', monto: '$10.000', estado: 'Entregado'},
    {id: 1, nrofactura: '24', fecha: '04/6/2022', nombre: 'Sebastian Neira', subscrito: 'No', monto: '$23.600', estado: 'Despachado'},
    {id: 1, nrofactura: '55', fecha: '09/8/2022', nombre: 'Augusto Allende', subscrito: 'Si', monto: '$55.000', estado: 'En Bodega'},
    {id: 1, nrofactura: '67', fecha: '20/2/2022', nombre: 'Jimmy Neutron', subscrito: 'Si', monto: '$90.000', estado: 'Entregado'},
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
          nrofactura: product.nrofactura,
          fecha: product.fecha,
          nombre: product.nombre,
          subscrito: product.subscrito,
          monto: product.monto,
          estado: product.estado
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
      return {product: {nrofactura: '', fecha: '', nombre: '', subscrito: '', monto: '', estado: ''}}
    },
    methods: {
      createProduct: function() {
        var product = this.product;
        products.push({
          id: Math.random().toString().split('.')[1],
          nrofactura: product.nrofactura,
          fecha: product.fecha,
          nombre: product.nombre,
          subscrito: product.subscrito,
          monto: product.monto,
          estado: product.estado
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