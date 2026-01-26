import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bs = this.bucketSize(this.capacity);
  }

  bucketSize(capacity) {
    let bs = [];
    for (let i = 0; i < capacity; i++) {
      let link = new LinkedList();
      bs.push(link);
    }
    return bs;
  }

  growBucket(capacity, loadFactor) {
    let copyArray;
    let numOfEntries = Math.round(capacity * loadFactor);
    if (numOfEntries == this.length()) {
      copyArray = this.bs;
      this.capacity = capacity * 2;
      this.bs = this.bucketSize(this.capacity);
      for (let i = 0; i < copyArray.length; i++) {
        this.passKeysToHash(copyArray);
        let linklist = copyArray[i];
        this.bs[i] = copyArray[i];
      }
      //this.bs = this.bucketSize(capacity * 2);
    }
    //console.log(copyArray[1].toString());
  }

  passKeysToHash(copyArray) {
    let allEntries = getAllEntries(copyArray);
    console.log(allEntries);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    //hashCode = hashCode % this.bs.length;
    return hashCode;
  }

  set(key, value) {
    let linkList = this.bs[this.hash(key)];
    if (linkList.updateValue(key, value)) {
    } else {
      linkList.append(key, value);
    }
  }

  get(key) {
    let linkList = this.bs[this.hash(key)];
    return linkList.getValue(key);
  }

  has(key) {
    let linkList = this.bs[this.hash(key)];
    linkList.contains(key);
  }

  remove(key) {
    let linkList = this.bs[this.hash(key)];
    linkList.remove(key);
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.bs.length; i++) {
      let linkList = this.bs[i];
      count += linkList.size();
    }
    return count;
  }
  clear() {
    for (let i = 0; i < this.bs.length; i++) {
      this.bs[i].removeAll();
    }
  }
  keys() {
    let keys = [];
    for (let i = 0; i < this.bs.length; i++) {
      keys.push(...this.bs[i].getAllKeys());
    }
    return keys;
  }
  values() {
    let values = [];
    for (let i = 0; i < this.bs.length; i++) {
      values.push(...this.bs[i].getAllValues());
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i < this.bs.length; i++) {
      let linkedlist = this.bs[i].getAllEntries();
      if (linkedlist.head != null) {
        entries.push(...linkedlist);
      }
    }
    return entries;
  }

  print() {
    for (let i = 0; i < this.bs.length; i++) {
      console.log(`[${this.bs[i].toString()}]\n`);
    }
  }
}

let test = new HashMap(0.75, 16);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.print();
//console.log(test.bs);

console.log(test.length());
test.growBucket(test.capacity, test.loadFactor);
test.print();
