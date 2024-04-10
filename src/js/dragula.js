// Allow drag and drop from left to right
const drake = dragula([document.querySelector('#products'), document.querySelector('#cart')]);

function onDrop(el, target, source, sibling) {
  console.log("The item is:", el);
  console.log("The target of this item (where it ends up) is:", target);
  console.log("The source of this item is:", source);
  console.log("The sibling of this item is:", sibling);
  alert("Check the console for information about this drop event.");
}

drake.on("drop", onDrop);