// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  get,
  runTransaction,
  getDatabase,
  ref,
  onValue,
} from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// Initialize Firebase

class Firebase {
  constructor(firebaseConfig) {
    // use the config to initialize the firebase database instance
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    this.db = getDatabase(app);
  }
  getRef(path) {
    // this will get Ref of the URI
    return ref(this.db, path);
  }
  //https://firebase.google.cn/docs/database/web/read-and-write?hl=zh-cn

  async getPathValue(path) {
    return (await get(this.getRef(path))).val();
  }

  async checkoutValue(path) {
    // for check purposes only
    const pathRef = this.getRef(path);
    const pathVal = await this.getPathValue(path);
    // get() will return a value of the reference
    return {
      value: pathVal,
      // check if the value is null
      state: pathVal !== null,
      ref: pathRef,
    };
  }

  // async setValue(path, value) {
  //   // this will set a value in the specified path
  //   const pathRef = this.getRef(path);
  //   await set(pathRef, value);
  // }

  // async setValue(ref, value) {
  //   await set(ref, value);
  // }

  _tryToCheckOutArray(value) {
    return !!(Array.isArray(value) || value === "emptyArray");
  }

  _checkEmptyArray(toCheck) {
    if (this._tryToCheckOutArray(toCheck)) {
      // check pass
      return toCheck === "emptyArray";
    }
    // to check is not empty array or array
    throw new Error("toCheck is not empty array or array");
  }

  async updateValue(path, value, arrayPatch = false) {
    // value => db
    const pathRef = this.getRef(path);

    // check arrayPatch and value is fit to patch
    // 1. if arrayPatch is true , value is not array , then curD.push(value)
    // 2 if arrayPatch is true , value is an array , then merge values

    // NOTE ...
    // [1,2,3] + [1,2,3]
    // '1,2,31,2,3'
    await runTransaction(pathRef, (currentData) => {
      // check  want to set location to empty array
      // !! currentData initial data is null

      if (Array.isArray(value) && value.length === 0) {
        console.warn(
          "try to set location to empty array , now initialize empty array"
        );
        return "emptyArray";
      }
      if (!arrayPatch && Array.isArray(value) && value.length !== 0) {
        console.warn(
          "not using arrayPatch mode , this action will replace the entire array of db"
        );
        return [...value];
      }

      // value.length > 0
      if (arrayPatch && this._tryToCheckOutArray(currentData)) {
        // perform patch mode , current data  is "emptyArray" or [ ...]
        console.log(
          "☺: arrayPatch detected , server side data is an Array , happy to continue"
        );

        if (Array.isArray(value)) {
          return this._checkEmptyArray(currentData)
            ? [...value] // current data is empty array , then return the value array ( value array > 0)
            : [...value, ...currentData];
        }

        // value is just a element , but target db location is an array ,or mapped array
        if (!Array.isArray(value)) {
          return this._checkEmptyArray(currentData)
            ? [value]
            : [value, ...currentData];
        }
      }

      if (arrayPatch && !this._checkEmptyArray(currentData)) {
        // db side value is not an array , and patch mode set to true , cannot be merged
        throw new Error(
          `arrayPatch detected : Cannot patch ${path} to ${value} , db side value is not an array.😐`
        );
      }

      // just directly replace the current data
      console.warn("directly replace data to db ");
      return value;
    });
  }

  async startMonitoring(path, targetStoreRefs, storeKey) {
    // get the package of the path
    console.info(targetStoreRefs, storeKey);

    console.warn("startMonitoring 😀 : ", path);
    const pathRef = this.getRef(path);
    // https://firebase.google.com/docs/reference/js/database#onvalue
    return onValue(pathRef, (snapshot) => {
      // 1. toRaw change will keep the reactive
      // 2. obj['get'] will trigger the 'get'
      // 3. An onValue event will trigger once with the initial data stored at this location
      // 4. snapshot needs .val() to export its value
      // 5. each time , pathRef data change will call this callback
      console.warn("In the monitor 🙂 >> ", snapshot.val());
      // check db side initial value is empty Array
      if (this._tryToCheckOutArray(snapshot.val())) {
        // server side initial as  array
        // use .value to extract value
        targetStoreRefs.value[storeKey] = this._checkEmptyArray(snapshot.val())
          ? []
          : snapshot.val();
      }
      // just sync the normalized data
      targetStoreRefs.value[storeKey] = snapshot.val();
    });
  }

  stopMonitoring(monitor) {
    // receive a monitor to turn off the register
    // https://firebase.google.com/docs/reference/js/database.md#unsubscribe
    monitor();
  }
}

export default Firebase;
