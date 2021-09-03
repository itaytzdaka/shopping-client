export enum ActionType {
    //data from DB
    login,
    saveProducts,
    saveCarts,
    saveInvites,
    saveNumOfInvites,
    saveNumOfProducts,
    saveCartItems,
    saveCategories,
    saveCities,

    //calculated based of the data from DB
    loadUserCart,


    //save new data
    addNewCart,
    addNewProduct,
    addNewInvite,
    saveNewUser,
    addNewCartItem,

    //delete data
    deleteCartItem,
    deleteAllCartItems,

    //functions
    changeMenuStatus,
    saveSelectedProduct,
    disconnect

}