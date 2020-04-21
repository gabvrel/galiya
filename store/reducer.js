const globalReducer = (state, action) => {
    switch(action.type){
        case "audioOn":
            return console.log("audioOn")
        case "audioOff":
            return console.log("audioOff")
        default:
            return console.log("xd")
    }
};

export default globalReducer;