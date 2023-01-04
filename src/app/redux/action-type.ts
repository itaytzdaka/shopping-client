export enum ActionType {
    //data from DB
    login,
    saveUser,
    setLoggedInStatus,
    saveProducts,
    saveCartsOfUser,
    saveInvitesOfUser,
    saveNumOfInvites,
    saveNumOfProducts,
    saveCartItems,
    saveCategories,
    saveCities,

    //calculated based of the data from DB
    loadUserCart,


    //save new data
    addNewCart,
    setOpenCart,
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