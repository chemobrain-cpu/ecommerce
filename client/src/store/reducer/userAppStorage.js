import { SIGNUP_USER, LOGIN_USER, CART, EMPTY_CART, SHIPP_INFO, ORDER_MADE, ORDERS, SIGNOUT /*LOG_USER_IN*/, PRODUCTS, USER, USERS, NOTIFICATIONS, COMMENTS, COMMENT, COMMENTREPLY, DELETECOMMENT, DELETEREPLYCOMMENT,SEARCH,READNOTIFICATION,LOGUSERIN} from "../action/userAppStorage";


const initialState = {
    token: "",
    expiresIn: "",
    user: null,
    cart: {
        cartItems: [],
        totalAmount: 0,
        no: 0
    },
    order: [],
    products: [],
    orderId: "",
    orders: [],
    users: [],
    admins:[],
    notifications: [],
    comments: [],
    searchedProducts:[],
    amounSpent:0

}


export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER:
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                    notifications:action.payload.user?action.payload.user.notifications:[], 
                    users:action.payload.users,
                    admins:action.payload.admins
                    //product and orders
                    
                }
            }
            break;
        case LOGIN_USER:
            return {
                ...state,
                token: action.payload.token,
                expiresIn: action.payload.expiresIn,
                user: action.payload.user,
                notifications:action.payload.user?action.payload.user.notifications:[],
                users:action.payload.users,
                admins:action.payload.admins
                //product and orders

            }

            break;

//initial authentication from session storage
        case LOGUSERIN:
            return {
                ...state,
                token: action.payload.token,
                expiresIn: action.payload.expiresIn,
                user: action.payload.user,
                notifications:action.payload.user?action.payload.user.notifications:[],
                users:action.payload.users,
                admins:action.payload.admins

            }

            break;
        case PRODUCTS:
            if (action.payload) {
                return {
                    ...state,
                    products: [...action.payload]
                }
            }
            break;
        case CART:
            if (action.payload) {
                return {
                    ...state,
                    cart: action.payload
                }
            }
            break;

        case EMPTY_CART:
            if (action.payload) {
                return {
                    ...state,
                    cart:{...state.cart,cartItems: [],
                        totalAmount: 0,
                        no: 0},
                }
            }
            break;
        case SHIPP_INFO:
            if (action.payload) {
                return {
                    ...state,
                    order: [action.payload],
                    orderId: action.payload.id
                }
            }
            break;
        case ORDER_MADE:
            if (action.payload) {
                return {
                    ...state,
                    orders: [...state.orders, action.payload]
                }
            }
            break;
        case ORDERS:
            if (action.payload) {
              
                return {
                    ...state,
                    orders: [...state.orders, ...action.payload.orders],
                    amounSpent:action.payload.totalAmount
                }
            }
            break;
        case SIGNOUT:
            if (action.payload) {
                return {
                    token: "",
                    expiresIn: "",
                    user: null,
                    cart: {
                        cartItems: [],
                        totalAmount: 0,
                        no: 0
                    },
                    order: [],
                    products: [],
                    orderId: "",
                    orders: []
                }
            }

        case USER:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload,
                    //product and orders
                }
            }
            break;
        case USERS:
            if (action.payload) {
                return {
                    ...state,
                    users: action.payload,
                }
            }
            break;
        case NOTIFICATIONS:
            if (action.payload) {
                return {
                    ...state,
                    user:action.payload,
                }
            }
            break;
        case COMMENTS:
            if (action.payload) {
                
                return {
                    ...state,
                    comments: [...action.payload]
                }

            }
            

            break
        case COMMENT:
            if (action.payload) {
                //checking if the object to add already exist
                if (state.comments.length === 0) {
                    return {
                        ...state,
                        comments: [...state.comments, action.payload]
                    }

                }
                let commentExist = state.comments.find(data => data._id.toString() === action.payload._id.toString())

                if (!commentExist) {
                    return {
                        ...state,
                        comments: [...state.comments, action.payload]
                    }

                }






            }

            break
        case COMMENTREPLY:
            if (action.payload) {
                //checking if the object to add already exist
                if (state.comments.length === 0) {
                    return state
                }
                //find the comment this reply belongs to
                let commentExist = state.comments.find(data => data._id.toString() === action.payload._id.toString())
                if (!commentExist) {
                    return state
                }
                //spread the comments replies
                let arrRes = []
                for (let mem of state.comments) {
                    if (mem._id.toString() === action.payload._id) {
                        arrRes.push(action.payload)
                    } else {
                        arrRes.push(mem)
                    }
                }
                return {
                    ...state,
                    comments: arrRes
                }
            }
        case DELETECOMMENT:
            if (action.payload) {
                let comments = state.comments
                let filteredComments = []
                for (let mem of comments) {
                    if (mem._id.toString() !== action.payload.toString()) {
                        filteredComments.push(mem)
                    }
                }
                return {
                    ...state,
                    comments: filteredComments
                }
            }
            break
        case DELETEREPLYCOMMENT:
            if (action.payload) {
                //algorithm
                let mainComment = state.comments.find(data => data._id.toString() === action.payload.mainCommentId)
                if (!mainComment) {
                    return state
                }
                let filteredReplies = []
                for (let mem of mainComment.replies) {
                    if (mem._id.toString() !== action.payload.replyCommentId) {
                        filteredReplies.push(mem)
                    }
                }
                mainComment.replies = filteredReplies
                //filter all coment to replace this one

                let filteredComment = []
                for (let mem of state.comments) {
                    if (mem._id.toString() !== mainComment._id.toString()) {
                        filteredComment.push(mem)
                    } else {
                        filteredComment.push(mainComment)

                    }
                }
                return {
                    ...state,
                    comments: filteredComment
                }
            }
        case SEARCH:
            if(action.type){
                
                return {
                    ...state,
                    searchedProducts:action.payload
                }
            }
        case READNOTIFICATION:
            if(action.type){
                return {
                    ...state,
                    notifications:action.payload.notifications
                }
            }

        default:
            return state
            break;
    }
 
}

