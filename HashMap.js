import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = this.populateBucket(this.capacity);
  }

  populateBucket(capacity) {
    let bucket = [];
    for (let i = 0; i < capacity; i++) {
      let link = new LinkedList();
      bucket.push(link);
    }
    return bucket;
  }

  growBucket(capacity, loadFactor) {
    let copyArray;
    //length > since we are rounding off to smaller number
    if (this.length() >= Math.round(capacity * loadFactor)) {
      copyArray = this.bucket;
      this.capacity = capacity * 2; //double the bucket size when we need to grow bucket
      this.bucket = this.populateBucket(this.capacity);
      this.hashKeysAgain(copyArray);
    }
  }

  hashKeysAgain(copyArray) {
    for (const linkedlist of copyArray) {
      let current = linkedlist.head;
      while (current != null) {
        this.set(current.getkey(), current.getValue());
        current = current.nextNode;
      }
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31; //not divisible by even numbers so minimizes collisions
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity; //placing this inside the for loop avoids interger overflow for large keys
    }
    return hashCode;
  }

  set(key, value) {
    this.growBucket(this.capacity, this.loadFactor);
    let index = this.hash(key);
    this.outOfBoundError(index);
    let linkList = this.bucket[index];
    if (linkList.updateValue(key, value)) {
    } else {
      linkList.append(key, value);
    }
  }

  get(key) {
    let index = this.hash(key);
    this.outOfBoundError(index);
    let linkList = this.bucket[index];
    return linkList.getValue(key);
  }

  has(key) {
    let index = this.hash(key);
    this.outOfBoundError(index);
    let linkList = this.bucket[index];
    return linkList.contains(key);
  }

  remove(key) {
    let index = this.hash(key);
    this.outOfBoundError(index);
    let linkList = this.bucket[index];
    return linkList.remove(key);
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.bucket.length; i++) {
      let linkList = this.bucket[i];
      count += linkList.numOfNodes();
    }
    return count;
  }
  clear() {
    for (let i = 0; i < this.bucket.length; i++) {
      this.bucket[i].removeAll();
    }
  }
  keys() {
    let keys = [];
    for (let i = 0; i < this.bucket.length; i++) {
      keys.push(...this.bucket[i].getAllKeys());
    }
    return keys;
  }
  values() {
    let values = [];
    for (let i = 0; i < this.bucket.length; i++) {
      values.push(...this.bucket[i].getAllValues());
    }
    return values;
  }

  entries(bucket) {
    let entries = [];
    for (let i = 0; i < bucket.length; i++) {
      let linkedlist = bucket[i].getAllEntries();
      if (linkedlist != "") {
        entries.push(...linkedlist);
      }
    }
    return entries;
  }

  print() {
    for (let i = 0; i < this.bucket.length; i++) {
      console.log(`[${this.bucket[i].printLinkedList()}]\n`);
    }
  }

  outOfBoundError(index) {
    if (index < 0 || index >= this.bucket.length) {
      throw new Error("Trying to access index out of bounds");
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

console.log(test.length());
console.log(
  "num of entires when we need to grow bucket",
  Math.round(test.capacity * test.loadFactor),
);
test.set("lion", "lilac");
test.set("humongous", "magenta");
console.log(test.length());
test.print();

console.log("hey", test.keys());
//test.print();
