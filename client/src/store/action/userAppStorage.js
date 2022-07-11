import IO from 'socket.io-client'
export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = "LOGIN_USER";
export const CART = "CART";
export const EMPTY_CART = "EMPTY_CART"
export const SHIPP_INFO = "SHIPP_INFO"
export const ORDER_MADE = "ORDER_MADE"
export const ORDERS = "ORDERS"
export const SIGNOUT = "SIGNOUT"
export const PRODUCTS = "PRODUCTS";
export const ORDER = "ORDER"
export const USER = "USER"
export const USERS = "USERS"
export const NOTIFICATIONS = "NOTIFICATIONS"
export const COMMENTS = "COMMENTS"
export const COMMENT = "COMMENT"
export const COMMENTREPLY = "COMMENTREPLY"
export const DELETECOMMENT = "DELETECOMMENT"
export const SEARCH = "SEARCH"
export const READNOTIFICATION = "READNOTIFICATION"
export const DELETEREPLYCOMMENT = "DELETEREPLYCOMMENT"
export const LOGUSERIN = "LOGUSERIN"
/* Admin actions*/

let socket = IO(`http://${window.location.hostname}:8080`)
let timer
//utility function for calculating if token expires
let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  
  const currentTime =new Date().getMilliseconds()

  //getting expiration time in milliseconds
  const adjustExpirationTime =  (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime

  return timeLeft
}
let retrievedStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('token')

  let expiryDate = localStorage.getItem('expiry')

  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {

    localStorage.removeItem('token')
    localStorage.removeItem('expiry')
    localStorage.removeItem('user')

    return {
      token: "",
      expiresIn: ""
    }
  }
  return {
    token: tokenFromStorage,
    expiresIn: timeLeft


  }

}
export const checkIfIsLoggedIn = () => {
  return async (dispatch, getState) => {
   try{
    let response
    //check if token is expired

    let { token, expiresIn } = retrievedStoredToken()

    if (!token) {
      return
    }

  //convert expiresIN backt to hours
    expiresIn = expiresIn/(60 * 60 * 1000)

    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiry', expiresIn)

    let user = JSON.parse(localStorage.getItem('user'))
    if(!user){
      return
    }
    if(user.admin){
      response = await fetch(`https://shielded-plateau-98818.herokuapp.com//adminByToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "header": `${token}`
      }
    })

    }else{
      response = await fetch(`https://shielded-plateau-98818.herokuapp.com//userByToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "header": `${token}`
      }
    })

    }
    if(response.status == 200){
      let data = await  response.json()
      data.response.token = token
      data.response.expiresIn = expiresIn
      dispatch({type:LOGUSERIN,payload:data.response})
    }
    

    

   }catch(err){
     console.log(err)

   } 

  }
}
export const dispatchNotification = (data) => {
  return async (dispatch, getState) => {
    socket.on("notifications", (data) => {
      console.log(data)
      dispatch({ action: NOTIFICATIONS, payload: data.notification })
    })
  }
}
export const adminsignup = (data) => {
  return async (dispatch, getState) => {

    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//adminSignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: SIGNUP_USER, payload: data })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const adminlogin = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//adminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

       
        localStorage.setItem("token", data.response.token)
        localStorage.setItem("expiry", data.response.expiresIn)
        localStorage.setItem("user", JSON.stringify(data.response.user))

        dispatch({ type: LOGIN_USER, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const addProduct = (data) => {
  let formData = new FormData()
  formData.append("photo", data.productPhoto)

  formData.append("productCategory", data.productCategory)
  formData.append("productSubCategory", data.productSubCategory)
  formData.append("productAmount", data.productAmount)
  formData.append("ProductName", data.ProductName)
  formData.append("negotiable", data.negotiable)
  formData.append("about", data.aboutProduct)


  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//addProduct`, {
        method: "POST",
        body: formData,
        headers: {
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: PRODUCTS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const delProduct = (productId) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let { token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: PRODUCTS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}
export const editProduct = (data) => {
  let formData = new FormData()
  formData.append("photo", data.productPhoto)
  formData.append("productCategory", data.productCategory)
  formData.append("productSubCategory", data.productSubCategory)
  formData.append("productAmount", data.productAmount)
  formData.append("ProductName", data.ProductName)
  formData.append("negotiable", data.negotiable)
  formData.append("about", data.aboutProduct)
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    const { id } = data
    let { token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//editProduct/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: PRODUCTS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const getAdmin = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let { token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }
}

export const modifyAdmin = (data) => {
  let formData = new FormData()
  formData.append("username", data.username)
  formData.append("country", data.country)
  formData.append("state", data.state)
  formData.append("photo", data.photo)
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//admin`, {
        method: "PATCH",
        body: formData,
        headers: {
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: USER, payload: data })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }

  }

}
export const getAdminOrders = () => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//adminorders`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      }
      )
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ORDERS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
export const getAdminOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { products, token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//adminorder/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let foundOrder = await response.json()
        //let foundOrder = orders.find(data => data._id.toString() == id)

        let productsInOrder = foundOrder.products
        let formatProducts = productsInOrder.map(data => {
          for (let product of products) {
            if (product._id == data.product) {
              return {
                ...data,
                product: product,

              }
            }
          }
        })
        foundOrder.products = formatProducts

        dispatch({ type: ORDER, payload: foundOrder })

        return {
          bool: true,
          message: foundOrder
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
export const adminActivateOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { products, token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//activateorder/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let foundOrder = await response.json()
        //let foundOrder = orders.find(data => data._id.toString() == id)

        let productsInOrder = foundOrder.products
        let formatProducts = productsInOrder.map(data => {
          for (let product of products) {
            if (product._id === data.product) {
              return {
                ...data,
                product: product,

              }
            }
          }
        })
        foundOrder.products = formatProducts

        dispatch({ type: ORDER, payload: foundOrder })

        return {
          bool: true,
          message: foundOrder
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
      let { products, token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//users`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let users = await response.json()

        dispatch({ type: USERS, payload: users })

        return {
          bool: true,
          message: users
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
/* User actions*/
export const signup = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: SIGNUP_USER, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

export const login = (data) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        //persisting data to local storage

        localStorage.setItem("token", data.response.token)
        localStorage.setItem("expiry", data.response.expiresIn)
        localStorage.setItem("user", JSON.stringify(data.response.user))

        dispatch({ type: LOGIN_USER, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }
  }
}
export const addCart = (id) => {
  return async (dispatch, getState) => {
    try {
      let { cart, products } = getState().userAuth

      let fullProduct = products.find((data) => {
        if (data._id.toString() === id) {
          return data
        }
      })
      //check if product is in cart
      let foundProduct = cart.cartItems.find(data => {
        if (data.product._id.toString() === id) {
          return data
        }
      })
      if (!foundProduct) {
        let newCartItem = {
          product: fullProduct,
          no: 1,
          amount: Number(fullProduct.amount)
        }
        //pushing the new item to cart
        cart.cartItems.push(newCartItem)
        cart.no = cart.no + 1
        cart.totalAmount = Number(cart.totalAmount) + Number(fullProduct.amount)
        dispatch({ type: CART, payload: cart })

        return {
          bool: true,
          message: "added to cart"
        }
      }
      let newCartItems = cart.cartItems.map(data => {
        if (data.product._id === fullProduct._id) {
          data.no = Number(data.no) + 1
          data.amount = Number(data.amount) + Number(fullProduct.amount)
        }
        return data
      })
      cart.cartItems = newCartItems

      cart.totalAmount = Number(cart.totalAmount) + Number(fullProduct.amount)
      cart.no = cart.no + 1
      dispatch({ type: CART, payload: cart })
      return {
        bool: true,
        message: "added to cart"
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }


}
export const emptyCart = (id) => {
  return async (dispatch, getState) => {

    try {

      dispatch({
        type: EMPTY_CART, payload: {
          cartItems: [],
          totalAmount: 0,
          no: 0
        },
      })

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }


}
export const incrementCartItem = (id) => {
  return async (dispatch, getState) => {
    let { cart, } = getState().userAuth
    let foundProduct = cart.cartItems.find(data => {
      if (data.product._id.toString() === id) {
        return data
      }
    })
    foundProduct.no = Number(foundProduct.no) + 1
    foundProduct.amount = Number(foundProduct.amount) + Number(Number(foundProduct.product.amount))
    cart.totalAmount = Number(cart.totalAmount) + (Number(foundProduct.product.amount))
    cart.no += 1
    let newCartItems = cart.cartItems.map(data => {
      if (data.product._id === foundProduct.product._id) {
        return foundProduct
      }
      return data
    })

    cart.cartItems = newCartItems
    console.log(cart)
    dispatch({ type: CART, payload: cart })

  }
}
export const decrementCartItem = (id) => {

  return async (dispatch, getState) => {

    let { cart } = getState().userAuth
    let foundProduct = cart.cartItems.find(data => {
      if (data.product._id.toString() === id) {
        return data
      }
    })
    foundProduct.no = Number(foundProduct.no) - 1
    foundProduct.amount = Number(foundProduct.amount) - Number(Number(foundProduct.product.amount))
    cart.totalAmount = Number(cart.totalAmount) - (Number(foundProduct.product.amount))
    cart.no -= 1
    let emptyArr = []
    cart.cartItems.map(data => {
      if ((data.product._id === foundProduct.product._id) && (foundProduct.no > 0)) {
        emptyArr.push(foundProduct)

      } else if ((foundProduct.no <= 0) && (data.product._id === foundProduct.product._id)) {
        return

      } else {
        emptyArr.push(data)


      }

    })

    cart.cartItems = emptyArr
    if (cart.no <= 0) {
      return dispatch({ type: EMPTY_CART, payload: cart })
    }
    dispatch({ type: CART, payload: cart })

  }


}
export const shipp = (shippDetails) => {
  return async (dispatch, getState) => {
    let { cart } = getState().userAuth
    let orderId = Math.random().toString()
    let order = {
      //install uuid to use
      id: orderId,
      cart: cart,
      shippingAddress: {
        firstName: shippDetails.firstName,
        lastName: shippDetails.lastName,
        address: shippDetails.address,
        country: shippDetails.country,
        city: shippDetails.city,
        state: shippDetails.state,
        phoneNumber: shippDetails.phoneNumber

      },
      cardInfo: {
        cardNumbeer: "",
        cvv: "",
        expiry: ""
      }
    }
    dispatch({
      type: SHIPP_INFO, payload: order,
    })

  }
}
export const makePayment = (card) => {

  return async (dispatch, getState) => {
    try {
      const { cardNumber,
        cvvNumber,
        expiryDate } = card
      //get the order
      let { order, orderId, token } = getState().userAuth
      let foundOrder = order.find(data => data.id === orderId
      )
      foundOrder.cardInfo.cardNumbeer = cardNumber
      foundOrder.cardInfo.cvv = cvvNumber
      foundOrder.cardInfo.expiry = expiryDate
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(foundOrder)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ORDER_MADE, payload: data.response })
        dispatch({ type: EMPTY_CART, payload: [] })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }
}
export const getUser = () => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      let { token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//user`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        console.log(data)
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const modifyUser = (data) => {
  let formData = new FormData()
  formData.append("username", data.username)
  formData.append("country", data.country)
  formData.append("state", data.state)
  formData.append("photo", data.photo)
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch

    let { token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//user`, {
        method: "PATCH",
        body: formData,
        headers: {
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: USER, payload: data })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }

  }

}

export const mainComment = (data) => {
  return async (dispatch, getState) => {
    let { user } = getState().userAuth
    //if user is null here,throw an error that triggers auth screen
    if (!user) {
      return;
    }
    try {
      socket.emit("sendMainComment", { data, user })

      socket.on('comment', data => {
        dispatch({ type: COMMENT, payload: data })
      })
      socket.on("error", (data) => {
        alert(data)
      })
      socket.on("notifications", (data) => {
        alert("sucessful")
        // data =  { notification, adminInProductNotify, usersInProductNotify, isAdmin: true }
        console.log(data)
        //algorithm for pushing the notification to the current user notification field

        /*--check if i am an admin
             if yes,push the notification to stack
         --if not an admin
             push notification to stack
         */
        dispatch({ type: NOTIFICATIONS, payload: data.user })




      })

    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }


}
export const replyComment = (data) => {
  return async (dispatch, getState) => {
    //if user is null here,throw an error that triggers auth screen

    if (!data.comment) {
      return;
    }

    try {
      socket.emit("sendReplyComment", data)
      socket.on("replyResult", (commentReply) => {
        console.log(commentReply)
        //update redux store
        dispatch({ type: COMMENTREPLY, payload: commentReply })

      })
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}
export const deleteComment = (data) => {
  return async (dispatch, getState) => {
    let { user } = getState().userAuth
    data.user = user
    let commentId = data.commentId
    socket.emit("deleteComment", data)
    //error in socket
    socket.on("error", (data) => {
      alert(data)
    })
    socket.on("deletedComment", () => {
      //what to do next
      //go to the state comments
      //go through and remove the specifoc comment
      dispatch({ type: DELETECOMMENT, payload: commentId })
    })
  }
}
export const deleteReplyComment = (data) => {
  return async (dispatch, getState) => {
    socket.emit("deleteReplyComment", data)
    //error in socket
    socket.on("error", (data) => {
      alert(data)
    })
    socket.on("deleteReplyCommentSucess", (mainCommentId) => {
      let deleteInfo = {
        mainCommentId,
        replyCommentId: data.replyCommentId
      }
      dispatch({ type: DELETEREPLYCOMMENT, payload: deleteInfo })
    })
  }
}


/* we will need get users */


export const getProducts = () => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    let { token } = getState().userAuth
    try {
      const response = await fetch("https://shielded-plateau-98818.herokuapp.com//products", {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        console.log(data.response.products)
        dispatch({ type: PRODUCTS, payload: data.response.products })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response.products
        }

      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}
export const getProductsCategory = (category) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch

    let { products, token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//products/${category}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        }
      })
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: PRODUCTS, payload: data.response.products })

        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response.products
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}
export const getProduct = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//product/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}

export const getProductComment = (id) => {
  return async (dispatch, getState) => {
    //do some check on the server if its actually login before proceding to dispatch
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//comment/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }

  }

}

export const loadComments = (data) => {
  return async (dispatch, getState) => {
    dispatch({ type: COMMENTS, payload: data })
  }
}

export const search = (data) => {
  return async (dispatch, getState) => {
    let { products, user } = getState().userAuth

    let regex = new RegExp(data, "g")

    let filteredArr = []
    for (let mem of products) {
      if (mem.NameOfProduct.match(regex)) {
        filteredArr.push(mem)
      } else if (mem.category.match(regex)) {
        filteredArr.push(mem)
      }
    }
    dispatch({ type: SEARCH, payload: filteredArr })
    if (user && user.admin) {
      return {
        admin: true
      }
    } else {
      return {
        admin: false

      }

    }

  }
}
/* General actions*/
export const signout = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SIGNOUT, payload: [] })
  }

}
export const readNotification = (data) => {
  return async (dispatch, getState) => {
    //change the status of the given notification in the user field
    let { token } = getState().userAuth
    try {
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//notification`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
        body: JSON.stringify(data)
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 400) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({ type: READNOTIFICATION, payload: data })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }
    }
  }

}

//order actions
//get order
//get orders
//getUserOrder
//getUserOrders

export const getOrders = () => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//orders`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      }
      )
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ORDERS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
export const getUserOrders = (id) => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { token } = getState().userAuth


      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//userorders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      }
      )
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let data = await response.json()
        dispatch({ type: ORDERS, payload: data.response })
        return {
          bool: true,
          //data here refers to user and dispatch
          message: data.response
        }
      }
    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}
export const getOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      //get the order
      let { products, token } = getState().userAuth
      const response = await fetch(`https://shielded-plateau-98818.herokuapp.com//order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "header": `${token}`
        },
      })
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response
        }
      }
      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "admin"
        }
      }
      if (response.status === 302) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          action: true,
          status: "user"
        }
      }
      if (response.status === 200) {
        let foundOrder = await response.json()
        //let foundOrder = orders.find(data => data._id.toString() == id)

        let productsInOrder = foundOrder.products
        let formatProducts = productsInOrder.map(data => {
          for (let product of products) {
            if (product._id === data.product) {
              return {
                ...data,
                product: product,

              }
            }
          }
        })
        foundOrder.products = formatProducts

        dispatch({ type: ORDER, payload: foundOrder })

        return {
          bool: true,
          message: foundOrder
        }
      }

    } catch (err) {
      console.log(err)
      return {
        bool: false,
        message: "network error"
      }

    }
  }

}




