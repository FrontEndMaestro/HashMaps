class LinkedList {
  constructor() {
    this.head = null;
  }
  append(key, value) {
    let node = nodeFactory();
    node.setValue(value);
    node.setKey(key);
    if (this.head == null) {
      this.head = node;
      return;
    }
    let temp = this.head;
    while (temp.nextNode != null) temp = temp.nextNode;
    temp.nextNode = node;
    node.nextNode = null;
  }

  printall() {
    if (this.head == null) return "";
    let temp = this.head;
    while (temp != null) {
      //print without line break
      process.stdout.write(
        `[key: ${temp.getkey()},value: ${temp.getValue()}]->`,
      );
      if (temp.nextNode == null) {
        process.stdout.write("null");
      }
      temp = temp.nextNode;
    }
  }

  size() {
    let temp = this.head;
    let count = 0;
    while (temp != null) {
      temp = temp.nextNode;
      count++;
    }
    return count;
  }

  updateValue(key, value) {
    let temp = this.head;
    while (temp != null) {
      if (key == temp.getkey()) {
        temp.setValue(value);
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  contains(key) {
    let temp = this.head;
    while (temp != null) {
      if (key == temp.getkey()) {
        return true;
      }
      temp = temp.nextNode;
    }
    return false;
  }

  remove(key) {
    let temp = this.head;
    let prev = null;
    while (temp != null) {
      if (key == temp.getkey()) {
        prev.nextNode = temp.nextNode;
        temp.nextNode = null;
      }
      prev = temp;
      temp = temp.nextNode;
    }
    return false;
  }

  removeAll() {
    if (this.head != null) {
      this.head.nextNode = null;
      this.head = null;
    }
  }

  getValue(key) {
    let temp = this.head;
    while (temp != null) {
      if (key == temp.getkey()) {
        return temp.getValue();
      }
      temp = temp.nextNode;
    }
    return null;
  }

  getAllKeys() {
    let keys = [];
    let temp = this.head;
    while (temp != null) {
      keys.push(temp.getkey());
      temp = temp.nextNode;
    }
    return keys;
  }
  getAllValues() {
    let values = [];
    let temp = this.head;
    while (temp != null) {
      values.push(temp.getValue());
      temp = temp.nextNode;
    }
    return values;
  }

  getAllEntries() {
    let entries = [];
    let temp = this.head;
    while (temp != null) {
      entries.push([temp.getkey(), temp.getValue()]);
      temp = temp.nextNode;
    }
    return entries;
  }

  printLinkedList() {
    if (this.head == null) return "";
    let string = " ";
    let temp = this.head;
    while (temp != null) {
      string += `[key: ${temp.getkey()},value: ${temp.getValue()}]->`;
      if (temp.nextNode == null) {
        string += `null`;
        return string;
      }
      temp = temp.nextNode;
    }
  }
}

function nodeFactory() {
  let value, nextNode, key;
  value = nextNode = key = null;
  function getValue() {
    return value;
  }

  function getkey() {
    return key;
  }
  function setKey(k) {
    key = k;
  }
  const setValue = function (val) {
    value = val;
  };
  return { nextNode, setKey, setValue, getkey, getValue };
}

export default LinkedList;
