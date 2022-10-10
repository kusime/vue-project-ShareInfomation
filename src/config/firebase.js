// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  set,
  get,
  runTransaction,
  getDatabase,
  ref,
  onValue,
} from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase

class Firebase {
  constructor(BASE_URI, firebaseConfig) {
    // use the config to initialize the firebase database instance
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    this.BASE_URI = BASE_URI;
    this.db = getDatabase(app);
  }
  getRef(isDB = false, URI) {
    console.log(URI);
    return isDB ? ref(this.db) : ref(this.db, URI);
  }
  //https://firebase.google.cn/docs/database/web/read-and-write?hl=zh-cn

  async updateValue(ref, value) {
    await runTransaction(ref, (rawValue) => {
      console.log("runTransaction:", rawValue);
      if (rawValue === null) {
        return value;
      }
      return rawValue;
    });
  }

  async setValue(ref, value) {
    await set(ref, value);
  }

  async checkoutValue(path) {
    // this will also mine a field
    // will return value , value state , ref
    const targetRef = this.getRef(false, this.BASE_URI + path);
    return {
      value: (await get(targetRef)).val(),
      state: (await get(targetRef)).val() !== null,
      ref: targetRef,
    };
  }

  async startMonitoring(path, target) {
    // get the package of the path
    console.log("startMonitoring:", path);

    const chkBundle = await this.checkoutValue(path);
    // return the monitor
    // https://firebase.google.com/docs/reference/js/database#onvalue
    return onValue(chkBundle.ref, (snapshot) => {
      if (snapshot) {
        target = snapshot.val(); // use val to extra the value
        return true;
      }
      return false;
    });
  }

  stopMonitoring(monitorOff) {
    // receive a monitor to turn off the register
    // https://firebase.google.com/docs/reference/js/database.md#unsubscribe
    //
    monitorOff();
  }
}

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

const db = new Firebase("share-information/", firebaseConfig);
// make a global data array
const globalPostBundler = await db.checkoutValue("GlobalPost");
await db.setValue(globalPostBundler.ref, "ArrayInit");

// not export the class ,in-case multiple initialize
export default db; // export the db
