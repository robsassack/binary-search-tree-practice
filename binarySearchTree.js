class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(data) {
    this.root = this.insertRec(this.root, data);
  }

  insertRec(root, data) {
    if (root === null) {
      root = new Node(data);
      return root;
    }

    if (data < root.data) {
      root.left = this.insertRec(root.left, data);
    } else if (data > root.data) {
      root.right = this.insertRec(root.right, data)
    }

    return root;
  }

  delete(data) {
    this.root = this.deleteRec(this.root, data);
  }

  deleteRec(root, data) {
    if (root === null) {
      return root;
    }

    if (data < root.data) {
      root.left = this.deleteRec(root.left, data);
    } else if (data > root.data) {
      root.right = this.deleteRec(root.right, data);
    }

    else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      root.data = this.minValue(root.right);
      root.right = this.deleteRec(root.right, root.data);
    }
    return root;
  }

  minValue(root) {
    let min = root.data;
    while (root.left !== null) {
      min = root.left.data;
      root = root.left;
    }
    return min;
  }

  find(value) {
    let current = this.root;
    while (current.data !== value) {
      if (current !== null) {
        if (current.data > value) {
          current = current.left;
        } else {
          current = current.right;
        }
        if (current === null) {
          return null;
        }
      }
    }
    return current;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function merge(a, b) {
  let arr = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0] > b[0]) {
      arr.push(b[0]);
      b.shift();
    } else {
      arr.push(a[0]);
      a.shift();
    }
  }
  while (a.length > 0) {
    arr.push(a[0]);
    a.shift();
  }
  while (b.length > 0) {
    arr.push(b[0]);
    b.shift();
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let arr1 = arr.splice(0, Math.ceil(arr.length/2));
  let arr2 = arr;

  arr1 = mergeSort(arr1);
  arr2 = mergeSort(arr2);

  return merge(arr1, arr2);
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(2);
tree.insert(1337);
tree.delete(67);
console.log(tree.find(4));
prettyPrint(tree.root);
