// script.js

const node = (data, left = null, right = null) => {
  return {
    data,
    left,
    right
  }
} 

const tree = (array) => {
  
  let root = buildTree(_sortArr(array));
  const traversalArray = [];

  function _sortArr(array) {
    newArr = [...new Set(array)];
    newArr.sort((a, b) => a - b);
    console.log("Initial Array:", newArr);
    return newArr;
  }

  function buildTree(array) {
    if(!array.length){
      return;
    }
    const data = array.splice(Math.floor(array.length / 2), 1);
    const left = array.splice(0, Math.ceil(array.length / 2));
    const right = array.splice(array);
    const rootNode = node(data, buildTree(left), buildTree(right));
    return rootNode;
  }

  const insert = (existingNode, value) => {
    if (existingNode === null) {
      console.log('insert:',value)
      return node(value); 
    }
    if (value < existingNode.data) {
      existingNode.left = insert(existingNode.left, value);
    } else if (value > existingNode.data) {
      existingNode.right = insert(existingNode.right, value);
    }
    return existingNode;
  }

  const del = (existingNode, value) => {
    if (existingNode === null) {
      return existingNode;
    }
    if(value < existingNode.data) {
      existingNode.left = del(existingNode.left, value);
    } else if (value > existingNode.data) {
      existingNode.right = del(existingNode.right, value);
    } else {
      if(existingNode.left === null) {
        return existingNode.right
      } else if(existingNode.right === null) {
        return existingNode.left
      }
      existingNode.data = minVal(existingNode.right);
      existingNode.right = del(existingNode.right, existingNode.data);
    }
    return existingNode
  }

  function minVal(existingNode) {
    let minV = existingNode.data;
    while(existingNode.left != null) {
      minV = existingNode.left.data;
      existingNode.data = existingNode.left;
    }
    return minV
  }

  const find = (existingNode, value) => {
    if(existingNode === null) {
      return false;
    }
    console.log(existingNode.data, value);
    if(existingNode.data == value) {
      return existingNode;
    }
    let leftSearch = find(existingNode.left,value);
    if(leftSearch) {
      return existingNode.left;
    }
    let rightSearch = find(existingNode.right,value);
    if(rightSearch) {
      return existingNode.right;
    }
    return false;
  }

  const levelOrder = (existingNode, func = null) => {

    if(existingNode === null) {
      return [];
    }
    const queue = [];
    const values = [];
    queue.push(existingNode);

    while(queue.length) {
      const currNode = queue.shift()
      if(func) func(currNode);
      values.push(currNode.data);
      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
    }
    if(!func) return values.flat();
  }


  const printTraversalArray = (print = false) => {
    if (print) {
      return traversalArray.flat();
    } else {
      traversalArray.length = 0;
      return 'traversalArray cleared';
    }
  };

  const inOrder = (existingNode, func = null) => {
    //left data right
    if(existingNode === null) {
      return existingNode;
    }
    if(existingNode.left){
      inOrder(existingNode.left, func);
    }
    func ? func(existingNode) : traversalArray.push(existingNode.data);

    if(existingNode.right) {
      inOrder(existingNode.right, func)
    }
    return func ? existingNode : printTraversalArray(true);
  }

  const preOrder = (existingNode, func = null) => {
    //data left right
    if (existingNode === null) {
      return existingNode;
    }

    func ? func(existingNode) : traversalArray.push(existingNode.data);

    if (existingNode.left) {
      preOrder(existingNode.left, func);
    }
    if (existingNode.right) {
      preOrder(existingNode.right, func);
    }
    return func ? existingNode : printTraversalArray(true);
  };
    
  const postOrder = (existingNode, func = null) => {
    //left right data
    if (existingNode === null) {
      return existingNode;
    }
    if (existingNode.left) {
      postOrder(existingNode.left, func);
    }
    if (existingNode.right) {
      postOrder(existingNode.right, func);
    }
    func ? func(existingNode) : traversalArray.push(existingNode.data);

    return func ? existingNode : printTraversalArray(true);
  };
  
  const height = (existingNode) => {
    if (existingNode === null) {
      return -1;
    }

    let lHeight = height(existingNode.left);
    let rHeight = height(existingNode.right);
    
    return(Math.max(lHeight,rHeight) + 1)
  };
  
  const depth = (existingNode) => {
    if (existingNode === null) {
      return -1;
    }
    return (height(root) - height(existingNode))
  };

  const isBalanced = (existingNode) => {
    if(existingNode === null){
      return true
    }
    let lHeight = height(existingNode.left);
    let rHeight = height(existingNode.right);
    if(Math.abs(lHeight - rHeight) <= 1 && 
      isBalanced(existingNode.left) == true && 
      isBalanced(existingNode.right) == true) {
      return true;
    }
    return false;
  };

  const reBalance = (existingNode) => {
    if(existingNode === null){
      return false;
    } 
    existingNode = buildTree(inOrder(existingNode));
    printTraversalArray(false);
    return existingNode; 
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    root,
    buildTree,
    insert,
    del,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
    prettyPrint,
    printTraversalArray
  }
}

// Driver Script

const sampleArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 32] 
const bst= tree(sampleArray);
bst.prettyPrint(bst.root);
console.log('isBalanced',bst.isBalanced(bst.root));
console.log('inOrder:',bst.inOrder(bst.root));
console.log(bst.printTraversalArray(false));
console.log("preOrder:", bst.preOrder(bst.root));
console.log(bst.printTraversalArray(false));
console.log("postOrder:", bst.postOrder(bst.root));
console.log(bst.printTraversalArray(false));
bst.insert(bst.root, 666);
bst.insert(bst.root, 66227);
bst.insert(bst.root, 668);
bst.prettyPrint(bst.root);
console.log('isBalanced:',bst.isBalanced(bst.root));
bst.root = bst.reBalance(bst.root);
bst.prettyPrint(bst.root);
console.log("isBalanced", bst.isBalanced(bst.root));
console.log("inOrder:", bst.inOrder(bst.root));
console.log(bst.printTraversalArray(false));
console.log("preOrder:", bst.preOrder(bst.root));
console.log(bst.printTraversalArray(false));
console.log("postOrder:", bst.postOrder(bst.root));
console.log(bst.printTraversalArray(false));
