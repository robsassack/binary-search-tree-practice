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

  levelOrder(callback) {
    let queue = [];
    let output = [];
    queue.push(this.root);
    while (queue.length != 0) {
      let temp = queue.shift();
      if (callback) {
        callback(temp);
      }
      output.push(temp.data);
      if (temp.left !== null) {
        queue.push(temp.left);
      }
      if (temp.right !== null) {
        queue.push(temp.right);
      }
    }
    if (!callback) {
      return output;
    }
  }

  inorder(callback) {
    return this.inorderRec(this.root, [], 0, callback);
  }

  inorderRec(root, arr, index, callback) {
    if (root === null) {
      return index;
    }
    index = this.inorderRec(root.left, arr, index);
    if (callback) {
      callback(root);
    }
    arr.push(root.data);
    this.inorderRec(root.right, arr, index);
    if (!callback) {
      return arr;
    }
  }

  preorder(callback) {
    return this.preorderRec(this.root, [], 0, callback);
  }

  preorderRec(root, arr, index, callback) {
    if (root === null) {
      return index;
    }
    if (callback) {
      callback(root);
    }
    arr.push(root.data);
    index = this.preorderRec(root.left, arr, index);
    this.preorderRec(root.right, arr, index);
    if (!callback) {
      return arr;
    }
  }

  postorder(callback) {
    return this.postorderRec(this.root, [], 0, callback);
  }

  postorderRec(root, arr, index, callback) {
    if (root === null) {
      return index;
    }
    index = this.postorderRec(root.left, arr, index);
    this.postorderRec(root.right, arr, index);
    if (callback) {
      callback(root);
    }
    arr.push(root.data);
    if (!callback) {
      return arr;
    }
  }

  height(root=this.root) {
    if (root === null) {
      return -1;
    }
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }

  depth(node, root=this.root) {
    if (root === null) {
      return -1;
    }
    let distance = -1;
    if ((root.data === node.data) ||
        (distance = this.depth(node, root.left)) >= 0 ||
        (distance = this.depth(node, root.right)) >= 0) {
      return distance + 1;
    }
    return distance;
  }

  isBalanced(root=this.root) {
    if (root === null) {
      return true;
    }
    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);
    if (Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(root.left) &&
        this.isBalanced(root.right)) {
      return true;
    }
    return false;
  }

  rebalance() {
    this.array = this.inorder();
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
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

function randomArray() {
  let array = [];
  for (let i=0; i<10; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  return array;
}

let tree = new Tree(randomArray());

prettyPrint(tree.root);

console.log(`Is balanced: ${tree.isBalanced()}`);
console.log(`Level order: ${tree.levelOrder()}`);
console.log(`Inorder: ${tree.inorder()}`)
console.log(`Preorder: ${tree.preorder()}`);
console.log(`Postorder: ${tree.postorder()}`);
for (let i=0; i<10; i++) {
  let x = Math.floor(Math.random() * 1000) + 1
  console.log(`Inserting ${Math.floor(Math.random() * 1000) + 1}`)
  tree.insert(x);
}
console.log(`Is balanced: ${tree.isBalanced()}`);
console.log(`Rebalancing...`);
tree.rebalance();

prettyPrint(tree.root);

console.log(`Is balanced: ${tree.isBalanced()}`);
console.log(`Level order: ${tree.levelOrder()}`);
console.log(`Inorder: ${tree.inorder()}`)
console.log(`Preorder: ${tree.preorder()}`);
console.log(`Postorder: ${tree.postorder()}`);
