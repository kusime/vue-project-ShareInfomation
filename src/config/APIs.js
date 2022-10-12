// really need to have a separate file to manage the backend  interact...
import Firebase from "./firebase.js";
import globalState from "../store/global.js";
import { storeToRefs } from "pinia";

const firebaseConfig = {
  apiKey: "AIzaSyAbd9zSbg8PPG0bUVz_JGoSHSAi39oSk9s",
  authDomain: "share-information-3301d.firebaseapp.com",
  // databaseURL: "https://share-information-3301d-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL: "http://localhost:9000/?ns=share-information-3301d",
  projectId: "share-information-3301d",
  storageBucket: "share-information-3301d.appspot.com",
  messagingSenderId: "197751535480",
  appId: "1:197751535480:web:070ad19dea86850544ba8d",
  measurementId: "G-P94S3DJ48D",
};
// export the PATH to keep the router can dynamic change
export const PATH = {
  BASE_URI: "share-information",
  GLOBAL_POSTS: "globalPosts",
  MY_POSTS: "myPosts",
  REG_CHECKOUT: (username) => [PATH.BASE_URI, username].join("/"),
  LOGIN_REGISTER_PATH: (username, password) =>
    [PATH.BASE_URI, username, password].join("/"),
  GLOBAL_POSTS_LOCATION: () => [PATH.BASE_URI, PATH.GLOBAL_POSTS].join("/"),
  MY_POSTS_LOCATION: (username, password) =>
    [PATH.BASE_URI, username, password].join("/"),
};

const db = new Firebase(firebaseConfig);

const APIs = {
  async handlerGlobalPosting(username, password) {
    // this is a function to determine whether to make an initialized
    const globalPostsChk = await db.checkoutValue(
      PATH.GLOBAL_POSTS_LOCATION(username, password)
    );
    if (!globalPostsChk.state) {
      // not initialized globalPosts
      await db.updateValue(
        PATH.GLOBAL_POSTS_LOCATION(username, password),
        [],
        false
      );
    }
    // already initialized globalPosts
  },

  // register
  async register(username, password) {
    // check register ,is already registered
    const haveRecord = await db.checkoutValue(PATH.REG_CHECKOUT(username));
    if (haveRecord.state) {
      // already registered
      return false;
    }
    // 1. make initial my post as empty array
    await db.updateValue(PATH.MY_POSTS_LOCATION(username, password), []);
    await this.handlerGlobalPosting(username, password);
    return true;
  },

  async login(username, password) {
    // const global = globalState();
    // this APIs will not check the username and password
    const loginCheckOutPath = PATH.LOGIN_REGISTER_PATH(username, password);
    return !!(await db.getPathValue(loginCheckOutPath));
  },

  async addPostingToGlobal(username, password, posting) {
    const postingPath = PATH.GLOBAL_POSTS_LOCATION(username, password);
    return await db.updateValue(postingPath, posting, true);
  },
  async addPostingToMy(username, password, posting) {
    const postingPath = PATH.MY_POSTS_LOCATION(username, password);
    return await db.updateValue(postingPath, posting, true);
  },
  async registerGlobalPostingMonitor(username, password) {
    const { posts } = storeToRefs(globalState());
    const postingPath = PATH.GLOBAL_POSTS_LOCATION(username, password);
    return await db.startMonitoring(postingPath, posts, PATH.GLOBAL_POSTS);
  },
  // register myPosts monitor
  async registerMyPostsMonitor(username, password) {
    const { posts } = storeToRefs(globalState());
    const postingPath = PATH.MY_POSTS_LOCATION(username, password);
    return await db.startMonitoring(postingPath, posts, PATH.MY_POSTS);
  },
  // unregisterMonitors
  unregisterMonitors(monitor) {
    return db.stopMonitoring(monitor);
  },
};

export default APIs;
