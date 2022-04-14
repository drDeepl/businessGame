import api from './api';

class UserService {
  // апи юзеров
  getUser(id){
    return api.get('/users/'+ id);
  }
  getUserList() {
    return api.get('/users?limit=100&offset=0');
  }
  deleteUser(id) {
    return api.delete('/users/' + id);
  }
  createUser(user) {
    return api.post('/users', {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      start_balance: user.start_balance,
      password: user.password
    });
  }
  updateUser(user) {
    return api.put('/users/' + user.id, { role: user.role });
  }
  getRoles() {
    return api.get('/roles')
  }

  // апи продуктов
  getPList() {
    return api.get('/products?limit=100&offset=0');
  }
  createP(p) {
    return api.post('/products', { name: p.name });
  }
  deleteP(id) {
    return api.delete('/products/' + id);
  }
  updateP(p) {
    return api.put('/products/' + p.id, { name: p.name });
  }

  // апи продуктовых наборов
  getPKList() {
    return api.get('/product-kits?limit=100&offset=0');
  }
  createPK(pk) {
    return api.post('/product-kits', { 
      count: pk.count,
      time: pk.time,
      product_id: pk.product
    });
  }
  deletePK(id) {
    return api.delete('/product-kits/' + id);
  }
  updatePK(pk) {
    return api.put('/product-kits/' + pk.id, { 
      count: pk.count,
      time: pk.time,
      product_id: pk.product
    });
  }
  
  // апи инвентаря
  getUserP(id) {
    return api.get('/store/products/list?user_id=' + id + '&limit=100&offset=0')
  }
  getUserPK(id){
    return api.get('/store/product-kits/list?user_id=' + id + '&limit=100&offset=0')
  }

  // апи магазина
  getSaleList() {
    return api.get('/offers/sale/list?limit=100&offset=0')
  }
  createSale(s) {
    return api.post('/offers/sale/place', {
      price: s.price,
      product_kit_id: s.product_kit_id 
    })
  }
  getPurchaseList() {
    return api.get('/offers/purchase/list?limit=100&offset=0')
  }
  createPurchase(p) {
    return api.post('/offers/purchase/place', {
      price: p.price,
      count: p.count,
      product_kit_id: p.product_kit_id 
    })
  }

  //апи транзакций
  getTList() {
    return api.get('/transactions?limit=100&offset=0')
  }

  //апи счетов
  getAccLict() {
    return api.get('/accounts?limit=100&offset=0')
  }
  getAccount(id) {
    return api.get('/accounts/' + id)
  }
  getAccTransactions(id){
    return api.get('/accounts/' + id + '/transactions?limit=100&offset=0')
  }
  accountEmit(id, amount) {
    return api.post('/accounts/emit', {
      account_id: id,
      amount: amount
    })
  }
  acсountAbsorb(id, amount) {
    return api.post('/accounts/absorb',{
      account_id: id,
      amount: amount
    })
  }
}

export default new UserService();
