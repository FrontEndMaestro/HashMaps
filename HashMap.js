class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bs = this.bucketSize(this.capacity);
  }

  bucketSize(capacity) {
    let bs = [];
    for (let i = 0; i < capacity; i++) {
      bs.push([]);
    }
    return bs;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    hashCode=hashCode % this.bs.length
    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    for (element of this.bs) {
      if (element.key == hashCode) {
        element.value = value;
        return;
      }
    }

    this.bs[hashCode].push({ key, value });
  }

  get(key) {
    let hashCode = this.hash(key);
    for (element of this.bs) {
      if (element.key == hashCode) return value;
    }
    return null;
  }

  has(key){
     let hashCode = this.hash(key);
    for (element of this.bs) {
      if (element.key == hashCode) return true;
    }
    return false;
  }

  
}

let hashmap = new HashMap(0.75, 16);
console.log(hashmap.bs);
