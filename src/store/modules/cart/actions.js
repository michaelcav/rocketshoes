// todas as Requests são ouvidas pelo saga. dps de ouvida o saga vai desperar uma acction chamando a Sucess

export function addToCartRequest(id) {
    return { type: '@cart/ADD_REQUEST', id };
  }
  
  export function addToCartSuccess(product) {
    return { type: '@cart/ADD_SUCCESS', product };
  }
  
  export function removeFromCart(id) {
    return { type: '@cart/REMOVE', id };
  }
  
  export function updateAmountRequest(id, amount) {
    return { type: '@cart/UPDATE_AMOUNT_REQUEST', id, amount };
  }
  
  export function updateAmountSuccess(id, amount) {
    return { type: '@cart/UPDATE_AMOUNT_SUCCESS', id, amount };
  }