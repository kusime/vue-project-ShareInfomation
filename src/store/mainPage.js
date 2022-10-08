import {defineStore} from "pinia";

const navState = defineStore('navState',{
    state(){
        return {
            navTabs:[
                ['MessageList','/listing'],
                ['Posting','/posting'],
                ['Login','/login'],
                ['Register','/register'],
            ]
        }
    },
    getters:{
        navUnits(state){
            // console.log(state.navTabs);
            return state.navTabs.map((tabs)=> {
                return {
                    navTitle:tabs[0],
                    navRoute:tabs[1]
                }
            })
        }
    },
    actions:{

    }
})
export default navState