class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(root);
  }

  buildTree(arr) {

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
